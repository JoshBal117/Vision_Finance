$(".submit-budget").on("click", function(event) {
    event.preventDefault();
    signedInCustomer = localStorage.getItem("signedInUser");
    //for now we use this
    signedInCustomerId = 5; //signedInCustomer.customer_id

    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();

    // Here we grab the form elements
    var budget = {
        budgetdata: [
            [
                signedInCustomerId,
                "Income",
                "Paycheck1",
                parseInt($(".income-check1").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck2",
                parseInt($(".income-check2").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck3",
                parseInt($(".income-check3").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck4",
                parseInt($(".income-check4").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "House",
                "Mortgage/Rent",
                parseInt($(".house-mortgage").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "House",
                "Electricity",
                parseInt($(".house-electricity").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "House",
                "Water",
                parseInt($(".house-water").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Cable",
                parseInt($(".misc-cable").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "subscriptions",
                parseInt($(".misc-subscriptions").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Phone",
                parseInt($(".misc-phone").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Groceries",
                parseInt($(".food-groceries").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Restaurant",
                parseInt($(".food-restuarants").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "CarPayment",
                parseInt($(".transportation-carpayment").val().trim()),
                thismonth,
                thisyear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "Gas",
                parseInt($(".transportation-gas").val().trim()),
                thismonth,
                thisyear,
            ],
        ],
    };

    console.log(budget);

    // ajax call

    $.post("/api/createbudget", budget, function(data) {
        // If a table is available... tell user they are booked.
        console.log(data);
    });
});