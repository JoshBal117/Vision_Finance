$(".submit-budget").on("click", function(event) {
    event.preventDefault();
    signedInCustomer = localStorage.getItem("signedInUser");
    //for now we use this
    signedInCustomerId = 3; //signedInCustomer.customer_id

    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();

    // Here we grab the form elements
    var budget = [{
            customer_id: signedInCustomerId,
            category: "Income",
            label: "Paycheck1",
            amount: parseInt($(".income-check1").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Income",
            label: "Paycheck1",
            amount: parseInt($(".income-check2").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Income",
            label: "Paycheck1",
            amount: parseInt($(".income-check3").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Income",
            label: "Paycheck1",
            amount: parseInt($(".income-check4").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "House",
            label: "Mortgage/Rent",
            amount: parseInt($(".house-mortgage").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "House",
            label: "Electricity",
            amount: parseInt($(".house-electricity").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "House",
            label: "Water",
            amount: parseInt($(".house-water").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Miscellaneous",
            label: "Cable",
            amount: parseInt($(".misc-cable").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Miscellaneous",
            label: "subscriptions",
            amount: parseInt($(".misc-subscriptions").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Miscellaneous",
            label: "Phone",
            amount: parseInt($(".misc-phone").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Food",
            label: "Groceries",
            amount: parseInt($(".food-groceries").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Food",
            label: "Restaurant",
            amount: parseInt($(".food-restuarants").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Transportation",
            label: "CarPayment",
            amount: parseInt($(".transportation-carpayment").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
        {
            customer_id: signedInCustomerId,
            category: "Transportation",
            label: "Gar",
            amount: parseInt($(".transportation-gas").val().trim()),
            budgeted_month: thismonth,
            budgeted_year: thisyear,
        },
    ];

    console.log(budget);

    // ajax call

    $.post("/api/createbudget", budget, function(data) {
        // If a table is available... tell user they are booked.
        console.log(data);
    });
});