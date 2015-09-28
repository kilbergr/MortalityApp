// var getData = function(){
//   var dataset = {};
//    dataset.children = [];
// // loops add all figure percentages info to dataset grouped by demographic year
//   for (var i = 0; i < gon.figYears.length; i++){
//     var demGroup = [];
//     for (var j = 0; j < gon.figYears[i].length; j++){
//       var eachEntry = []
//       demGroup["percent"] = '' + gon.figYears[i][j].percent + '';
//       demGroup["cause"] = gon.deaths[j].cause;
//       eachEntry.push(demGroup)
//     }
//     debugger;
//     dataset.children.push(eachEntry);
//   }
//   return dataset;
// };

// SAFE WAY TO RETURN TO
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

// $(document).on('ready page:load', function(){
//   dataset = getData();
//   var diameter = 300,
//     format = d3.format(",d");

// var color = d3.scale.ordinal()
//     .domain(["Sqoop", "Pig", "Apache", "a", "b", "c", "d", "e", "f", "g"])
//     .range(["steelblue", "pink", "lightgreen", "violet", "orangered", "green", "orange", "skyblue", "gray", "aqua"]);

// var bubble = d3.layout.pack()
//     .sort(null)
//     .size([diameter, diameter])
//     .padding(10);

// var svg = d3.select("#chart").append("svg")
//     .attr("width", diameter)
//     .attr("height", diameter)
//     .attr("class", "bubble");

// var root = dataset[0],
// root1 = dataset[1],
// root2 = dataset[2],
// root3 = dataset[4];


// var root4 = {

//     "children": [{
//         "name": "ASP.NET",
//         "size": 10
//     }, {
//         "name": "WPF",
//         "size": 20
//     }, {
//         "name": "JAVASCRIPT",
//         "size": 30
//     }, {
//         "name": "C#.NET",
//         "size": 40
//     }, {
//         "name": "HTML",
//         "size": 15
//     }, {
//         "name": "D3.JS",
//         "size": 60
//     }, {
//         "name": "VB.NET",
//         "size": 50
//     }, {
//         "name": "LINUX",
//         "size": 45
//     }, {
//         "name": "C",
//         "size": 70
//     }, {
//         "name": "C++",
//         "size": 65
//     }, {
//         "name": "HTL",
//         "size": 15
//     }, {
//         "name": "3.JS",
//         "size": 60
//     }, {
//         "name": "B.NET",
//         "size": 50
//     }, {
//         "name": "LUX",
//         "size": 45
//     }, {
//         "name": "Cjj",
//         "size": 70
//     }, {
//         "name": "Ckljkl++",
//         "size": 65
//     }]
// };

// var node = svg.selectAll(".node")
//     .data(bubble.nodes(classes(root))
//     .filter(function (d) {
//     return !d.children;
// }))
//     .enter().append("g")
//     .attr("class", "node")
//     .attr("transform", function (d) {
//     return "translate(" + d.x + "," + d.y + ")";
// });

// node.append("title")
//     .text(function (d) {
//     return d.className + ": " + format(d.value);
// });

// node.append("circle")
//     .attr("r", function (d) {
//     return d.r;
// })
//     .style("fill", function (d, i) {
//     return color(i);
// });



// // Returns a flattened hierarchy containing all leaf nodes under the root.

// function classes(root) {
//     var classes = [];

//     function recurse(name, node) {
//         if (node.children) node.children.forEach(function (child) {
//             recurse(node.name, child);
//         });
//         else classes.push({
//             packageName: name,
//             className: node.name,
//             value: node.size
//         });
//     }

//     recurse(null, root);
//     return {
//         children: classes
//     };
// }

// //d3.select(self.frameElement).style("height", diameter + "px");


// //My Refer;
// var click = 0;

// function changevalues() {
//     click++;
//     if (click == 1) changebubble(root2);
//     else if (click == 2) changebubble(root3);
//     else changebubble(root4);

// }

// //update function
// function changebubble(root) {
//     var node = svg.selectAll(".node")
//         .data(
//             bubble.nodes(classes(root)).filter(function (d){return !d.children;}),
//             function(d) {return d.className} // key data based on className to keep object constancy
//         );
    
//     // capture the enter selection
//     var nodeEnter = node.enter()
//         .append("g")
//         .attr("class", "node")
//         .attr("transform", function (d) {
//             return "translate(" + d.x + "," + d.y + ")";
//         });
    
//     // re-use enter selection for circles
//     nodeEnter
//         .append("circle")
//         .attr("r", function (d) {return d.r;})
//         .style("fill", function (d, i) {return color(i);})
    
//     // re-use enter selection for titles
//     nodeEnter
//         .append("title")
//         .text(function (d) {
//             return d.className + ": " + format(d.value);
//         });
    
//     node.select("circle")
//         .transition().duration(1000)
//         .attr("r", function (d) {
//             return d.r;
//         })
//         .style("fill", function (d, i) {
//             return color(i);
//         });

