var ready;
	ready = function(){
	// alert(gon.demographics[0].state)
  var dataset = [];

	for (var i = 0; i < gon.figures.length; i++){
		dataset.push(gon.figures[i].percent)
	}
		var w = 800;
		var h = 300;
		var padding = 2;
		var svg = d3.select("#simpleChart").append("svg")
							.attr("width", w)
							.attr("height", h);
		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
		.attr("x", function(d, i){
			return i * (w / dataset.length);
		})
		.attr("y", function(d){
			return h - (d*10);
		})
			.attr("width", w / dataset.length - padding)
			.attr("height", function(d){
				return d*10;
			})
			.attr("fill", function(d){
				return "#FFCFAD";
			});

		svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d){
				return d;
			})
		.attr({
			"text-anchor": "middle",
			x: function(d, i){
				return i * (w/dataset.length) + (w/dataset.length-padding)/2;
			},
			y: function(d){
				return h - (d*10);
			},
			"font-family": "sans-serif",
			"font-size": 12,
			"fill": "#5E5A54"
		});	
};
$(document).ready(ready);
$(document).on('page:load', ready);

