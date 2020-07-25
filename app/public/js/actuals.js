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
    if (parseInt($(".income-check1").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck1",
            parseInt($(".income-check1").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".income-check2").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck2",
            parseInt($(".income-check2").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".income-check3").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck3",
            parseInt($(".income-check3").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".income-check4").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck4",
            parseInt($(".income-check4").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".house-mortgage").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Income",
            "Paycheck4",
            parseInt($(".house-mortgage").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".house-electricity").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "House",
            "Electricity",
            parseInt($(".house-electricity").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".house-water").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "House",
            "Water",
            parseInt($(".house-water").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".misc-cable").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Cable",
            parseInt($(".misc-cable").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".misc-subscriptions").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Subscriptions",
            parseInt($(".misc-subscriptions").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".misc-phone").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Miscellaneous",
            "Phone",
            parseInt($(".misc-phone").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".food-groceries").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Food",
            "Groceries",
            parseInt($(".food-groceries").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".food-restuarants").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Food",
            "Restaurant",
            parseInt($(".food-restuarants").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".transportation-carpayment").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Transportation",
            "CarPayment",
            parseInt($(".transportation-carpayment").val().trim()),
            thismonth,
            thisyear,
        ]);
    }
    if (parseInt($(".transportation-gas").val().trim()) > 0) {
        expenses.expensedata.push([
            signedInCustomerId,
            "Transportation",
            "Gas",
            parseInt($(".transportation-gas").val().trim()),
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