/**********************************************************

  Sadie Mothershed & Jennifer Light CS 4460 Final Project

**********************************************************/

// setup
var width = 700;
var height = 500;

var width2 = 1300;
var svg = d3.select('svg');

var padding = { t: 80, r: 60, b: 50, l: 140 };

// chart dimensions
var barChartWidth = width2 - padding.l - padding.r;
var chartHeight = height - padding.t - padding.b;

/******************************************
Find spacing for bar bands based on the number of entries
******************************************/

d3.csv("colleges - city colleges.csv", function (csv) {
    for (var i = 0; i < csv.length; ++i) {
        csv[i].Name = String(csv[i].Name)
        csv[i].Control = String(csv[i].Control);
        csv[i].FamilyIncome = Number(csv[i]["Average Family Income"]);
        csv[i].Salary = Number(csv[i]["Mean Earnings 8 years After Entry"]);
        csv[i].Cost = Number(csv[i]["Average Cost"]);
    }

    function getControl(d) {
        if (d.Control == "Private") return "priv";
        else if (d.Control == "Public") return "pub";
        else return "blank";
    }

    console.log(csv);

    // used for scaling axes
    var incomeExtent = d3.extent(csv, function (row) {
        return row.FamilyIncome;
    });
    var costExtent = d3.extent(csv, function (row) {
        return row.Cost;
    });
    var fiberExtent = d3.extent(csv, function (row) {
        return row.Fiber;
    });
    var salaryExtent = d3.extent(csv, function (row) {
        return row.Salary;
    });

    // map csv values to vars
    var schoolNames = csv.map(d => d.Name);
    var schoolIncomes = csv.map(d => d.FamilyIncome);
    var schoolCosts = csv.map(d => d.Cost);
    var schoolSalary = csv.map(d => d.Salary);
    var controls = csv.map(d => d.Control);

    // axis setup
    var xScale = d3.scaleBand().domain(schoolNames).range([0, barChartWidth]);
    var yScale = d3.scaleLinear().domain(incomeExtent).range([chartHeight, 30]);

    var xScale2 = d3.scaleLinear().domain([0, salaryExtent[1]]).range([50, width]);
    var yScale2 = d3.scaleLinear().domain(costExtent).range([430, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);

    // select the tooltip div
    var tooltip = d3.select("#tooltip");


    /******************************************
                  Create charts 
    ******************************************/

    var chart1 = d3
        .select("#chart1")
        .append("svg:svg")
        .attr("id", "svg1")
        .attr("width", width2)
        .attr("height", 600);

    var chart2 = d3
        .select("#chart2")
        .append("svg:svg")
        .attr("id", "svg2")
        .attr("width", width + 100)
        .attr("height", height);


    /******************************************
                  Axes + Labels
    ******************************************/

    // chart 1 title
    chart1.append('g')
        .text('label')
        .append("text")
        .text("Average Family Income in City Colleges")
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(' + (width / 2 - 150) + ', 15)')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold');

    // chart 1 x axis values
    var xAxisValues = chart1.append("g")
        .attr("transform", "translate(70," + (height - 130) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr('font-size', '7px')
        .style("text-anchor", "start")
        .attr("transform", "translate(10, 0) rotate(55)");

    // chart 1 x axis label
    chart1.append('g')
        .text('label')
        .append("text")
        .text("College Name")
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(' + ((width / 2) + Number(100)) + ', ' + (height + Number(0)) + ')')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold');

    // chart 1 y axis
    chart1
        .append("g")
        .attr("transform", "translate(70, 0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    // chart 1 y axis label
    chart1.append('g')
        .text('label')
        .append("text")
        .text("Mean Family Income")
        .attr('text-anchor', 'end')
        .attr('y', 6)
        .attr('dy', '.75em')
        .attr('x', -(140))
        .attr('transform', 'rotate(-90)')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold');

    // chart 2 title
    chart2.append('g')
        .text('label')
        .append("text")
        .text("Cost of Attendance vs Post-Grad Salary")
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(' + 95 + ', 25)')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold');

    // chart 2 x axis
    chart2
        .append("g")
        .attr("transform", "translate(20," + (height - 70) + ")")
        .call(xAxis2)
        .append("text")
        .attr("class", "label")
        .attr("x", width2)
        .attr("y", -6)
        .style("text-anchor", "end");

    // chart 2 x axis label
    chart2.append('g')
        .text('label')
        .append("text")
        .text("Mean Salary 4-Years Post-Graduation")
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(' + (155) + ', ' + 495 + ')')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold');

    // chart 2 y axis
    chart2
        .append("g")
        .attr("transform", "translate(70, 0)")
        .call(yAxis2)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".75em")
        .style("text-anchor", "end");

    // chart 2 y axis label
    chart2.append('g')
        .text('label')
        .append("text")
        .text("Cost of Attendance")
        .attr('text-anchor', 'end')
        .attr('y', 6)
        .attr('dy', '.75em')
        .attr('x', -(170))
        .attr('transform', 'rotate(-90)')
        .attr('font-size', '16px')
        .attr('font-weight', 'bold');


    /******************************************
              Create Bars for the Histogram
    ******************************************/

    var bar = chart1.selectAll("rect")
        .data(csv)
        .enter()
        .append("rect")
        .attr("id", "bars")
        .attr("x", d => xScale(d.Name) + 71)
        .attr("y", d => yScale(d.FamilyIncome))
        .attr("width", 5)
        .attr("height", d => chartHeight - yScale(d.FamilyIncome))
        .attr("class", d => getControl(d))

        /******************************************
                  Create Tooltips for bars
        ******************************************/

        .on("mouseover", function (event, i) {
            tooltip.style("visibility", "visible")
                .html(`<strong>${schoolNames[i]}</strong>
                <br><i>${controls[i]}</i>
                        <br>Average Family Income: $${schoolIncomes[i]}
                        <br>Cost of Attendance: $${schoolCosts[i]}
                        <br>Mean Salary: $${schoolSalary[i]}`);

            // highlight the bar
            d3.select(this).style("fill", "orange");
        })

        // position tooltip
        .on("mousemove", function (event) {
            tooltip.style("top", "240px")
                .style("left", "1200px");
        })

        // hide tooltip and reset bar color
        .on("mouseout", function () {
            tooltip.style("visibility", "hidden");
            d3.select(this).style("fill", null);
        });

    /******************************************
        Create Circles for the Scatterplot
    ******************************************/

    var circles = chart2.selectAll("circle")
        .data(csv)
        .enter()
        .append("circle")
        .attr("cx", d => xScale2(d.Salary))
        .attr("cy", d => yScale2(d.Cost))
        .attr("r", 5)
        .attr("stroke", "black")
        .attr("class", d => getControl(d));

    /******************************************
                 Create Brushes 
    ******************************************/

    // define brush
    var brush = d3.brush()
        .extent([[0, 0], [width + 20, height]])
        .on("start", brushstart)
        .on("brush", highlightBrushedCircles);

    // add brush to scatterplot
    chart2.append('g')
        .attr('class', 'brush')
        .call(brush);

    // start brush
    function brushstart() {
        d3.select("#chart2")
            .selectAll('circle')
            .attr("class", "non-brushed");
        d3.select('brush').call(brush.move, null);
    }

    // highlight circles 
    function highlightBrushedCircles() {
        var e = d3.event.selection;

        if (e) {

            // coordinates of brush area
            var [x0, y0] = e[0];
            var [x1, y1] = e[1];

            d3.select("#chart2")
                .selectAll("circle")
                .attr("class", "non-brushed");

            // filter data within the brush area in the scatterplot
            var brushedData = csv.filter(d => {
                var cx = xScale2(d.Salary);
                var cy = yScale2(d.Cost);
                return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
            });

            console.log("filtered circles:", brushedData);

            highlightLinked(brushedData);
        }
    }

    // highlight linked elements in both charts
    function highlightLinked(filteredData) {

        // highlight circles on scatterplot
        d3.select('#chart2').selectAll('circle')
            .attr('class', function (d) {
                return filteredData.includes(d) ? getControl(d) : 'non-brushed';
            });

        // highlight bars on histogram
        d3.select('#chart1').selectAll('#bars')
            .attr('class', function (d) {
                return filteredData.includes(d) ? getControl(d) : 'non-brushed';
            });

        console.log(filteredData[0].CerealName);
    }

    /******************************************
                Sorting Functions 
    ******************************************/

    function sortByIncome() {

        // sort csv
        csv.sort((a, b) => a.FamilyIncome - b.FamilyIncome);
        xScale.domain(csv.map(d => d.Name));

        // bars
        chart1.selectAll("rect")
            .data(csv, d => d.Name)
            .transition()
            .duration(1000)
            .attr("x", d => xScale(d.Name) + 71);

        // clear existing graph
        xAxisValues.remove();

        // update x-axis
        chart1.select("g")
            .attr("transform", "translate(70," + (height - 130) + ")")
            .transition()
            .duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr('font-size', '7px')
            .style("text-anchor", "start")
            .attr("transform", "translate(10, 0) rotate(55)");

    }

    function sortByCost() {

        // sort csv 
        csv.sort((a, b) => a.Cost - b.Cost);
        xScale.domain(csv.map(d => d.Name));

        // bars
        chart1.selectAll("rect")
            .data(csv, d => d.Name)
            .transition()
            .duration(1000)
            .attr("x", d => xScale(d.Name) + 71);

        // clear existing chart
        xAxisValues.remove();

        // updpate x-axis
        chart1.select("g")
            .attr("transform", "translate(70," + (height - 130) + ")")
            .transition()
            .duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr('font-size', '7px')
            .style("text-anchor", "start")
            .attr("transform", "translate(10, 0) rotate(55)");

    }

    function sortBySalary() {

        csv.sort((a, b) => a.Salary - b.Salary);
        xScale.domain(csv.map(d => d.Name));

        chart1.selectAll("rect")
            .data(csv, d => d.Name)
            .transition()
            .duration(1000)
            .attr("x", d => xScale(d.Name) + 71);

        // clear existing chart
        xAxisValues.remove();

        // updpate x-axis
        chart1.select("g")
            .attr("transform", "translate(70," + (height - 130) + ")")
            .transition()
            .duration(1000)
            .call(xAxis)
            .selectAll("text")
            .attr('font-size', '7px')
            .style("text-anchor", "start")
            .attr("transform", "translate(10, 0) rotate(55)");
    }

    // dropdown
    var dropdown = document.getElementById('sortDropdown');

    //event listener
    dropdown.addEventListener('change', function () {

        var selectedOption = dropdown.value;

        if (selectedOption === 'Cost') {
            sortByCost();
        }
        else if (selectedOption === 'FamilyIncome') {
            console.log("test");
            sortByIncome();
        }
        else if (selectedOption === 'Salary') {
            console.log("test");
            sortBySalary();
        }
    });

});