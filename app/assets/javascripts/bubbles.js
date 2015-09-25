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
};

$(document).on('ready page:load', function () {
dataset = getData();
   
  var svg = d3.select("svg");
 // debugger;
  var circle = svg.selectAll(".circle")
    .data(dataset[2]);


  circle.exit().remove();

  circle.enter().append("circle")
      .attr("r", (function(d) {return d*5}))
      .style("fill", "#FFCFAD")
      .style("stroke", "#B8AA95")
      .style("opacity", .5);

  circle
      .attr("cx", (function(d) {return d*20}))
      .attr("cy", (function(d) {return 1/d*200}));

});
