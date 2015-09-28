// var getData = function(){
// 	var dataset = [];
	
// // loops add all figure percentages info to dataset grouped by demographic year
// 	for (var i = 0; i < gon.figYears.length; i++){
// 		var demGroup = [];
// 		for (var j = 0; j < gon.figYears[i].length; j++){
// 			demGroup.push(gon.figYears[i][j].percent);
// 		}
// 		dataset.push(demGroup);
// 	}
// 	return dataset;
// }

// var getCause = function(){
// 	var causeSet = [];
// // loops add all figure percentages info to dataset grouped by demographic year
// 	for (var i = 0; i < gon.figYears.length; i++){
// 		var idGroup = [];
// 		for (var j = 0; j < gon.figYears[i].length; j++){
// 			idGroup.push(gon.figYears[i][j].death_id);
// 		}
// 		causeSet.push(idGroup);
// 	}
// 	return causeSet;
// }

// var ready = function(){

// // push all info from the query into the dataset for d3
// 	dataset = getData();
// 	causeSet = getCause();
// 	debugger;

// 	for (var k = 0; k < dataset.length; k++){
		
// // build a chart for each year
		
// 		// set margins
// 	var margin = {top: 20, right: 20, bottom: 10, left: 40},
//   width = 800 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;
// 	padding = 2;
		
// 		var x = d3.scale.ordinal()
//     				.rangeRoundBands([0, width], .1, .3);
// 		var y = d3.scale.linear()
// 						.domain([0, d3.max(dataset[k])/100])
//     				.range([height, 0]);
// 		var xAxis = d3.svg.axis()
// 		    .scale(x)
// 		    .orient("bottom");
// 		var yAxis = d3.svg.axis()
// 		    .scale(y)
// 		    .orient("left")
// 		    .ticks(10, "%");

// 		var chart = d3.select("#simpleChart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
// 		chart.append("text")
//       .attr("class", "title")
//       .text("Top Causes of Death");
// 		// appending axes
		

// 		chart.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//     .selectAll("text")
//       .style("text-anchor", "end")
//       .attr("dx", "-.8em")
//       .attr("dy", "-.55em")
//       .attr("transform", "rotate(-90)" );

//   chart.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 10)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Percentage (%)");
//     // adding rectangles
// 		chart.selectAll("rect")
// 			.data(dataset[k])
// 			.enter()
// 			.append("rect")
// 		.attr("x", function(d, i){
// 			return i * (width / dataset[k].length);
// 		})
// 		.attr("y", function(d){
// 			return height - (d*10);
// 		})
// 			.attr("width", width / dataset[k].length - padding)
// 			.attr("height", function(d){
// 				return d*10;
// 			})
// 			.attr("fill", function(d){
// 				return "#FFCFAD";
// 			});

// 		chart.selectAll("text")
// 			.data(dataset[k])
// 			.enter()
// 			.append("text")
// 			.text(function(d){
// 				return d;
// 			})
// 		.attr({
// 			"text-anchor": "middle",
// 			x: function(d, i){
// 				return i * (width/dataset[k].length) + (width/dataset[k].length-padding)/2;
// 			},
// 			y: function(d){
// 				return height - (d*10) - 2;
// 			},
// 			"font-family": "sans-serif",
// 			"font-size": 12,
// 			"fill": "#5E5A54"
// 		});	
// 	}

// slider
	// var brush = d3.svg.brush()
	//     .x(x)
	//     .extent([0, 0])
	//     .on("brush", brushed);

	// var slider = chart.append("g")
	//     .attr("class", "slider")
	//     .call(brush);

	// slider.selectAll(".extent,.resize")
	//     .remove();

	// slider.select(".background")
	//     .attr("height", height);

	// var handle = slider.append("circle")
	//     .attr("class", "handle")
	//     .attr("transform", "translate(0," + height / 2 + ")")
	//     .attr("r", 9);

	// slider
	//     .call(brush.event)
	//   .transition() // gratuitous intro!
	//     .duration(750)
	//     .call(brush.extent([0, 0]))
	//     .call(brush.event);

	// function brushed() {
	//   var value = brush.extent()[0];

	//   if (d3.event.sourceEvent) { // not a programmatic event
	//     value = x.invert(d3.mouse(this)[0]);
	//     brush.extent([value, value]);
	//   }

	//   handle.attr("cx", x(value));

	//   // here's where you write function
	//   // value you pass in is 
	//   d3.select("body").style("background-color", d3.hsl(value, .8, .8));
	// }
	// d3.json(gon.map, function(error, states) {
	//   if (error) return console.error(error);
	//   console.log(states);
	// });
// };


 // $(document).ready(ready);
 //$(document).on('page:load', ready);

