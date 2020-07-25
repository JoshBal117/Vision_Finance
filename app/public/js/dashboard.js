// D3Js donut
//var d3 = require("d3");
//import { interpolateSpectral } from "d3-interpolate";
//var d3interpolate = require("d3-interpolate");
var masterColorChart = [
    "rgba(213, 0, 0, 0.8)",
    "rgba(0, 200, 83, 0.9)",
    "rgba(81, 45, 168, 0.9)",
    "rgba(255, 111, 0, 0.8)",
    "rgba(23, 212, 241, 0.9)",
    "rgba(238, 255, 65, 0.8)",
    "rgba(41, 98, 255, 0.9)",
];

function getMonthlyExpense() {
    //const selectedUser = $("#userId");
    //for now it is fixed
    const customer = JSON.parse(localStorage.getItem("signedInUser"));
    const selectedUser = customer.id;
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.get(
        "/api/monthlyexpenses/" + selectedUser + "/" + thismonth + "/" + thisyear,
        function(monthlyExpenseData) {
            var monthlyExpenseLabels = [];
            var monthlyExpenseAmt = [];
            for (let index = 0; index < monthlyExpenseData.length; index++) {
                monthlyExpenseAmt.push(monthlyExpenseData[index].t_amt);
                monthlyExpenseLabels.push(monthlyExpenseData[index].t_date);
            }
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: monthlyExpenseLabels,
                    datasets: [{
                        data: monthlyExpenseAmt,
                        lineTension: 0,
                        backgroundColor: "transparent",
                        borderColor: "#007bff",
                        borderWidth: 4,
                        pointBackgroundColor: "#007bff",
                    }, ],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }, ],
                    },
                    legend: {
                        display: false,
                    },
                },
            });
        }
    );
} //getMonthlyExpense

function displayMonthHeader() {
    var monthElement = $("#headermonth");
    var monthName = getCurrentMonthName(parseInt(budgetData[0].budgeted_month));
    monthElement.append($("<h1>").text(monthName));
} //displayMonthlyHeader

function getExpenseBreakdown() {
    //const selectedUser = $("#userId");
    //for now it is fixed
    const customer = JSON.parse(localStorage.getItem("signedInUser"));
    const selectedUser = customer.id;
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.get(
        "/api/monthlyexpensesbreakdown/" +
        selectedUser +
        "/" +
        thismonth +
        "/" +
        thisyear,
        function(monthlyExpenseData) {
            var monthlyExpenseLabels = [];
            var monthlyExpenseAmt = [];
            var colorchart = [];
            for (let index = 0; index < monthlyExpenseData.length; index++) {
                monthlyExpenseAmt.push(monthlyExpenseData[index].t_amt);
                monthlyExpenseLabels.push(
                    monthlyExpenseData[index].transaction_category
                );
            }

            if (monthlyExpenseData.length <= masterColorChart.length) {
                colorchart = masterColorChart.splice(0, monthlyExpenseData.length);
            }

            var spendingTotalsChartCtx = document.getElementById(
                "mySpendingTotalsChart"
            );

            var pieData = {
                labels: monthlyExpenseLabels,
                datasets: [{
                    data: monthlyExpenseAmt,
                    label: "Expenses",
                    backgroundColor: colorchart,
                }, ],
            };
            var budgetPieChart = new Chart(spendingTotalsChartCtx, {
                type: "doughnut",
                data: pieData,
                options: {},
            });
        }
    );
} //getExpenseBreakdown

function getMoneyTracker() {
    //const selectedUser = $("#userId");
    //for now it is fixed
    const customer = JSON.parse(localStorage.getItem("signedInUser"));
    const selectedUser = customer.id;
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.get(
        "/api/currentbudgetbycategory/" +
        selectedUser +
        "/" +
        thismonth +
        "/" +
        thisyear,
        function(monthlyExpenseData) {
            var monthlyExpenseLabels = [];
            var monthlyBudgetAmt = [];
            var monthlyAcutalAmt = [];
            var colorchart = [];
            for (let index = 0; index < monthlyExpenseData.length; index++) {
                if (monthlyExpenseData[index].category === "Income") {
                    //should we do a diff graph for income
                    //skip for now
                } else {
                    monthlyAcutalAmt.push(monthlyExpenseData[index].actual_amount);
                    monthlyBudgetAmt.push(monthlyExpenseData[index].budgeted_amount);
                    monthlyExpenseLabels.push(monthlyExpenseData[index].category);
                }
            }
            if (monthlyExpenseData.length <= masterColorChart.length) {
                colorchart = masterColorChart.splice(0, monthlyExpenseData.length);
            }

            var budgetRadarChartCtx = document.getElementById("budgetRadarChart");

            var radarChart = new Chart(budgetRadarChartCtx, {
                type: "radar",
                data: {
                    labels: monthlyExpenseLabels,
                    datasets: [{
                            label: "Budget",
                            fill: true,
                            backgroundColor: "rgba(27, 199, 24,0.2)",
                            borderColor: "rgba(27, 199, 24,1)",
                            pointBorderColor: "#fff",
                            pointBackgroundColor: "rgba(27, 199, 24,1)",
                            data: monthlyBudgetAmt,
                        },
                        {
                            label: "Actuals",
                            fill: true,
                            backgroundColor: "rgba(255,99,132,0.2)",
                            borderColor: "rgba(255,99,132,1)",
                            pointBorderColor: "#fff",
                            pointBackgroundColor: "rgba(255,99,132,1)",
                            pointBorderColor: "#fff",
                            data: monthlyAcutalAmt,
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: "Distribution of actuals and budget categories",
                    },
                },
            });
        }
    );
} //getMoneyTracker

function getBudgetedChart() {
    const customer = JSON.parse(localStorage.getItem("signedInUser"));
    const selectedUser = customer.id;
    const thismonth = new Date().getMonth();
    const thisyear = new Date().getFullYear();
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    //use the same api but ignore the actual values
    $.get(
        "/api/currentbudgetbycategory/" +
        selectedUser +
        "/" +
        thismonth +
        "/" +
        thisyear,
        function(monthlyExpenseData) {
            var monthlyExpenseLabels = [];
            var monthlyBudgetAmt = [];
            var colorchart = [];
            for (let index = 0; index < monthlyExpenseData.length; index++) {
                if (monthlyExpenseData[index].category === "Income") {
                    //should we do a diff graph for income
                    //skip for now
                } else {
                    monthlyBudgetAmt.push(monthlyExpenseData[index].budgeted_amount);
                    monthlyExpenseLabels.push(monthlyExpenseData[index].category);
                }
            }
            if (monthlyExpenseData.length <= masterColorChart.length) {
                colorchart = masterColorChart.splice(0, monthlyExpenseData.length);
            }
            var pieChartCtx = document.getElementById("budgetPieChart");
            var pieData = {
                labels: monthlyExpenseLabels,
                datasets: [{
                    data: monthlyBudgetAmt,
                    label: "Categories",
                    backgroundColor: colorchart,
                }, ],
            };
            var budgetPieChart = new Chart(pieChartCtx, {
                type: "polarArea",
                data: pieData,
            });
        }
    );
} //getBudgetedChart()

getMoneyTracker();
getMonthlyExpense();
getExpenseBreakdown();
getBudgetedChart();