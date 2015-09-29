// var getDeathCause = function(death_id){
//   for(var i = 0; i<gon.deaths.length; i++){
//     if (death_id == gon.deaths[i].id){
//       return gon.deaths[i].cause
//     }
//   }
// }

// var getDemInfo = function(dem_id){
//   for(var i = 0; i<gon.demographics.length; i++){
//     if (dem_id == gon.demographics[i].id){
//       return gon.demographics[i];
//     }
//   }
// }

// var bundleCause = function(relFig){
//   var deathData = [];
//   for(var i = 0; i < relFig.length; i++){
//     deathInfo = {};
//     // add the relevant stats to the allStats object
//      deathInfo.percent = relFig[i].percent;
//      deathInfo.number = relFig[i].number;
//      // find relevant cause
//      deathInfo.cause = getDeathCause(relFig[i].death_id)
//      deathData.push(deathInfo);
//   }
//    return deathData;  
  
// }

// var getDataCluster = function(){

//  // structure here is :
//  // byDem.byYear.children.data
//  // MaleGeorgianHispanicAllAges.1999.children = [{cause: malignant neoplasm, percent: 19, number: 342}]
//  var byYear = [];
  

// // loops add all figure percentages info to dataset grouped by demographic year
//  for (var i = 0; i < gon.figYears.length; i++){
//    for (var j = 0; j < gon.figYears[i].length; j++){
//      // create a nest to use in cluster
//      allStats = {};
//      // easier variable to hold relevant figure information
//      relFig = gon.figYears[i][j]
//      // find relevant demographics
//      demInfo = getDemInfo(relFig.demographic_id);
//      allStats.age = demInfo.age;
//      allStats.ethnicity = demInfo.ethnicity;
//      allStats.race = demInfo.race;
//      allStats.sex = demInfo.sex;
//      allStats.state = demInfo.state;
//      allStats.year = demInfo.year;

//     // subfunction taking the year with the dem type fetch all possible causes 
//     allStats.deathInfo = bundleCause(gon.figYears[i]);
//    //  // add to dataset we're using
//     byYear[allStats.year] = allStats;
//    }
//  }
//  return byYear;
// }

// // Cluster attempt
// $(document).on('ready page:load', function(){
//   dataset = getDataCluster();
//   var diameter = 300,
//     format = d3.format(",d");

// var color = d3.scale.ordinal()
//     .domain(["Sqoop", "Pig", "Apache", "a", "b", "c", "d", "e", "f", "g"])
//     .range(["steelblue", "pink", "lightgreen", "violet", "orangered", "green", "orange", "skyblue", "gray", "aqua"]);

// var bubble = d3.layout.pack()
//     .sort(null)
//     .size([diameter, diameter])
//     .padding(10);

// var svg = d3.select("#simpleChart").append("svg")
//     .attr("width", diameter)
//     .attr("height", diameter)
//     .attr("class", "bubble");

// var root = dataset[1999],
// root1 = dataset[2000],
// root2 = dataset[2001],
// root3 = dataset[2002];

 
// var node = svg.selectAll(".node")
//     .data(bubble.nodes(classes(root))
//     .filter(function (d) {
//       debugger;
//     return !d.deathInfo;
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
//     function recurse(cause, node) {
//         if (node.deathInfo) node.deathInfo.forEach(function (oneDeath) {
//              recurse(oneDeath.cause, oneDeath);
//         });
//         else classes.push({
//             packageName: cause,
//             className: node.cause,
//             value: node.percent
//         });
//     }

//     recurse(null, root);
//     return {
//         deathInfo: classes
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
//             bubble.nodes(classes(root)).filter(function (d){return !d.deathInfo;}),
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

//         function recurse(cause, node) {
//             if (node.deathInfo) node.deathInfo.forEach(function (oneDeath) {
//                 recurse(node.name, oneDeath);
//             });
//             else classes.push({
//                 packageName: cause,
//                 className: node.cause,
//                 value: node.percent
//             });
//         }

//         recurse(null, root);
//         return {
//             deathInfo: classes
//         };
//     }

//     // d3.select(self.frameElement).style("height", diameter + "px");
// }

