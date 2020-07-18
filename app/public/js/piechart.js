var pieChartCtx = document.getElementById("myPieChart");
var pieData = {
    labels: [
        "Food",
        "House",
        "Transportation",
        "Personal",
        "Entertainment",
        "Misc",
        "Child Care",
    ],
    datasets: [{
        data: [400, 1200, 300, 100, 300, 120, 350],
        label: "Expenses",
        backgroundColor: [
            "rgba(213, 0, 0, 0.8)",
            "rgba(255, 111, 0, 0.8)",
            "rgba(238, 255, 65, 0.8)",
            "rgba(0, 200, 83, 0.9)",
            "rgba(41, 98, 255, 0.9)",
            "rgba(0, 200, 83, 0.9)",
            "rgba(81, 45, 168, 0.9)",
        ],
    }, ],
};
var myPieChart = new Chart(pieChartCtx, {
    type: "polarArea",
    data: pieData,
});