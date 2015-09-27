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
  var width = 1400,
  height = 500;
  var svg = d3.select("svg").append("svg")
            .attr("width", width)
            .attr("height", height);


  var circle = svg.selectAll("circle")
    .data(dataset[0])
    .enter().append("circle")
      .attr("r", (function(d) {return d*3}))
      .attr("cx", (function(d, i) {return i*50}))
      .attr("cy", height/2)
      .attr("class",  "bubble")
      .on("mouseover", function(){return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");
    });
    svg.selectAll("text")
       .data(dataset[0])
       .enter()
       .append("text")
       .text(function(d) {
          return d;
       })
       .attr("x", function(d, i) {
          return (i * 50)-2;
       })
       .attr("y", height/2)
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "#B8AA95");

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .data(dataset[0])
    .text(function(d){
        return d;
      })
    // .text("PERCENTAGE HERE");


  // circle.exit().remove();

 
  

});

//   var width = 800,
  // height = 600;

  // var canvas = d3.select("body").append("svg")
  //             .attr("width", width)
  //             .attr("height", height)
  //             .append("g")
  //               .attr("transform", "translate(50,50)");
  // var pack = d3.layout.pack()
  //             .size([width, height - 50])
  //             .padding(10)


