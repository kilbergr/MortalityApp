var getDeathCause = function(death_id){
  for(var i = 0; i<gon.deaths.length; i++){
    if (death_id == gon.deaths[i].id){
      return gon.deaths[i].cause
    }
  }
}

var getDemInfo = function(dem_id){
  for(var i = 0; i<gon.demographics.length; i++){
    if (dem_id == gon.demographics[i].id){
      return gon.demographics[i];
    }
  }
}

var bundleCause = function(relFig){
  var deathData = [];
  for(var i = 0; i < relFig.length; i++){
    deathInfo = {};
    // add the relevant stats to the allStats object
     deathInfo.percent = relFig[i].percent;
     deathInfo.number = relFig[i].number;
     // find relevant cause
     deathInfo.cause = getDeathCause(relFig[i].death_id)
     deathData.push(deathInfo);
  }
   return deathData;  
  
}

var getDataCluster = function(){

 // structure here is :
 // byDem.byYear.children.data
 // MaleGeorgianHispanicAllAges.1999.children = [{cause: malignant neoplasm, percent: 19, number: 342}]
 var byYear = [];
  

// loops add all figure percentages info to dataset grouped by demographic year
 for (var i = 0; i < gon.figYears.length; i++){
   for (var j = 0; j < gon.figYears[i].length; j++){
     // create a nest to use in cluster
     allStats = {};
     // easier variable to hold relevant figure information
     relFig = gon.figYears[i][j]
     // find relevant demographics
     demInfo = getDemInfo(relFig.demographic_id);
     allStats.age = demInfo.age;
     allStats.ethnicity = demInfo.ethnicity;
     allStats.race = demInfo.race;
     allStats.sex = demInfo.sex;
     allStats.state = demInfo.state;
     allStats.year = demInfo.year;

    // subfunction taking the year with the dem type fetch all possible causes 
    allStats.deathInfo = bundleCause(gon.figYears[i]);
   //  // add to dataset we're using
    byYear[allStats.year] = allStats;
   }
 }
 return byYear;
}

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

// Cluster attempt
$(document).on('ready page:load', function(){
  dataset = getDataCluster();
  var diameter = 300,
    format = d3.format(",d");

var color = d3.scale.ordinal()
    .domain(["Sqoop", "Pig", "Apache", "a", "b", "c", "d", "e", "f", "g"])
    .range(["steelblue", "pink", "lightgreen", "violet", "orangered", "green", "orange", "skyblue", "gray", "aqua"]);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(10);

var svg = d3.select("#chart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
debugger;
var root = dataset[0],
root1 = dataset[1],
root2 = dataset[2],
root3 = dataset[4];


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

var node = svg.selectAll(".node")
    .data(bubble.nodes(classes(root))
    .filter(function (d) {
    return !d.children;
}))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
});

node.append("title")
    .text(function (d) {
    return d.className + ": " + format(d.value);
});

node.append("circle")
    .attr("r", function (d) {
    return d.r;
})
    .style("fill", function (d, i) {
    return color(i);
});



// Returns a flattened hierarchy containing all leaf nodes under the root.

function classes(root) {
    var classes = [];

    function recurse(cause, node) {
      debugger;
        if (node.children) node.children.forEach(function (child) {
            recurse(node.cause, child);
        });
        else classes.push({
            packageName: cause,
            className: node.cause,
            value: node.percent
        });
    }

    recurse(null, root);
    return {
        children: classes
    };
}

//d3.select(self.frameElement).style("height", diameter + "px");


//My Refer;
var click = 0;

function changevalues() {
    click++;
    if (click == 1) changebubble(root2);
    else if (click == 2) changebubble(root3);
    else changebubble(root4);

}

//update function
function changebubble(root) {
    var node = svg.selectAll(".node")
        .data(
            bubble.nodes(classes(root)).filter(function (d){return !d.children;}),
            function(d) {return d.className} // key data based on className to keep object constancy
        );
    
    // capture the enter selection
    var nodeEnter = node.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    
    // re-use enter selection for circles
    nodeEnter
        .append("circle")
        .attr("r", function (d) {return d.r;})
        .style("fill", function (d, i) {return color(i);})
    
    // re-use enter selection for titles
    nodeEnter
        .append("title")
        .text(function (d) {
            return d.className + ": " + format(d.value);
        });
    
    node.select("circle")
        .transition().duration(1000)
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        });

    node.transition().attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    node.exit().remove();

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
        var classes = [];

        function recurse(cause, node) {
            if (node.children) node.children.forEach(function (child) {
                recurse(node.name, child);
            });
            else classes.push({
                packageName: cause,
                className: node.cause,
                value: node.percent
            });
        }

        recurse(null, root);
        return {
            children: classes
        };
    }

    // d3.select(self.frameElement).style("height", diameter + "px");
}

function updateBubble1() {changebubble(root);};
function updateBubble2() {changebubble(root2);};
function updateBubble3() {changebubble(root3);};
function updateBubble4() {changebubble(root4);};

d3.select("#dataset1").on("click",updateBubble1);
d3.select("#dataset2").on("click",updateBubble2);
d3.select("#dataset3").on("click",updateBubble3);
d3.select("#dataset4").on("click",updateBubble4);
})





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


