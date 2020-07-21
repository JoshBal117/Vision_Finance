function getCurrentMonthName(dtMonth) {
    monthNamelist = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return monthNamelist[dtMonth];
}

function getBudget() {
    //const selectedUser = $("#userId");
    //for now it is fixed
    const selectedUser = "1";
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.get(
        "/api/currentbudget/" + selectedUser + "/" + thismonth + "/" + thisyear,
        function(budgetData) {
            //first get the month
            if (budgetData.length > 0) {
                var monthElement = $("#headermonth");
                var monthName = getCurrentMonthName(
                    parseInt(budgetData[0].budgeted_month)
                );
                monthElement.append($("<h1>").text(monthName));
                //then get the budget
                const categoryArray = [];
                let categoryBucket = [];
                let prevCat = "";
                for (var i = 0; i < budgetData.length; i++) {
                    // let isPresent = false;
                    // for (let index = 0; index < categoryArray.length; index++) {
                    //     if (categoryArray[index] === budgetData[i].category) {
                    //         isPresent = true;
                    //     }else{
                    //         break;
                    //     }
                    // }
                    // if (!isPresent) {
                    //     categoryArray.push(budgetData[i].category);
                    // }
                    if (!prevCat) {
                        //first row
                        categoryBucket.push(budgetData[i]);
                        prevCat = budgetData[i].category;
                    } else {
                        if (prevCat === budgetData[i].category) {
                            //2nd row onwards

                            categoryBucket.push(budgetData[i]);
                        } else {
                            //now category has changed so push the prev category
                            categoryArray.push({
                                category: prevCat,
                                items: categoryBucket,
                            });
                            //start of a new Category
                            categoryBucket = [];
                            categoryBucket.push(budgetData[i]);
                            prevCat = budgetData[i].category;
                        }
                    }
                } //end for loop
                //add the last category
                if (prevCat) {
                    categoryArray.push({
                        category: prevCat,
                        items: categoryBucket,
                    });
                }
                //end set category array

                var incomeexpenseList = $("#budget");
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
                            '<div class="row"><div class="col-4"> <h5>Item</h5></div><div class="col-4"><h5>Budgeted</h5></div><div class="col-4"><h5>Actuals</h5></div></div></p>'
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
                                    "</h5></div></div></p>"
                                );
                            }
                        }
                        categoryCardBody.append(categoryCardText);
                        categoryCard.append(categoryCardBody);
                        incomeexpenseList.append(categoryCard);
                    } else {
                        //get element
                        var categoryCardText = $("#card-text-income");

                        categoryCardText.append(
                            '<div class="row"><div class="col-4"> <h5>Item</h5></div><div class="col-4"><h5>Budgeted</h5></div><div class="col-4"><h5>Actuals</h5></div></div></p>'
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
                                    "</h5></div></div></p>"
                                );
                            }
                        }
                    }
                }

                //budgetData is a sorted array on category

                // // Loop through and display each of the customers
                // var categoryChange = "";
                // const incomeCategory = "income";
                // for (var i = 0; i < budgetData.length; i++) {
                //     // Get a reference to the budget element and populate it with tables
                //     var incomeexpenseList = $("#budget");
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