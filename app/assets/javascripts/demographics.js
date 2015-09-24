var getData = function(){
	var dataset = [];
	
// loops add all figure percentages info to dataset grouped by demographic year
	for (var i = 0; i < gon.figYears.length; i++){
		var demGroup = [];
		var idGroup = [];
		for (var j = 0; j < gon.figYears[i].length; j++){
			demGroup.push(gon.figYears[i][j].percent);
		}

		dataset.push(demGroup);
	}
	return dataset;
}

var getCause = function(){
	var causeSet = [];
// loops add all figure percentages info to dataset grouped by demographic year
	for (var i = 0; i < gon.figYears.length; i++){
		var idGroup = [];
		for (var j = 0; j < gon.figYears[i].length; j++){
			idGroup.push(gon.figYears[i][j].death_id);
		}
		causeSet.push(idGroup);
	}
	return causeSet;
}

var ready = function(){

// push all info from the query into the dataset for d3
	dataset = getData();
	causeSet = getCause();

	for (var k = 0; k < dataset.length; k++){
		
// build a chart for each year
		
		// set margins
		var margin = {top: 20, right: 20, bottom: 10, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
		padding = 2;
		
		var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
		var y = d3.scale.linear().range([width, 0]);
		
		// defining axes
		var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickFormat(function(d) {return dataset[d].cause})
	    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(.1, '%');
		    // above setting of ticks alters which percentages get displayed--don't know why
		// defining chart
		var chart = d3.select("#simpleChart").append("svg")
							.attr("width", width + margin.left + margin.right)
							.attr("height", height + margin.top + margin.bottom);
		// appending axes
		chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage (%)");
    // adding rectangles
		chart.selectAll("rect")
			.data(dataset[k])
			.enter()
			.append("rect")
		.attr("x", function(d, i){
			return i * (width / dataset[k].length);
		})
		.attr("y", function(d){
			return height - (d*10);
		})
			.attr("width", width / dataset[k].length - padding)
			.attr("height", function(d){
				return d*10;
			})
			.attr("fill", function(d){
				return "#FFCFAD";
			});

		chart.selectAll("text")
			.data(dataset[k])
			.enter()
			.append("text")
			.text(function(d){
				return d;
			})
		.attr({
			"text-anchor": "middle",
			x: function(d, i){
				return i * (width/dataset[k].length) + (width/dataset[k].length-padding)/2;
			},
			y: function(d){
				return height - (d*10) - 2;
			},
			"font-family": "sans-serif",
			"font-size": 12,
			"fill": "#5E5A54"
		});	

	}
// slider
var z = d3.scale.linear()
    .domain([1999, 2013])
    .range([0, width])
    .clamp(true);
var dispatch = d3.dispatch("sliderChange");
var slider = d3.select(".slider")
    .style("width", width + "px");
var sliderTray = slider.append("div")
    .attr("class", "slider-tray");
var sliderHandle = slider.append("div")
    .attr("class", "slider-handle");
sliderHandle.append("div")
    .attr("class", "slider-handle-icon")
slider.call(d3.behavior.drag()
    .on("dragstart", function() {
      dispatch.sliderChange(z.invert(d3.mouse(sliderTray.node())[0]));
      d3.event.sourceEvent.preventDefault();
    })
    .on("drag", function() {
      dispatch.sliderChange(z.invert(d3.mouse(sliderTray.node())[0]));
    }));
dispatch.on("sliderChange.slider", function(value) {
  sliderHandle.style("left", z(value) + "px")
});
	
};
$(document).ready(ready);
$(document).on('page:load', ready);

