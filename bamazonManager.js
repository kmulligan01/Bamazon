var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3307,

  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  
  options();
});

function options(){
    inquirer
    .prompt({
            name: "displayAll",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["Current Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function(ans){
            if (ans.displayAll === "Current Products for Sale"){
                currentProducts();
            }
            else if (ans.displayAll === "View Low Inventory"){
                lowInventory();
            }
            else if (ans.displayAll === "Add to Inventory"){
                addInventory();
            }
            else if (ans.displayAll === "Add New Product"){
                newProduct();
            }
        })
}

function currentProducts() {
    connection.query("SELECT * FROM product", function(err, res) {
        console.log("\n Here is a list of our items:");
        for (var i = 0; i < res.length; i++) {
        console.log("\n" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
    options();
}

function lowInventory(){
    connection.query("SELECT * FROM product WHERE stock_quantity < 5" , function(err, res) {
        if (res.length === 0){
        console.log("Sorry, there are no low inventory items");
        console.log("\n-----------------------\n");
        options();
        } else{
        console.log("\n Here is your low inventory items");
        for (var i = 0; i < res.length; i++) {
        console.log("\n" + res[i].item_id +
         " | " + res[i].product_name + 
         " | " + res[i].price + 
         " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    }
    });
    options();
    }

function addInventory(){
    inquirer
    .prompt([
        {
            name: "chosenProduct",
            type: "input",
            message: "What product do you want to add inventory to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "inventory",
            type: "input",
            message: "How much would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (ans) {
        var chosenProduct = ans.chosenProduct;
        var updatedInventory = ans.inventory;
        var queryStr = 'SELECT * FROM product WHERE ?';
    
    connection.query(queryStr, {item_id: chosenProduct}, function(err, res) {
        if (res.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
            start();
        }  else {
            var productData = res[0];

                // Construct the updating query string
            var updateQueryStr = 'UPDATE product SET stock_quantity = ' + (productData.stock_quantity + updatedInventory) + ' WHERE item_id = ' + chosenProduct;

            // Update the inventory
            connection.query(updateQueryStr, function (err, data) {
                if (err) throw err;

                console.log("Your inventory has been updated!");
                console.log("-----------------------------------");

                // End the database connection
                connection.end();
                });
            } 
        })
    })
}

function newProduct(){
    inquirer
    .prompt ([
        {
            name: "inputName",
            type: "input",
            message: "What is the product name?"
        },
        {
            name: "inputDept",
            type: "input",
            message: "What dept should it be placed in?"
        },
        {
            name: "inputPrice",
            type: "input",
            message: "What is the price?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "inputQuantity",
            type: "input",
            message: "How much is in stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(ans){
      
        connection.query("insert into product set ?", 
        {
            product_name: ans.inputName,
            department_name: ans.inputDept,
            price: ans.inputPrice,
            stock_quantity: ans.inputQuantity
        },
        (err, results, fields) => {
            if (err) {throw err;}
            else {console.log(results.affectedRows + " items added\n")}
        });
    })
}