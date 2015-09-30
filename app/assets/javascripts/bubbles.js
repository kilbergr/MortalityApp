
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
    children = {};
    // add the relevant stats to the allStats object
    children.percent = relFig[i].percent;
    children.number = relFig[i].number;
     // find relevant cause
     children.cause = getDeathCause(relFig[i].death_id)
     deathData.push(children);
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
    allStats.children = bundleCause(gon.figYears[i]);
   //  // add to dataset we're using
   byYear[allStats.year] = allStats;
 }
}
return byYear;
}

// Cluster bubbles
$(document).on('ready page:load', function(){
  dataset = getDataCluster();
  var diameter = 300,
  format = d3.format(",d");

  var color = d3.scale.ordinal()
  .domain(["a", "b", "c", "d"])
  .range(["#FFCFAD", "#E6D1B1", "#B8AA95", "#5E5A54"]);


  var bubble = d3.layout.pack()
  .sort(null)
  .size([diameter, diameter])
  .padding(10);

  var svg = d3.select("#simpleChart").append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

  var root = dataset[1999],
  root1 = dataset[2000],
  root2 = dataset[2001],
  root3 = dataset[2002],
  root4 = dataset[2003],
  root5 = dataset[2004],
  root6 = dataset[2005],
  root7 = dataset[2006],
  root8 = dataset[2007],
  root9 = dataset[2008],
  root10 = dataset[2009],
  root11 = dataset[2010],
  root12 = dataset[2011],
  root13 = dataset[2012],
  root14 = dataset[2013]
  ;

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
    return d.className + ": " + d.value + "% (" + d.number + " individuals)";
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
    if (node.children) node.children.forEach(function (child) {

      recurse(node.cause, child);
    });
      else classes.push({
        number: node.number,
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
// var click = 0;

// function changevalues() {
//     click++;
//     if (click == 1) changebubble(root2);
//     else if (click == 2) changebubble(root3);
//     else changebubble(root4);

// }

//update function
function changebubble(root) {
  var node = svg.selectAll(".node")
  .data(
    bubble.nodes(classes(root)).filter(function (d){return !d.children;}),
    function(d) {
            return d.className} // key data based on className to keep object constancy
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
      return d.className + ": " + d.value + "% (" + d.number + " individuals)";
    });
    
    node.select("circle")
    .transition().duration(1000)
    .attr("r", function (d) {
      return d.r;
    })
// NEED TO FIGURE OUT HOW TO UPDATE TITLES
        // .append("title")
        // .text(function (d) {
        //     return d.className + ": " + d.value + "% (" + d.number + " individuals)";
        // });

node.transition().attr("class", "node")
.attr("transform", function (d) {
  return "translate(" + d.x + "," + d.y + ")";
});


node.exit().remove();

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(cause, node) {
          // debugger;
          if (node.children) node.children.forEach(function (child) {
            recurse(node.cause, child);
          });
            else classes.push({
              number: node.number,
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
  }

  function updateBubble1() {changebubble(root);};
  function updateBubble2() {changebubble(root1);};
  function updateBubble3() {changebubble(root2);};
  function updateBubble4() {changebubble(root3);};
  function updateBubble5() {changebubble(root4);};
  function updateBubble6() {changebubble(root5);};
  function updateBubble7() {changebubble(root6);};
  function updateBubble8() {changebubble(root7);};
  function updateBubble9() {changebubble(root8);};
  function updateBubble10() {changebubble(root9);};
  function updateBubble11() {changebubble(root10);};
  function updateBubble12() {changebubble(root11);};
  function updateBubble13() {changebubble(root12);};
  function updateBubble14() {changebubble(root13);};
  function updateBubble15() {changebubble(root14);};

  d3.select("#click1999").on("click",updateBubble1);
  d3.select("#click2000").on("click",updateBubble2);
  d3.select("#click2001").on("click",updateBubble3);
  d3.select("#click2002").on("click",updateBubble4);
  d3.select("#click2003").on("click",updateBubble5);
  d3.select("#click2004").on("click",updateBubble6);
  d3.select("#click2005").on("click",updateBubble7);
  d3.select("#click2006").on("click",updateBubble8);
  d3.select("#click2007").on("click",updateBubble9);
  d3.select("#click2008").on("click",updateBubble10);
  d3.select("#click2009").on("click",updateBubble11);
  d3.select("#click2010").on("click",updateBubble12);
  d3.select("#click2011").on("click",updateBubble13);
  d3.select("#click2012").on("click",updateBubble14);
  d3.select("#click2013").on("click",updateBubble15);
});
// Mapping

$(document).on('ready page:load', function(){
  var width = 800, 
  height = 700; 
  var projection = d3.geo.mercator()
    .center([-100, 35.4])
    .scale(500)
    .translate([width / 2, height / 2]);

  // var projection = d3.geo.mercator().scale(220); 

  var path = d3.geo.path().projection(projection); 

  var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height); 

  // var test = 0;
  // var countByName = d3.map();
  var g = svg.append("g");

   queue()
    .defer(d3.json, "us.json") 
    .await(ready);
function ready(error, world, locations) { 
  console.log(world) 

   g.selectAll(".states")
      .data(topojson.feature(world, world.objects.states).features)
    .enter().append("path")
      .attr("class", function(d) { 
        return "subunit " + d.id.toLowerCase(); })
      .attr("d", path);

   g.append("path") .datum(topojson.mesh(world, world.objects.states, function(a, b) { return a !== b })) 
      .attr("d", path) 
      .attr("class", "subunit-boundary"); 

      g.append("path") .datum(topojson.mesh(world, world.objects.states, function(a, b) { return a == b })) 
      .attr("d", path) 
      .attr("class", "subunit-boundary"); 
  };
});
// var root = {
// "age":"All Ages",
// "ethnicity":"All",
// "race":"Black",
// "sex":"Males",
// "state":"West",
// "year":1999,
// "deathInfo":[
//   {"percent":27.3,
//   "number":3269,
//   "cause":"Heart Disease"},
//   {"percent":22.1,
//   "number":2649,
//   "cause":"Malignant Neoplasms"},
//   {"percent":6.2,
//   "number":739,
//   "cause":"Cerebrovascular"},
//   {"percent":5.8,
//   "number":699,
//   "cause":"Unintentional Injury"},
//   {"percent":4.9,
//   "number":585,
//   "cause":"Homicide"},
//   {"percent":4.3,
//   "number":512,
//   "cause":"Chronic Low. Respiratory Disease"},
//   {"percent":3.7,
//   "number":442,
//   "cause":"Diabetes Mellitus"},
//   {"percent":2.9,
//   "number":352,
//   "cause":"HIV"},
//   {"percent":1.6,
//   "number":197,
//   "cause":"Perinatal Period"},
//   {"percent":1.6,
//   "number":189,
//   "cause":"Suicide"},
//   {"percent":1.5,
//   "number":179,
//   "cause":"Liver Disease"},
//   {"percent":1.4,
//   "number":173,
//   "cause":"Influenza & Pneumonia"},
//   {"percent":1.4,
//   "number":169,
//   "cause":"Nephritis"},
//   {"percent":1.3,
//   "number":155,
//   "cause":"Hypertension"},
//   {"percent":0.7,
//   "number":88,
//   "cause":"Alzheimer's Disease"},
//   {"percent":0.7,
//   "number":80,
//   "cause":"Congenital Anomalies"},
//   {"percent":0.6,
//   "number":67,
//   "cause":"Aortic Aneurysm"},
//   {"percent":0.5,
//   "number":65,
//   "cause":"Septicemia"},
//   {"percent":0.5,
//   "number":61,
//   "cause":"Viral Hepatitis"},
//   {"percent":0.4,
//   "number":46},
//   {"percent":10.6,
//   "number":1268,
//   "cause":"All Others"}
//   ]
// }