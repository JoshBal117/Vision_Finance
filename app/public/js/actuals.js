// ==============================================================================
// Name : actuals.js
// Author : Binary Beasts
// Date : 07/22/2020
// Purpose: To support the html that enter the actual expenses
// ==============================================================================
$(document).ready(function() {
    //retrieve any data if present

    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    console.log(signedInCustomer);
    const signedInCustomerId = signedInCustomer.id;
    const signedInCustomerName = signedInCustomer.customer_name;
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    const monthName = new Date().toLocaleString("default", { month: "long" });
    $("#actualspage-title").text(
        `Hello ${signedInCustomerName} Lets enter your actual spending for  ${monthName}/${thisYear}`
    );
});

$(".submit-expenses").on("click", function(event) {
    event.preventDefault();
    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    const signedInCustomerId = signedInCustomer.id;

    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();

    // Here we grab the form elements
    var expenses = {
        expensedata: [],
    };
    if (parseFloat($(".income-check1").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck1",
            parseFloat($(".income-check1").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".income-check2").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck2",
            parseFloat($(".income-check2").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".income-check3").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck3",
            parseFloat($(".income-check3").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".income-check4").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck4",
            parseFloat($(".income-check4").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".house-mortgage").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "House",
            "Mortgage/Rent",
            parseFloat($(".house-mortgage").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".house-electricity").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "House",
            "Electricity",
            parseFloat($(".house-electricity").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".house-water").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "House",
            "Water",
            parseFloat($(".house-water").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".misc-cable").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Cable",
            parseFloat($(".misc-cable").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".misc-subscriptions").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Subscriptions",
            parseFloat($(".misc-subscriptions").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".misc-phone").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Phone",
            parseFloat($(".misc-phone").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".food-groceries").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Food",
            "Groceries",
            parseFloat($(".food-groceries").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".food-restuarants").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Food",
            "Restaurant",
            parseFloat($(".food-restuarants").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".transportation-carpayment").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Transportation",
            "CarPayment",
            parseFloat($(".transportation-carpayment").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseFloat($(".transportation-gas").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Transportation",
            "Gas",
            parseFloat($(".transportation-gas").val().trim()),
            thismonth,
            thisyear,
        ]);
    }

    console.log(expenses);

    // ajax call
    $.post(
        "/api/createactuals",
        expenses,
        function(postResponse) {
            console.log(postResponse);
            if (postResponse.code == "200") {
                window.location.replace("/budget");
            }
        }
        // ,
        // (err) => console.log("err")
    );
});