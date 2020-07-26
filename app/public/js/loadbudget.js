$(document).ready(function() {
    //retrieve any data if present

    const signedInCustomer = JSON.parse(localStorage.getItem("signedInUser"));
    const signedInCustomerId = signedInCustomer.id;
    const signedInCustomerName = signedInCustomer.customer_name;
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    const monthName = new Date().toLocaleString("default", { month: "long" });

    var monthElement = $("#headermonth");
    monthElement.append(
        $("<h1>").text(
            `${signedInCustomerName} : Overview for  ${monthName}/${thisYear}`
        )
    );
});

function getBudget() {
    const customer = JSON.parse(localStorage.getItem("signedInUser"));
    const selectedUser = customer.id;
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.get(
        "/api/currentbudgetandactuals/" +
        selectedUser +
        "/" +
        thismonth +
        "/" +
        thisyear,
        function(budgetData) {
            //first get the month
            if (budgetData.length > 0) {
                //then get the budget
                const categoryArray = [];
                let categoryBucket = [];
                let prevCat = "";
                let categoryBudgetTotal = 0.0;
                let categoryActualTotal = 0.0;
                let budgetTotal = 0;
                let actualsTotal = 0;
                for (var i = 0; i < budgetData.length; i++) {
                    if (!prevCat) {
                        //first row
                        categoryBucket.push(budgetData[i]);
                        prevCat = budgetData[i].category;
                        categoryBudgetTotal =
                            categoryBudgetTotal + parseFloat(budgetData[i].amount);
                        categoryActualTotal =
                            categoryActualTotal + parseFloat(budgetData[i].actual_amount);
                        if (budgetData[i].category != "Income") {
                            budgetTotal = budgetTotal + parseFloat(budgetData[i].amount);
                            actualsTotal =
                                actualsTotal + parseFloat(budgetData[i].actual_amount);
                        }
                    } else {
                        if (prevCat === budgetData[i].category) {
                            //2nd row onwards

                            categoryBucket.push(budgetData[i]);
                            categoryBudgetTotal =
                                categoryBudgetTotal + parseFloat(budgetData[i].amount);
                            categoryActualTotal =
                                categoryActualTotal + parseFloat(budgetData[i].actual_amount);
                            if (budgetData[i].category != "Income") {
                                budgetTotal = budgetTotal + parseFloat(budgetData[i].amount);
                                actualsTotal =
                                    actualsTotal + parseFloat(budgetData[i].actual_amount);
                            }
                        } else {
                            //now category has changed so push the prev category
                            categoryArray.push({
                                category: prevCat,
                                items: categoryBucket,
                                categoryBudgetTotal: categoryBudgetTotal,
                                categoryActualTotal: categoryActualTotal,
                            });
                            //start of a new Category
                            categoryBucket = [];
                            categoryBudgetTotal = 0.0;
                            categoryActualTotal = 0.0;

                            categoryBucket.push(budgetData[i]);
                            prevCat = budgetData[i].category;
                            categoryBudgetTotal =
                                categoryBudgetTotal + parseFloat(budgetData[i].amount);
                            categoryActualTotal =
                                categoryActualTotal + parseFloat(budgetData[i].actual_amount);
                            if (budgetData[i].category != "Income") {
                                budgetTotal = budgetTotal + parseFloat(budgetData[i].amount);
                                actualsTotal =
                                    actualsTotal + parseFloat(budgetData[i].actual_amount);
                            }
                        }
                    }
                } //end for loop
                //add the last category
                if (prevCat) {
                    categoryArray.push({
                        category: prevCat,
                        items: categoryBucket,
                        categoryBudgetTotal: categoryBudgetTotal,
                        categoryActualTotal: categoryActualTotal,
                    });
                }
                //end set category array

                var incomeExpenseList = $("#budget");
                //setup cards for each category
                for (var i = 0; i < categoryArray.length; i++) {
                    if (categoryArray[i].category != "Income") {
                        var categoryCard = $(
                            '<div class="card rounded budget-card" id="budget-' +
                            categoryArray[i].category +
                            '">'
                        );

                        var categoryCardBody = $('<div class="card-body text-dark">');
                        categoryCardBody.append(
                            '<h5 class="card-title budget-card-title">' +
                            categoryArray[i].category +
                            "</h5>"
                        );

                        var categoryCardText = $(
                            ' <p class="card-text " id="' +
                            categoryArray[i].category +
                            '-card-text">'
                        );
                        categoryCardText.append(
                            '<div class="row underline"><div class="col-4"> <h5>Item</h5></div><div class="col-4"><h5>Budgeted</h5></div><div class="col-4"><h5>Actuals</h5></div></div></p>'
                        );
                        var itemsArray = categoryArray[i].items;
                        if (itemsArray.length > 0) {
                            for (let j = 0; j < itemsArray.length; j++) {
                                const element = itemsArray[j];
                                categoryCardText.append(
                                    '<div class="row"><div class="col-4"> <h5>' +
                                    element.label +
                                    '</h5></div><div class="col-4"><h5>' +
                                    element.amount +
                                    '</h5></div><div class="col-4"><h5>' +
                                    element.actual_amount +
                                    "</h5></div></div>"
                                );
                            }
                        }
                        categoryCardBody.append(categoryCardText);
                        //add body to card
                        categoryCard.append(categoryCardBody);

                        //totals for each cat
                        var categoryTotalsCardBody = $('<div class="card-body text-dark">');

                        var categoryTotalsCardText = $(
                            ' <p class="card-text " id="' +
                            categoryArray[i].category +
                            '-card-text">'
                        );
                        categoryTotalsCardText.append(
                            '<div class="row underline"><div class="col-4"> <h5>Totals</h5></div><div class="col-4"><h5>' +
                            categoryArray[i].categoryBudgetTotal +
                            '</h5></div><div class="col-4"><h5>' +
                            categoryArray[i].categoryActualTotal +
                            "</h5></div></div>"
                        );
                        categoryTotalsCardBody.append(categoryTotalsCardText);
                        //add body to card
                        categoryCard.append(categoryTotalsCardBody);

                        incomeExpenseList.append(categoryCard);
                    } else {
                        //get element
                        var categoryCardText = $("#card-text-income");

                        categoryCardText.append(
                            '<div class="row underline"><div class="col-4"> <h5>Item</h5></div><div class="col-4"><h5>Budgeted</h5></div><div class="col-4"><h5>Actuals</h5></div></div><p>'
                        );
                        var itemsArray = categoryArray[i].items;

                        if (itemsArray.length > 0) {
                            for (let j = 0; j < itemsArray.length; j++) {
                                const element = itemsArray[j];
                                categoryCardText.append(
                                    '<div class="row"><div class="col-4"> <h5>' +
                                    element.label +
                                    '</h5></div><div class="col-4"><h5>' +
                                    element.amount +
                                    '</h5></div><div class="col-4"><h5>' +
                                    element.actual_amount +
                                    "</h5></div></div>"
                                );
                            }
                            //totals for each cat
                            var categoryTotalsCardBody = $(
                                '<div class="card-body text-dark">'
                            );

                            var categoryTotalsCardText = $(
                                ' <p class="card-text " id="' +
                                categoryArray[i].category +
                                '-card-text">'
                            );
                            categoryTotalsCardText.append(
                                '<div class="row underline"><div class="col-4"> <h5>Totals</h5></div><div class="col-4"><h5>' +
                                categoryArray[i].categoryBudgetTotal +
                                '</h5></div><div class="col-4"><h5>' +
                                categoryArray[i].categoryActualTotal +
                                "</h5></div></div>"
                            );
                            categoryTotalsCardBody.append(categoryTotalsCardText);
                            //add body to card
                            var categoryCard = $("#budget-income");
                            categoryCard.append(categoryTotalsCardBody);
                        }
                    }
                }

                //display budget tracker totals
                var budgetTracker = $("#card-text-totals");
                const diff = budgetTotal - actualsTotal;
                // diff = diff.toFixed(2)
                var colorClass = "";
                if (diff === 0) {
                    colorClass = "showBlack";
                } else if (diff > 0) {
                    colorClass = "showGreen";
                } else {
                    colorClass = "showRed";
                }
                var totalsdiv =
                    '<div class="row my-3">' +
                    '<h6 class="text-uppercase info-title">budgeted expenses</h6>' +
                    "</div>" +
                    '<div class="row my-3">' +
                    '<h4 class="text-uppercase mt-2 budget" id="budget"><span>$ </span>' +
                    '<span id="budget-amount">' +
                    budgetTotal +
                    "</span></h4>" +
                    "</div>" +
                    '<div class="row my-3">' +
                    '<h6 class="text-uppercase info-title">acutal expenses</h6>' +
                    "</div>" +
                    '<div class="row my-3">' +
                    '<h4 class="text-uppercase mt-2 expense" id="expense"><span>$ </span>' +
                    '<span id="expense-amount">' +
                    actualsTotal +
                    "</span></h4>" +
                    "</div>" +
                    '<div class="row my-3">' +
                    '<h6 class="text-uppercase info-title">balance in budget</h6>' +
                    "</div>" +
                    '<div class="row my-3">' +
                    '<h4 class="text-uppercase mt-2 balance ' +
                    colorClass +
                    '" id="balance"> <span>$ </span>' +
                    '<span id="balance-amount">' +
                    diff +
                    "</span></h4>" +
                    "</div>";

                budgetTracker.append(totalsdiv);

                //budgetData is a sorted array on category

                // // Loop through and display each of the customers
                // var categoryChange = "";
                // const incomeCategory = "income";
                // for (var i = 0; i < budgetData.length; i++) {
                //     // Get a reference to the budget element and populate it with tables
                //     var incomeExpenseList = $("#budget");
                //     if (!categoryChange ||
                //         categoryChange.trim() !== budgetData[i].category.trim()
                //     ) {
                //         categoryChange = budgetData[i].category;
                //     }
                //     if (incomeCategory.trim() === budgetData[i].category.trim()) {
                //         //add to income card
                //     } else {
                //         //add to expenses card set
                //         //card is already setup; just  add line items
                //     }
                //     // Then display the fields in the HTML (Section Name, Date, URL)
            }
        }
    );
}

// Run Queries!
// ==========================================
getBudget();