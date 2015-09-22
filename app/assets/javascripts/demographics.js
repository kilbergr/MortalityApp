var loop = function(){
	var dataset = [];
// loops add all figure info to dataset grouped by demographic year
	for (var i = 0; i < gon.figYears.length; i++){
		var demGroup = [];
		for (var j = 0; j < gon.figYears[i].length; j++){
			demGroup.push(gon.figYears[i][j].percent)
		}
		dataset.push(demGroup);
	}
	return dataset;
}
var ready = function(){
	// alert(gon.demographics[0].state)
	dataset = loop()

	for (var k = 0; k < dataset.length; k++){
		
			// build a chart for each year
			debugger;
		var w = 800;
		var h = 300;
		var padding = 2;
	
		var svg = d3.select("#simpleChart").append("svg")
							.attr("width", w)
							.attr("height", h);
		svg.selectAll("rect")
			.data(dataset[k])
			.enter()
			.append("rect")
		.attr("x", function(d, i){
			return i * (w / dataset[k].length);
		})
		.attr("y", function(d){
			return h - (d*10);
		})
			.attr("width", w / dataset[k].length - padding)
			.attr("height", function(d){
				return d*10;
			})
			.attr("fill", function(d){
				return "#FFCFAD";
			});

		svg.selectAll("text")
			.data(dataset[k])
			.enter()
			.append("text")
			.text(function(d){
				return d;
			})
		.attr({
			"text-anchor": "middle",
			x: function(d, i){
				return i * (w/dataset[k].length) + (w/dataset[k].length-padding)/2;
			},
			y: function(d){
				return h - (d*10);
			},
			"font-family": "sans-serif",
			"font-size": 12,
			"fill": "#5E5A54"
		});	
	}
	
};
$(document).ready(ready);
$(document).on('page:load', ready);

