// ==============================================================================
// Name : htmlRoutes.js
// Author : Binary Beasts
// Date : 07/10/2020
// Purpose: Marks the html routes for the package
// Modifications:
// DATE     AUTHOR      REASON
// ==============================================================================

// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/index", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/create", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/Input-htmls/create.html"));
    });

    app.get("/income", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/Input-htmls/income.html"));
    });
    
    app.get("/expense", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/Input-htmls/housing.html"));
    });
    
    // app.get("/income", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/Input-htmls/income.html"));
    // });

    app.get("/dashboard", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};