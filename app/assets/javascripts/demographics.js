var getData = function(){
	var dataset = [];
	
// loops add all figure percentages info to dataset grouped by demographic year
	for (var i = 0; i < gon.figYears.length; i++){
		var demGroup = [];
		for (var j = 0; j < gon.figYears[i].length; j++){
			demGroup.push(gon.figYears[i][j].percent);
		}
		dataset.push(demGroup);
	}
	return dataset;
}
$(document).on('ready page:load', function () {
  var dataset = getData(),
  usedata = dataset[dataset.length-1];

  var width = 1000,
  height = 500,
  padding= 20;
  
  var xScale = d3.scale.ordinal()
              .domain(d3.range(usedata.length))
              .rangeRoundBands([0, width], 0.05)

  var yScale = d3.scale.linear()
              .domain([0, d3.max(usedata)])
              .range([0, height]);

  var rScale = d3.scale.linear()
                     .domain([0, d3.max(usedata, function(d) { return d; })])
                     .range([2, 5]);

  var svg = d3.select("svg").append("svg")
            .attr("width", width)
            .attr("height", height);

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("right")
                .ticks(20);


  var circle = svg.selectAll("circle")
    .data(usedata)
    .enter()
    .append("circle")
      .attr("r", (function(d) {return d*3}))
      .attr("cx", (function(d, i) { return i*50}))
      .attr("cy", (function(d){ 
        // debugger;
        return yScale(d)}))
      .attr("class",  "bubble")
    
    circle
        .append("title")
       .text(function(d) {
             return d;
      })


      // individual label points
  svg.selectAll("text")
       .data(usedata)
       .enter()
       .append("text")
       .text(function(d) {
          return d;
       })
       .attr("x", function(d, i) {
          return (i * 50)-2;
       })
       .attr("y", function(d){return d+10})
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "#B8AA95");
       // yaxis append
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, 0)")
      .call(yAxis);

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .data(usedata)
    .text(function(d){
        return d;
      })


  var updateData = function(id, num){



    d3.select('#' + id)
        .on("click", function() {
          var dataset = getData(),
          usedata = dataset[num],
          yScale = d3.scale.linear()
            .domain([0, d3.max(usedata)])
            .range([0, height]),
          yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("right")
            .ticks(20);

          svg.selectAll("circle")
          .data(usedata)
          .transition() 
          .duration(2000)
            .attr("r", (function(d) {return d*3}))
            .attr("cx", (function(d, i) { return i*50}))
            .attr("cy", (function(d){ return yScale(d)}))
            .attr("class",  "bubble");

          svg.selectAll("text")
             .data(usedata)
             .transition() 
             .duration(2000) 
             .text(function(d) { return d;})
             .attr("x", function(d, i) {return xScale(i) + xScale.rangeBand() / 2;})
             .attr("y", function(d) { return yScale(d) ;})
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("fill", "#B8AA95");
             // yaxis append
          svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        });
  };

  updateData('click1999', 0);
  updateData('click2000', 1);
  updateData('click2001', 2);
  updateData('click2002', 3); 
  




  // circle.exit().remove();

 });


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

