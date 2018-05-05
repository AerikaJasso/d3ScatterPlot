var width = 600;
var height = 600;
var padding = 50;

// remove incomplete objects from data set
var data = regionData.filter(mustHaveKeys);

function mustHaveKeys(obj) {
  var keys = [
    "subscribersPer100",
    "adultLiteracyRate",
    "medianAge",
    "urbanPopulationRate"
  ];

  for(var x = 0; x < keys.length; x ++){
    if(obj[keys[x]] === null) return false;
  }
  return true;
}

var yScale = d3.scaleLinear()
                .domain(d3.extent(data,
                d => d.subscribersPer100))
                .range([height - padding, padding]);

var xScale = d3.scaleLinear()
                .domain(d3.extent(data,
                d => d.adultLiteracyRate))
                .range([padding, width-padding]);


var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(
                      data, d => d.medianAge
                    ))
                    .range([5, 30]);

var fillScale = d3.scaleLinear()
                  .domain(d3.extent(data, d => d.urbanPopulationRate))
                  .range(["green", "blue"]);

var xAxis = d3.axisBottom(xScale)
              .tickSize(- height + 2 * padding)
              .tickSizeOuter(0);

var yAxis = d3.axisLeft(yScale)
              .tickSize(-width + 2 * padding)
              .tickSizeOuter(0);

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// append axis to the page
svg.append("g")
    .attr("transform", "translate(0,"+(height-padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate("+ padding+ ",0)")
    .call(yAxis);

// text x axis

svg.append("text")
    .attr("x", width/2)
    .attr("y", (height - padding))
    .attr("dy", padding/2)
    .style("text-anchor", "middle")
    .text("Literacy Rate, Aged 15 and Up");

// text y axis
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("x", -height/2)
.attr("dy", padding/2)
.style("text-anchor", "middle")
.text("Cellular Subscribers per 100 People");

// main title
svg.append("text")
    .attr("x", width/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "2em")
    .text("Cellular Subscriptions vs. Literacy Rate");



svg  
  .selectAll("circle")
  .data(data)

  .enter()
  .append("circle")
    
    .attr("cx", d => xScale(d.adultLiteracyRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("r", d => radiusScale(d.medianAge))
    .attr("fill", d => fillScale(d.urbanPopulationRate))
    .attr("stroke", "#fff");