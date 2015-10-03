// LANDING PAGE JS
var terms = ["Heart disease", "Cancer", "Chronic lower respiratory diseases", "Unintentional injuries (accidents)", "Cerebrovascular diseases (stroke)", "Alzheimer's disease", "Influenza and Pneumonia", "Nephritis, nephrotic syndrome, and nephrosis", "Intentional self-harm (suicide)", "Death, Be Not Unknown" ];

function rotateTerm() {
  var ct = $("#rotate").data("term") || 0;
   if (ct < terms.length-1) {
  $("#rotate").data("term", ct == terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn(400)
              .delay(2000).fadeOut(1200, rotateTerm);
   }
    else if (ct == terms.length-1) {
  $("#rotate").data("term", ct == terms.length -1 ? 0 : ct + 1).text(terms[ct]).fadeIn(400);
    }
}
$(rotateTerm);



// MAIN PAGE JS
var stateNames = [{
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC",
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"

    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]
var matchState = function(abbr, stateArr){
  for (var i = 0; i < stateArr.length; i++){
    if (abbr == stateArr[i].abbreviation){
      return stateArr[i].name;
    }
  }
};
// Map
$(document).on('ready page:load', function(){

  var map = new Datamap({
    element: document.getElementById('map'),
    scope: 'usa',
    fills: {
      defaultFill: '#D9DBE5'
    },
    height: 400,
    width: 800,
    responsive: true,
    done: function(datamap) {
      // adding the modal and finding the state chosen
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(){
        $("#blackScreen").css('display', 'block');
        var state = matchState(this.classList[1], stateNames);
        modal = $(this).attr('data-modal');
        $('#pick').modal('show');
        q_state_eq.value = state;
        // $('#q_state_eq').filter(function(){
        //     return $(this).text()==state;
        //   })
        // .prop('selected', true);
      })
    },
    geographyConfig: {
      borderWidth: 1,
      borderColor: '#6F6D96',
      highlightFillColor: '#6F6D96',
      highlightBorderColor: '#D1CBDA',
      highlightBorderWidth: 1
    }
  });

    d3.select(window).on('load', function() {
        map.resize();
    });
    d3.select(window).on('resize', function() {
        map.resize();
    });
});
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
 // MaleGeorgianHispanicAllAges.1999.children = [{cause: malignant neoplasm, percent: 19, number: 342}] etc
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



 
// JSON handling of query
$(document).on('ready page:load', function(){
  $("#form_id").submit(function(e){
    e.preventDefault();
    var state = $("#q_state_eq").val().split(" ").join("+"),
    race = $("#q_race_eq").val().split(" ").join("+"),
    ethnicity = $("#q_ethnicity_eq").val().split(" ").join("+"),
    sex = $("#q_sex_eq").val().split(" ").join("+"),
    age = $("#q_age_eq").val().split(" ").join("+");
   $.getJSON("index?utf8=✓&q%5Bstate_eq%5D=" + state + "&q%5Brace_eq%5D=" + race + "&q%5Bethnicity_eq%5D=" + ethnicity + "&q%5Bsex_eq%5D=" + sex + "&q%5Bage_eq%5D=" + age + "&commit=Search", function(data){
      gon.demographics = data.demographics;
      gon.deaths = data.deaths;
      gon.figYears = data.figuresYears;
      clusterBubbles();
    return false;
   })
  })
});
// 
  $("#submitMe").on("click", function(e){
    e.preventDefault();
    $("#form_id").css('display', 'none');
    $('#changeDem').css('display', 'block');
    $("#showBubbles").css('display', 'block');
   })

$(document).on('ready page:load', function(){

  $("#changeDem").on("click", function(e){
    e.preventDefault();
    $("#form_id").css('display', 'block');
     clearBubbles();
  })

  $(".close.icon").on("click", function(){
    $("#blackScreen").css('display', 'none');
    clearBubbles();
  })
})
  // Clear all bubbles
 var clearBubbles = function(){
  d3.selectAll("svg.bubble > *").remove();
  $("svg.bubble").remove();
}

// Cluster bubbles
var clusterBubbles = function(){
  dataset = getDataCluster();
  var diameter = 300,
  format = d3.format(",d");

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
  root14 = dataset[2013];

  var node = svg.selectAll(".node")
  .data(bubble.nodes(classes(root))
    .filter(function (d) {
      return !d.children;
    }))
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", function (d) {
    return "translate(" + Math.round(d.x) + "," + Math.round(d.y) + ")";
  });

  node.append("title")
  .text(function (d) {
    return d.className + ": " + d.value + "% (" + d.number + " individuals)";
  });

  node.append("circle")
  .attr("r", function (d) {
    return Math.round(d.r);
  })
 .style("fill", function (d) {
    return "hsl(251.8,35.2%," + Math.round(d.r) + "%)";
    })

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
      return "translate(" + Math.round(d.x) + "," + Math.round(d.y) + ")";
    });
    
    // re-use enter selection for circles
    nodeEnter
    .append("circle")
    .attr("r", function (d) {return d.r;})
    .style("fill", function (d) {
    return "hsl(251.8,35.2%," + Math.round(d.r) + "%)";
    })
    
    // re-use enter selection for titles 
    nodeEnter
    .append("title")
    .text(function (d) {
      return d.className + ": " + d.value + "% (" + d.number + " individuals)";
    });

    node.select("circle")
    .transition().duration(1000)
    .attr("r", function (d) {
      return Math.round(d.r);
    })

node.transition().attr("class", "node")

.attr("transform", function (d) {
  return "translate(" + Math.round(d.x) + "," + Math.round(d.y) + ")";
});


node.exit()
  .transition()
  .duration(300)
  .style('opacity', 0)
  .remove();

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
};