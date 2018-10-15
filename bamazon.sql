-- Create a database called 'bamazon' and switch into it for this activity --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table called 'product' which will contain the store inventory --
CREATE TABLE product (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price INT(100) NOT NULL,
	stock_quantity INT(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'product' table --
INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES  ('timex watch', 'jewelry' 30, 50),
        ('glue', 'office', 15, 44),
        ('speaker', 'electronics', 30, 50),
        ('hat', 'clothing', 20, 40),
        ('coffee cup', 'kitchen', 5, 17),
        ('dish towel', 'kitchen', 5, 205), 
        ('shoes', 'clothing', 50, 30),
        ('earbuds', 'electronics', 20, 50),
        ('ring', 'jewelry', 200, 5), 
        ('necklace', 'jewelry', 100, 135);