//     node.transition().attr("class", "node")
//         .attr("transform", function (d) {
//         return "translate(" + d.x + "," + d.y + ")";
//     });

//     node.exit().remove();

//     // Returns a flattened hierarchy containing all leaf nodes under the root.
//     function classes(root) {
//         var classes = [];

//         function recurse(name, node) {
//             if (node.children) node.children.forEach(function (child) {
//                 recurse(node.name, child);
//             });
//             else classes.push({
//                 packageName: name,
//                 className: node.name,
//                 value: node.size
//             });
//         }

//         recurse(null, root);
//         return {
//             children: classes
//         };
//     }

//     //d3.select(self.frameElement).style("height", diameter + "px");
// }

// function updateBubble1() {changebubble(root);};
// function updateBubble2() {changebubble(root2);};
// function updateBubble3() {changebubble(root3);};
// function updateBubble4() {changebubble(root4);};

// d3.select("#dataset1").on("click",updateBubble1);
// d3.select("#dataset2").on("click",updateBubble2);
// d3.select("#dataset3").on("click",updateBubble3);
// d3.select("#dataset4").on("click",updateBubble4);
// })


$(document).on('ready page:load', function () {
  var dataset = getData(),
  usedata = dataset[0];


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
      //update
     var update = function(usedata){
     var xScale = d3.scale.ordinal()
              .domain(d3.range(usedata.length))
              .rangeRoundBands([0, width], 0.05)

     var yScale = d3.scale.linear()
                .domain([0, d3.max(usedata)])
                .range([0, height]);

     var rScale = d3.scale.linear()
                .domain([0, d3.max(usedata, function(d) { return d; })])
                .range([2, 5]);
       

      }

     d3.select("#click1999")
        .on("click", function() {
          var dataset = getData(),
          usedata = dataset[0];
          svg.selectAll("circle")
            .data(usedata)
              .attr("r", (function(d) {return d*3}))
              .attr("cx", (function(d, i) { return i*50}))
              .attr("cy", (function(d){ 
                // debugger;
                return yScale(d)}))
              .attr("class",  "bubble")
              .on("mouseover", function() {
                  d3.select(this)
                  .attr("fill", "blue");
          });
          svg.selectAll("text")
             .data(usedata)
             .transition() 
             .duration(2000) 
             .text(function(d) {
                return d;
             })
             .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
             })
             .attr("y", function(d) {
                return yScale(d) ;
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("fill", "#B8AA95");
             // yaxis append
          svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        });
    //update
     d3.select("#click2000")
        .on("click", function() {
         var dataset = getData(),
          usedata = dataset[1];
          svg.selectAll("circle")
            .data(usedata)
              .attr("r", (function(d) {return d*3}))
              .attr("cx", (function(d, i) { return i*50}))
              .attr("cy", (function(d){ 
                // debugger;
                return yScale(d)}))
              .attr("class",  "bubble")
              .on("mouseover", function(){return tooltip.style("visibility", "visible");})
              .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
          svg.selectAll("text")
             .data(usedata)
             .transition() 
             .duration(2000) 
             .text(function(d) {
                return d;
             })
             .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
             })
             .attr("y", function(d) {
                return  yScale(d);
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("fill", "#B8AA95");
             // yaxis append
          svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        });

    //update
     d3.select("#click2001")
        .on("click", function() {
          usedata = [];
          usedata = dataset[2];
          svg.selectAll("circle")
            .data(usedata)
              .attr("r", (function(d) {return d*3}))
              .attr("cx", (function(d, i) { return i*50}))
              .attr("cy", (function(d){ 
                // debugger;
                return yScale(d)}))
              .attr("class",  "bubble")
              .on("mouseover", function(){return tooltip.style("visibility", "visible");})
              .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
          svg.selectAll("text")
             .data(usedata)
             .transition() 
             .duration(2000) 
             .text(function(d) {
                return d;
             })
             .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
             })
             .attr("y", function(d) {
                return yScale(d);
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("fill", "#B8AA95");
             // yaxis append
          svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        });
//update
     d3.select("#click2002")
        .on("click", function() {
          usedata = [];
          usedata = dataset[3];
          svg.selectAll("circle")
            .data(usedata)
             .attr("r", (function(d) {
                return d*3}))
              .attr("cx", (function(d, i) { return i*50}))
              .attr("cy", (function(d){ 
                // debugger;
                return yScale(d)}))
              .attr("class",  "bubble")
              .on("mouseover", function(){return tooltip.style("visibility", "visible");})
              .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
          svg.selectAll("text")
             .data(usedata)
             .transition() 
             .duration(2000) 
             .text(function(d) {
                return d;
             })
             .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
             })
             .attr("y", function(d) {
                return yScale(d);
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("fill", "#B8AA95");
             // yaxis append
          svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        });



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


