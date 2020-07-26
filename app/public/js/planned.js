$(document).ready(function() {
    //retrieve any data if present

    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    const signedInCustomerId = signedInCustomer.id;
    const signedInCustomerName = signedInCustomer.customer_name;
    const thisMonth = new Date().getMonth();
    const monthName = new Date().toLocaleString("default", { month: "long" });

    const thisYear = new Date().getFullYear();
    $("#budgetpage-title").text(
        `Hello ${signedInCustomerName} Lets set up your budget for ${monthName}/${thisYear}`
    );

    $.get(
        "/api/currentbudgetandactuals/" +
        signedInCustomerId +
        "/" +
        thisMonth +
        "/" +
        thisYear
    ).then(function(data) {
        if (data.length > 0) {
            $("#budgetpage-title").text(
                `Hello ${signedInCustomerName} Your budget is already setup for ${thisMonth}/${thisYear}`
            );
            for (let index = 0; index < data.length; index++) {
                if (data[index].category === "Income") {
                    if (data[index].label === "Paycheck1") {
                        $(".income-check1").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck2") {
                        $(".income-check2").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck3") {
                        $(".income-check3").val(data[index].amount);
                    }
                    if (data[index].label === "Paycheck4") {
                        $(".income-check4").val(data[index].amount);
                    }
                }
                if (data[index].category === "House") {
                    if (data[index].label === "Mortgage/Rent") {
                        $(".house-mortgage").val(data[index].amount);
                    }
                    if (data[index].label === "Electricity") {
                        $(".house-electricity").val(data[index].amount);
                    }
                    if (data[index].label === "Water") {
                        $(".house-water").val(data[index].amount);
                    }
                }
                if (data[index].category === "Miscellaneous") {
                    if (data[index].label === "Cable") {
                        $(".misc-cable").val(data[index].amount);
                    }
                    if (data[index].label === "Subscriptions") {
                        $(".misc-subscriptions").val(data[index].amount);
                    }
                    if (data[index].label === "Phone") {
                        $(".misc-phone").val(data[index].amount);
                    }
                }
                if (data[index].category === "Food") {
                    if (data[index].label === "Groceries") {
                        $(".food-groceries").val(data[index].amount);
                    }
                    if (data[index].label === "Restaurants") {
                        $(".food-restaurants").val(data[index].amount);
                    }
                }
                if (data[index].category === "Transportation") {
                    if (data[index].label === "Gas") {
                        $(".transportation-gas").val(data[index].amount);
                    }
                    if (data[index].label === "CarPayment") {
                        $(".transportation-carpayment").val(data[index].amount);
                    }
                }
            }
        } else {
            // console.log("Set up data");
        }
    });
});

$(".submit-budget").on("click", function(event) {
    event.preventDefault();
    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    const signedInCustomerId = signedInCustomer.id;

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    // Here we grab the form elements
    var budget = {
        budgetdata: [
            [
                signedInCustomerId,
                "Income",
                "Paycheck1",
                parseFloat($(".income-check1").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck2",
                parseFloat($(".income-check2").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck3",
                parseFloat($(".income-check3").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Income",
                "Paycheck4",
                parseFloat($(".income-check4").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Mortgage/Rent",
                parseFloat($(".house-mortgage").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Electricity",
                parseFloat($(".house-electricity").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "House",
                "Water",
                parseFloat($(".house-water").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Cable",
                parseFloat($(".misc-cable").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Subscriptions",
                parseFloat($(".misc-subscriptions").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Miscellaneous",
                "Phone",
                parseFloat($(".misc-phone").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Groceries",
                parseFloat($(".food-groceries").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Food",
                "Restaurant",
                parseFloat($(".food-restuarants").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "CarPayment",
                parseFloat($(".transportation-carpayment").val().trim()),
                thisMonth,
                thisYear,
            ],
            [
                signedInCustomerId,
                "Transportation",
                "Gas",
                parseFloat($(".transportation-gas").val().trim()),
                thisMonth,
                thisYear,
            ],
        ],
    };


    // ajax call

    $.post(
        "/api/createbudget",
        budget,
        function(postResponse) {
            if (postResponse.code == "200") {
                window.location.replace("/budget");
            } else {
                //alert messages
            }
        }
        // ,
        // (err) => console.log("err")
    );
});