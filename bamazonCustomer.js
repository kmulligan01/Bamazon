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
  
  start();
});

// function which prompts the user for what action they should take
function start() {
        connection.query("SELECT * FROM product", function(err, res) {
            console.log("\n Here is a list of our items:");
            for (var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
          }
          console.log("-----------------------------------");
          askCustomer();
        });
}

function askCustomer() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the item ID of the product you want to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How much would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (ans) {
        var selectedID = ans.id;
        var updateQuantity = ans.quantity;
        var queryStr = 'SELECT * FROM product WHERE ?';

        connection.query(queryStr, {item_id: selectedID}, function(err, res) {
            if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				start();
			}  else {
				var productData = res[0];

				if (updateQuantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE product SET stock_quantity = ' + (productData.stock_quantity - updateQuantity) + ' WHERE item_id = ' + selectedID;
					
					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * updateQuantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

                    start();
                }
            }
        })
    });
}