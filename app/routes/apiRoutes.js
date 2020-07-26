// ==============================================================================
// Name : apiRoutes.js
// Author : Binary Beasts
// Date : 07/13/2020
// Purpose: this file offers a set of routes for displaying and saving data to the db
// ==============================================================================

// Dependencies
// =============================================================
var connection = require("../config/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Routes
// =============================================================
module.exports = function(app) {
    // Get budget details
    app.get(
        "/api/currentbudgetandactuals/:userid/:inputmonth/:inputyear",
        function(req, res) {
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
                    if (err) throw err;
                    res.json(result);
                }
            );
        }
    );

    // Get budget tracker details
    app.get(
        "/api/currentbudgetbycategory/:userid/:inputmonth/:inputyear",
        function(req, res) {
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
                    if (err) throw err;
                    res.json(result);
                }
            );
        }
    );

    //get daily expenses for the month
    app.get("/api/monthlyexpenses/:userid/:month/:year", function(req, res) {
        let userInput = req.params.userid;
        let inputmonth = req.params.month;
        let inputyear = req.params.year;
        var query = connection.query(
            "SELECT DATE_FORMAT(transaction_date, '%m-%d-%y') as t_date, sum(transaction_amount) as t_amt FROM customer_transactions " +
            "WHERE customer_id = ? and budgeted_month = ? and budgeted_year = ? and  " +
            "transaction_category <>  'Income' group BY transaction_date order by transaction_date", [userInput, inputmonth, inputyear],
            function(err, result) {
                if (err) throw err;
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
                if (err) throw err;
                res.json(result);
            }
        );
    });

    // register
    app.post("/api/register", function(req, res) {
        const password = req.body.customerPassword;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error(err);
                return;
            }

            var users = {
                customer_name: req.body.customerName,
                customer_email: req.body.customerEmail,
                customer_password: hash,
            };

            connection.query("INSERT INTO customers SET ?", users, function(
                error,
                results,
                fields
            ) {
                if (error) {
                    // sample error for reference
                    // code: 'ER_DATA_TOO_LONG',
                    // errno: 1406,
                    // sqlState: '22001',
                    // sqlMessage: "Data too long for column 'customer_password' at row 1"
                    res.send({
                        code: 400,
                        failed: "error ocurred",
                    });
                } else {
                    var userObj = [{
                        id: results.insertId,
                        customer_name: users.customer_name,
                        customer_email: users.customer_email,
                        customer_password: "",
                    }, ];
                    res.send({
                        code: 200,
                        success: "user registered sucessfully",
                        user: userObj,
                    });
                }
            });
        });
    });

    //login
    app.post("/api/login", async function(req, res) {
        var email = req.body.customerEmail;
        var password = req.body.customerPassword;

        connection.query(
            "SELECT * FROM customers WHERE customer_email = ?", [email],
            function(error, results, fields) {
                if (error) {
                    res.send({
                        code: 400,
                        failed: "error while looking up userocurred",
                    });
                } else {
                    //check returned values
                    if (results.length > 0) {
                        bcrypt.compare(
                            password,
                            results[0].customer_password,
                            (compare_err, compare_res) => {
                                if (compare_err) {
                                    //console.error(compare_err);
                                    return;
                                }
                                if (compare_res) {
                                    //res.redirect(307, "/planned");
                                    res.send({
                                        code: 200,
                                        success: "login sucessfull",
                                        user: results,
                                    });
                                } else {
                                    res.send({
                                        code: 204,
                                        success: "Email and password does not match",
                                    });
                                }
                                //     const comparision = await bcrypt.compare(
                                //     password,
                                //     results[0].password
                                // );
                            }
                        );
                    } else {
                        res.send({
                            code: 206,
                            success: "Email does not exits",
                        });
                    }
                }
            }
        );
    });

    app.post("/api/createbudget", function(req, res) {
        var budget = req.body.budgetdata;

        connection.query(
            "INSERT INTO customer_budget_details(customer_id,category,label,amount,budgeted_month,budgeted_year)VALUES ?", [budget],
            function(error, results, fields) {
                if (error) {
                    // sample error for reference
                    // code: 'ER_DATA_TOO_LONG',
                    // errno: 1406,
                    // sqlState: '22001',
                    // sqlMessage: "Data too long for column 'customer_password' at row 1"
                    res.send({
                        code: 400,
                        failed: "error ocurred",
                    });
                } else {
                    res.send({
                        code: 200,
                        success: "user budget created sucessfully",
                    });
                }
            }
        );
    });

    app.post("/api/createactuals", function(req, res) {
        var expenses = req.body.expensedata;

        connection.query(
            "INSERT INTO customer_transactions(customer_id,transaction_category,transaction_label,transaction_amount,budgeted_month,budgeted_year)VALUES ?", [expenses],
            function(error, results, fields) {
                if (error) {
                    // sample error for reference
                    // code: 'ER_DATA_TOO_LONG',
                    // errno: 1406,
                    // sqlState: '22001',
                    // sqlMessage: "Data too long for column 'customer_password' at row 1"
                    res.send({
                        code: 400,
                        failed: "error ocurred",
                    });
                } else {
                    res.send({
                        code: 200,
                        success: "user expenses created sucessfully",
                    });
                }
            }
        );
    });
};