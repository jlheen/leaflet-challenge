// Assignment
// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

// Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

// Include popups that provide additional information about the earthquake when a marker is clicked.

// Create a legend that will provide context for your map data.

// Your visualization should look something like the map above.

function createMap(quakesAll) {

  lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

var baseMaps = {
  "Light Map": lightmap
};

var overlayMaps = {
  "Earthquakes": quakesAll
}

// Create the map object with options
// -- different from the tileLayer, this is the actual map object
// notice the L.map(passes the html element)
var map = L.map("map-id", {
  center: [39.82, 98.57],
  zoom: 12,
  // holds an array of options
  layers: [lightmap, quakesAll]
});

// Create a "layer control", pass in baseMaps and overlayMaps & add this to the map object we just created above
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

}

function createMarkers(response) {

  // establish variable for response data ("q" short for quakes)

// *******************************
// change this ordering 
// ********************************

  var q = response.features;

  var quakeHits = [];

  for (var i = 0; i < q.length; i++) {
    var earthquake = q[i];

    var location = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
    // need to change this to when the marker is clicked
      .bindPopup("<h3>" + earthquake.properties.name + "<h3><h3>Capacity: " + earthquake.properties.mag + "</h3>");

    quakeHits.push(location);
    
  }

  createMap(L.layerGroup(quakeHits));

}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);