// ==============================================================================
// Name : apiRoutes.js
// Author : Binary Beasts
// Date : 07/13/2020
// Purpose: this file offers a set of routes for displaying and saving data to the db
// ==============================================================================

// Dependencies
// =============================================================
var connection = require("../config/connection");

// Routes
// =============================================================
module.exports = function(app) {
    // Get budget details
    app.get("/api/currentbudget/:userid/:inputmonth/:inputyear", function(
        req,
        res
    ) {
        var userInput = req.params.userid;

        var thismonth = req.params.inputmonth;
        if (!thismonth) {
            thismonth = new Date().getMonth();
        }
        var thisyear = req.params.inputyear;
        if (!thisyear) {
            thisyear = new Date().getFullYear();
        }
        var query = connection.query(
            "SELECT c.customer_id, c.category, c.label, c.amount, " +
            "IFNULL ( (select sum(transaction_amount) " +
            "FROM budgetapp.customer_transactions " +
            "WHERE customer_id = c.customer_id " +
            "and transaction_category = c.category " +
            "AND transaction_label = c.label " +
            "and budgeted_month = c.budgeted_month " +
            "and budgeted_year = c.budgeted_year GROUP BY customer_id, transaction_category, transaction_label) ,  0) as actual_amount " +
            "from customer_budget_details c " +
            "WHERE c.customer_id = ? and c.budgeted_month = ? and c.budgeted_year = ? ORDER BY  " +
            "c.cATEGORY", [userInput, thismonth, thisyear],
            function(err, result) {
                if (err) return res.send(err);
                res.json(result);
            }
        );
    });

    // Get budget tracker details
    app.get("/api/currentbudgettracker/:userid/:inputmonth/:inputyear", function(
        req,
        res
    ) {
        var userInput = req.params.userid;

        var thismonth = req.params.inputmonth;
        if (!thismonth) {
            thismonth = new Date().getMonth();
        }
        var thisyear = req.params.inputyear;
        if (!thisyear) {
            thisyear = new Date().getFullYear();
        }
        var query = connection.query(
            "SELECT c.customer_id, c.category, sum(c.amount) as budgeted_amount, " +
            "IFNULL ( (select sum(transaction_amount) " +
            "FROM budgetapp.customer_transactions " +
            "WHERE customer_id = c.customer_id " +
            "and transaction_category = c.category " +
            "and budgeted_month = c.budgeted_month " +
            "and budgeted_year = c.budgeted_year) ,  0) as actual_amount " +
            "from customer_budget_details c " +
            "WHERE c.customer_id = ? and c.budgeted_month = ? and c.budgeted_year = ?  GROUP BY c.category", [userInput, thismonth, thisyear],
            function(err, result) {
                if (err) return res.send(err);
                res.json(result);
            }
        );
    });

    //get monthly expense for the current year
    app.get("/api/currentyearexpense/:userid", function(req, res) {
        let userInput = req.params.userid;
        let thismonth = new Date().getMonth();
        var query = connection.query(
            "SELECT * FROM customer_transactions WHERE customer_id = ? and budgeted_month = ? ORDER BY CATEGORY", [userInput, thismonth],
            function(err, result) {
                if (err) return res.send(err);
                res.json(result);
            }
        );
    });

    //get daily expenses for the month

    //get monthly expense for the current year
    app.get("/api/monthlyexpenses/:userid/:month/:year", function(req, res) {
        let userInput = req.params.userid;
        let inputmonth = req.params.month;
        let inputyear = req.params.year;
        var query = connection.query(
            "SELECT DATE_FORMAT(transaction_date, '%m-%d-%y') as t_date, sum(transaction_amount) as t_amt FROM customer_transactions " +
            "WHERE customer_id = ? and budgeted_month = ? and budgeted_year = ? and  " +
            "transaction_category <>  'Income' group BY transaction_date order by transaction_date", [userInput, inputmonth, inputyear],
            function(err, result) {
                if (err) return res.send(err);
                res.json(result);
            }
        );
    });

    //get monthly expense for the current year
    app.get("/api/monthlyexpensesbreakdown/:userid/:month/:year", function(
        req,
        res
    ) {
        let userInput = req.params.userid;
        let inputmonth = req.params.month;
        let inputyear = req.params.year;
        var query = connection.query(
            "SELECT transaction_category, sum(transaction_amount) as t_amt FROM customer_transactions " +
            "WHERE customer_id = ? and budgeted_month = ? and budgeted_year = ? and  " +
            "transaction_category <>  'Income' group BY transaction_category order by transaction_category", [userInput, inputmonth, inputyear],
            function(err, result) {
                if (err) return res.send(err);
                res.json(result);
            }
        );
    });
};