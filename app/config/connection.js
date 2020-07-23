// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
var mysql = require("mysql2");
require("dotenv").config();
var connection;
// Set up our connection information

console.log(process.env.JAWSDB_URL);
if (process.env.JAWSDB_URL) {
    //connection = mysql.createConnection(process.env.JAWSDB_URL);

    connection = mysql.createConnection({
        port: 3306,
        host: process.env.JAWSDB_HOST,
        user: process.env.JAWSDB_USER,
        password: process.env.JAWSDB_PASSWORD,
        database: process.env.JAWSDB_DATABASE,
    });
} else {
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: "root",
        database: "budgetapp",
    });
}

// Connect to the database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;