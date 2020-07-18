// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
    // Get budget details
    app.get("/api/currentbudget/:userid", function(req, res) {
        console.log("inside apiroutes:userbudget");
        var userInput = req.params.userid;
        var thismonth = new Date().getMonth();
        console.log(thismonth);
        var query = connection.query(
            "SELECT * FROM customer_details WHERE customer_id = ? and budgeted_month = ? ORDER BY CATEGORY", [userInput, thismonth],
            function(err, result) {
                if (err) throw err;
                res.json(result);
            }
        );
    });

    //get monthly expense for the current year
    app.get("/api/currentyearexpense/:userid", function(req, res) {
        console.log("inside apiroutes:currentyearexpense");
        let userInput = req.params.userid;
        let thismonth = new Date().getFullYear();
        console.log(thisyear);
        var query = connection.query(
            "SELECT * FROM customer_transactions WHERE customer_id = ? and budgeted_month = ? ORDER BY CATEGORY", [userInput, thismonth],
            function(err, result) {
                if (err) throw err;
                res.json(result);
            }
        );
    });
};