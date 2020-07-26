DROP DATABASE budgetapp;
CREATE DATABASE IF NOT EXISTS budgetapp;

USE budgetapp;


CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(45) NOT NULL,
  `customer_email` varchar(45) NOT NULL,
  `customer_password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)  COMMENT='This table is to store customer information';

CREATE TABLE `customer_budget_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `category` varchar(45) NOT NULL,
  `label` varchar(45) NOT NULL,
  `amount` decimal(22,2) NOT NULL DEFAULT '0.00',
  `budgeted_month` int NOT NULL DEFAULT '1',
  `budgeted_year` int NOT NULL DEFAULT '2020',
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_label` (`customer_id`,`category`,`label`,`budgeted_month`,`budgeted_year`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id_table_customer_details` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
)  COMMENT='This table holds the expenses, income, debt, giving,savings';

CREATE TABLE `customer_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_label` varchar(45) NOT NULL,
  `transaction_category` varchar(45) NOT NULL,
  `transaction_amount` decimal(22,2) DEFAULT '0.00',
  `budgeted_month` int NOT NULL DEFAULT '1',
  `budgeted_year` int NOT NULL DEFAULT '2020',
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id_table_customer_transaction_idx` (`customer_id`),
  CONSTRAINT `customer_id_table_customer_transaction` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
)  COMMENT='This table stores the transactions on a daily basis ( if income is reported then it is additional  additional income )';


CREATE  TRIGGER `customer_transactions_BEFORE_INSERT` BEFORE INSERT ON `customer_transactions` FOR EACH ROW
BEGIN
SET NEW.transaction_date = NOW();
END;