// function updateBubble1() {changebubble(root);};
// function updateBubble2() {changebubble(root2);};
// function updateBubble3() {changebubble(root3);};
// function updateBubble4() {changebubble(root4);};

// d3.select("#click1999").on("click",updateBubble1);
// d3.select("#click2000").on("click",updateBubble2);
// d3.select("#click2001").on("click",updateBubble3);
// d3.select("#click2002").on("click",updateBubble4);
// })

$(document).on('ready page:load', function(){
var diameter = 300,
    format = d3.format(",d");

var color = d3.scale.ordinal()
    .domain(["Sqoop", "Pig", "Apache", "a", "b", "c", "d", "e", "f", "g"])
    .range(["steelblue", "pink", "lightgreen", "violet", "orangered", "green", "orange", "skyblue", "gray", "aqua"]);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(10);

var svg = d3.select("#simpleChart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var root = {

    "children": [{
        "name": "ASP.NET",
        "size": 10
    }, {
        "name": "WPF",
        "size": 20
    }, {
        "name": "JAVASCRIPT",
        "size": 30
    }, {
        "name": "C#.NET",
        "size": 40
    }, {
        "name": "HTML",
        "size": 15
    }, {
        "name": "D3.JS",
        "size": 60
    }, {
        "name": "VB.NET",
        "size": 50
    }, {
        "name": "LINUX",
        "size": 45
    }, {
        "name": "C",
        "size": 70
    }, {
        "name": "C++",
        "size": 65
    }]
};

var root2 = {
    "children": [{
        "name": "WPF",
        "size": Math.random() * 50
    },

    {
        "name": "Hop",
        "size": 65
    }]
};

var root3 = {

    "children": [


    {
        "name": "C++",
        "size": 65
    }]
};

var root4 = {

    "children": [{
        "name": "ASP.NET",
        "size": 10
    }, {
        "name": "WPF",
        "size": 20
    }, {
        "name": "JAVASCRIPT",
        "size": 30
    }, {
        "name": "C#.NET",
        "size": 40
    }, {
        "name": "HTML",
        "size": 15
    }, {
        "name": "D3.JS",
        "size": 60
    }, {
        "name": "VB.NET",
        "size": 50
    }, {
        "name": "LINUX",
        "size": 45
    }, {
        "name": "C",
        "size": 70
    }, {
        "name": "C++",
        "size": 65
    }, {
        "name": "HTL",
        "size": 15
    }, {
        "name": "3.JS",
        "size": 60
    }, {
        "name": "B.NET",
        "size": 50
    }, {
        "name": "LUX",
        "size": 45
    }, {
        "name": "Cjj",
        "size": 70
    }, {
        "name": "Ckljkl++",
        "size": 65
    }]
};

var node = svg.selectAll(".node")
    .data(bubble.nodes(classes(root))
    .filter(function (d) {
      debugger;
    return !d.children;
}))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      debugger;
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
debugger;
    function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) {
            recurse(node.name, child);
        });
        else classes.push({
            packageName: name,
            className: node.name,
            value: node.size
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

        function recurse(name, node) {
            if (node.children) node.children.forEach(function (child) {
                recurse(node.name, child);
            });
            else classes.push({
                packageName: name,
                className: node.name,
                value: node.size
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
function updateBubble2() {changebubble(root2);};
function updateBubble3() {changebubble(root3);};
function updateBubble4() {changebubble(root4);};

d3.select("#dataset1").on("click",updateBubble1);
d3.select("#dataset2").on("click",updateBubble2);
d3.select("#dataset3").on("click",updateBubble3);
d3.select("#dataset4").on("click",updateBubble4);
});


// dataset[1999] = {
//   age: "All Ages", 
//   ethnicity: "All", 
//   race: "Black", 
//   sex: "Males", 
//   state: "West",
//   year: 1999,
//   age: "All Ages",
//   deathInfo: {
//     0: {
//       cause: "Heart Disease"
//       number: 3269
//       percent: 27.3
//     },
//     1: {
//       cause: "Malignant Neoplasms"
//       number: 2649
//       percent: 22.1
//       }
//   }
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
