// D3Js donut
//var d3 = require("d3");
//import { interpolateSpectral } from "d3-interpolate";
//var d3interpolate = require("d3-interpolate");

var svg = d3.select(document.body).append("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2;
var arc = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius - 1);

var pie = d3
    .pie()
    .padAngle(0.005)
    .sort(null)
    .value((d) => d.value);

var data = [{
        expense: "Food",
        value: "400",
    },

    {
        expense: "Transportation",
        value: "350",
    },

    {
        expense: "House",
        value: "1200",
    },

    {
        expense: "Entertainment",
        value: "100",
    },

    {
        expense: "Personal",
        value: "120",
    },

    {
        expense: "Child care",
        value: "360",
    },

    {
        expense: "Misc",
        value: "80",
    },
];

var arcs = pie(data);

var color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(
        d3
        .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse()
    );
svg
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d) => color(d.data.expense))
    .attr("d", arc)
    .append("title")
    .text((d) => d.data.expense + " : " + d.data.value.toLocaleString());

svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", (d) => "translate(" + arc.centroid(d) + "})")
    .call((text) =>
        text
        .append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text((d) => d.data.expense)
    )
    .call((text) =>
        text
        .filter((d) => d.endAngle - d.startAngle > 0.25)
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text((d) => d.data.value.toLocaleString())
    );