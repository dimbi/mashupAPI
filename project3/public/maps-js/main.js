$('#content').hide();

//==================== MAPS PROPERTY ====================
// Load maps
var map;
var theData;
var originLatArray = [];
var originLonArray = [];
var destinationLatArray = [];
var destinationLonArray = [];
var migrationYear = [];


function initialize() {
  console.log('map init..');

   $.ajax({
    url: '/api/all',
    type: 'GET',
    dataType: 'json',
    error: function(data){
      console.log(data);
      alert("Oh No! Try a refresh?");
    },
    success: function(data){
      console.log("All data has been retreived");
      //Clean up the data on the client
      //You could do this on the server
        theData = data.map(function(d){
        return d.doc;
      });

      var mapCanvas = document.getElementById('map-canvas');
          var mapOptions = {
              zoom: 2,
              center: new google.maps.LatLng(32.774402, -72.785769),
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
              mapTypeId: google.maps.MapTypeId.TERRAIN
          };
          map = new google.maps.Map(mapCanvas, mapOptions);

          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));

        
        var markerOri;
        var markerDest;

        //marker preparation
        var pinColorOrigin = "559E83";
        var pinColorDestination = "D9A7A5";
        
        var pinImageOrigin = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorOrigin,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));                
        var pinImageDestination = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorDestination,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        for(var i=0; i<theData.length; i++){
              originLatArray.push(theData[i].originLatitude);
              originLonArray.push(theData[i].originLon);
              destinationLatArray.push(theData[i].latitude);
              destinationLonArray.push(theData[i].longitude);
              migrationYear.push(theData[i].yearEntry);

          markerOri = new google.maps.Marker({
                position: new google.maps.LatLng(originLatArray[i], originLonArray[i]),
                map: map,
                title: migrationYear[i],
                icon: pinImageOrigin,
                shadow: pinShadow
              });

          markerDest = new google.maps.Marker({
                position: new google.maps.LatLng(destinationLatArray[i], destinationLonArray[i]),
                map: map,
                title: migrationYear[i],
                icon: pinImageDestination,
                shadow: pinShadow
          });

          var line = new google.maps.Polyline({
              path: [new google.maps.LatLng(originLatArray[i], originLonArray[i]),
                     new google.maps.LatLng(destinationLatArray[i], destinationLonArray[i])],
              strokeColor: "#559E83",
              strokeOpacity: 0.5,
              strokeWeight: 0.8,
              map: map
          });

        }

        var legend = document.getElementById('legend');

        var nameOri = "Origin";
        var iconOri = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorOrigin;
        var divOri = document.createElement('div');
        divOri.innerHTML = '<img src="' + iconOri + '"> ' + nameOri;
        legend.appendChild(divOri);

        var nameDest = "Destination";
        var iconDest = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorDestination;
        var divDest = document.createElement('div');
        divDest.innerHTML = '<img src="' + iconDest + '"> ' + nameDest;
        legend.appendChild(divDest);

        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    }

  });
}

google.maps.event.addDomListener(window, 'load', initialize);




//==================== D3 PROPERTY ====================
//  Create matrix and maps using queue.js and underscore.js
queue()
  .defer(d3.json, 'data/migration.json')
  .defer(d3.csv, 'data/migration_mmap.csv')
  .await(function(err, matrix, mmap) { 
    if (err) console.log(err);
    _.each(mmap, function (d, i) { d.id=i; d.data=d.color })
    drawChords(matrix, mmap);
  });


//  Draw the chord diagram
function drawChords (matrix, mmap) {
  var w = 980, h = 800, r1 = h / 2, r0 = r1 - 110;

  var chord = d3.layout.chord()
      .padding(.02)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

  var arc = d3.svg.arc()
      .innerRadius(r0)
      .outerRadius(r0 + 20);

  var svg = d3.select("#chord-chart").append("svg")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("id", "circle")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

      svg.append("circle")
          .attr("r", r0 + 20);

  var rdr = chordRdr(matrix, mmap);
  chord.matrix(matrix);

  var g = svg.selectAll("g.group")
      .data(chord.groups())
    .enter().append("svg:g")
      .attr("class", "group")
      .on("mouseover", mouseover)
      .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

  g.append("svg:path")
      .style("stroke", "grey")
      .style("fill", function(d) { return rdr(d).gdata; })
      .attr("d", arc);

  g.append("svg:text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .style("font-family", "helvetica, arial, sans-serif")
      .style("font-size", "9px")
      .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (r0 + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .text(function(d) { return rdr(d).gname; });

    var chordPaths = svg.selectAll("path.chord")
          .data(chord.chords())
        .enter().append("svg:path")
          .attr("class", "chord")
          .style("stroke", "grey")
          .style("fill", function(d) { return _.where(mmap, {id: d.source.index })[0].data;; })
          .attr("d", d3.svg.chord().radius(r0))
          .on("mouseover", function (d) {
            d3.select("#tooltip")
              .style("visibility", "visible")
              .html(chordTip(rdr(d)))
              .style("top", function () { return (d3.event.pageY - 100)+"px"})
              .style("left", function () { return (d3.event.pageX - 100)+"px";})
          })
          .on("mouseout", function (d) { d3.select("#tooltip").style("visibility", "hidden") });

    function chordTip (d) {
      var p = d3.format(".1%"), q = d3.format(",d");
      return "Migrations info:<br/>"
        +  d.sname + " → " + d.tname
        + ": " + q(d.svalue) + "<br/>"
        + d.tname + " → " + d.sname
        + ": " + q(d.tvalue) + "<br/>";
    }

    function groupTip (d) {
      var p = d3.format(".1%"), q = d3.format(",d");
      return "Total number of people moving out of "
          + d.gname + " : " + q(d.gvalue) + "<br/>";
      }

    function mouseover(d, i) {
      d3.select("#tooltip")
        .style("visibility", "visible")
        .html(groupTip(rdr(d)))
        .style("top", function () { return (d3.event.pageY - 80)+"px"})
        .style("left", function () { return (d3.event.pageX - 130)+"px";})

      chordPaths.classed("fade", function(p) {
        return p.source.index != i
            && p.target.index != i;
      });
    }
}


//==================== LOADING THE PAGE ====================

window.onload = function () {   //loading page 
  console.log('fully loaded');
  $('#content').show();
  $('#loading').hide();
 }

$("#scrollDown").click(function() {
    $('html, body').animate({
        scrollTop: $("#title2").offset().top
    }, 2000);
});


