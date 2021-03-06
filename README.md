# Bamazon

Getting Started
----
Clone repository

Run both of these commands in Terminal or Gitbash:
- 'npm install inquirer' and
- 'npm install mysql'

Run the below commands to intiate the options. Each depending on which js file you are currently in:

- Customer - 'node bamazonCustomer.js'
- Manager - 'node bamazonManager.js'

BamazonCustomer.js
----

Prints the products in the store.

Prompts customer which product they would like to purchase by ID number.

Asks for the quantity.

If there is a sufficient amount of the product in stock, it will return the total for that purchase.
However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
If the purchase goes through, it updates the stock quantity to reflect the purchase in Mysql database.

BamazonManager.js
----

Starts with a menu:

View Products for Sale
View Low Inventory
Add to Inventory
Add New Product

If the manager selects View Products for Sale, it lists all of the products in the store including all of their details, including stock amounts, quantities, etc

If the manager selects View Low Inventory, it'll list all the products with less than five items in its StockQuantity column.

If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.

If the manager selects Add New Product, it allows the manager to add a new product to the store.

Demo Videos
----
BamazonCustomer.js (https://drive.google.com/file/d/1aNZ4h8vFbYWmRqeXUElYR6M3NdT-JCDz/view)

BamazonManager.js (https://drive.google.com/file/d/1U2i3zWrJjnKNh8ighr0beimxeAaIbFNs/view)

Technologies used
----
Node.js

Inquire NPM Package (https://www.npmjs.com/package/inquirer)

MYSQL NPM Package (https://www.npmjs.com/package/mysql)

Prerequisites
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference bamazon.sql

Built With
---
- Visual Studio Code
- MySQLWorkbench
- Terminal/Gitbash

Authors
----
Kendra Mulligan
