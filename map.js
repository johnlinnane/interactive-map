var zoomInit = 10.5

if (L.Browser.ielt9) {
    alert('Please use another browser! ie. Chrome');
  }

// ******************** CREATE MAP (main and submit) ***************************************


var map = L.map('mapid', {attributionControl: false}).setView([53.309863, -7.021065], zoomInit);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGFuaXN0ZXJmYXRoZXJveSIsImEiOiJjazM3bXFweTEwMGV0M3Byd2I1aDdveGd0In0.qzVbRcZ7A4NKF4mLlVHbKQ'
}).addTo(map);

map.doubleClickZoom.disable(); 


// ******************** ICON ZOOM SIZE ***************************************

var iconSize = 40;
var zoom = map.getZoom();
console.log(zoom);


map.on('zoomend', function() {
    if (map.getZoom() >= 10.5) {
        iconSize = 40;
    } else if (map.getZoom() < 10.5 && map.getZoom() >= 7) {
        iconSize = 30;
    } else {
        iconSize = 10;
    }
    console.log(iconSize);
});

// ******************** SEARCH BAR ***************************************

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var searchControl = new L.esri.Controls.Geosearch().addTo(map);

  var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

// setTimeout(function(){$('.pointer').fadeOut('slow');},3400);


// ******************** CREATE DEFAULT ICON ***************************************




var defaultIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'icons/default.png',
        iconSize:     [iconSize, iconSize],
        // shadowSize:   [50, 64],
        iconAnchor:   [iconSize/2, iconSize/2],             // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],
        popupAnchor:  [iconSize/2, iconSize/2]              // point from which the popup should open relative to the iconAnchor
    }
});

// ******************** DEFINE CUSTOM ICONS ***************************************


var siteIcon        = new defaultIcon({iconUrl: 'icons/site.png'}), 
    siteHistIcon    = new defaultIcon({iconUrl: 'icons/wagon-colour.png'});
    siteUnoffIcon   = new defaultIcon({iconUrl: 'icons/site-unoff.png'}),
    bogIcon         = new defaultIcon({iconUrl: 'icons/bog.png'}),
    churchIcon      = new defaultIcon({iconUrl: 'icons/church.png'}),
    dumpIcon        = new defaultIcon({iconUrl: 'icons/dump.png'}),
    festivalIcon    = new defaultIcon({iconUrl: 'icons/festival.png'}),
    forestIcon      = new defaultIcon({iconUrl: 'icons/forest.png'}),
    graveIcon       = new defaultIcon({iconUrl: 'icons/grave.png'}),
    pilgrimageIcon  = new defaultIcon({iconUrl: 'icons/pilgrimage.png'}),
    scrapyardIcon   = new defaultIcon({iconUrl: 'icons/scrapyard.png'}),
    waterIcon       = new defaultIcon({iconUrl: 'icons/water.png'});
    cropIcon        = new defaultIcon({iconUrl: 'icons/crop.png'});
    healerIcon      = new defaultIcon({iconUrl: 'icons/healer.png'});

// ******************** ADD CUSTOM ICONS TO MAP, IN LAYERS ***************************************

// contemporary sites layer
var siteLayer = L.layerGroup([
    L.marker([53.296774, -6.985813], {icon: siteIcon}).addTo(map).bindPopup("Example Contemporary Site")
]);

// historical sites layer
var siteHistLayer = L.layerGroup([
    L.marker([53.295209, -7.074218], {icon: siteHistIcon}).addTo(map).bindPopup("I am a wagon."),
    L.marker([53.243657, -6.971283], {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Nine Mile Road</b><br><a href='info.html'>Click Here</a>"),
    L.marker([53.343184, -6.959953], {icon: siteHistIcon}).addTo(map).bindPopup("Pinkeen Road"),
    L.marker([53.284727, -6.900387], {icon: siteHistIcon}).addTo(map).bindPopup("Scour Bridge Canal"),
    L.marker([53.350972, -7.097797], {icon: siteHistIcon}).addTo(map).bindPopup("Bullsbridge"),
    L.marker([53.367466, -7.023468], {icon: siteHistIcon}).addTo(map).bindPopup("The Woody Cross Road")
]);

// unofficial sites layer
var siteUnoffLayer = L.layerGroup([
    L.marker([53.180262, -8.195808], {icon: siteUnoffIcon}).addTo(map).bindPopup("Example Unofficial Site")
]);


// bog layer
var bogLayer = L.layerGroup([
    L.marker([53.328567, -6.904102], {icon: bogIcon}).addTo(map).bindPopup("Example Bog")
]);

// church layer
var churchLayer = L.layerGroup([
    L.marker([53.299698, -6.953283], {icon: churchIcon}).addTo(map).bindPopup("Example Church")
]);

// dump layer
var dumpLayer = L.layerGroup([
    L.marker([51.917143, -8.459474], {icon: dumpIcon}).addTo(map).bindPopup("Example Dump")
]);

//festival layer
var festivalLayer = L.layerGroup([
    L.marker([53.025436, -8.607134], {icon: festivalIcon}).addTo(map).bindPopup("Example Festival")
]);

// forest layer
var forestLayer = L.layerGroup([
    L.marker([53.327337, -7.044263], {icon: forestIcon}).addTo(map).bindPopup("Example Forest")
]);

// graveyard layer
var graveLayer = L.layerGroup([
    L.marker([53.922671, -6.787346], {icon: graveIcon}).addTo(map).bindPopup("Example Graveyard")
]);

// pilgrimage site layer
var pilgrimageLayer = L.layerGroup([
    L.marker([53.254258, -7.226799], {icon: pilgrimageIcon}).addTo(map).bindPopup("Example Pilgrimage Site")
]);

// scrapyard layer
var scrapyardLayer = L.layerGroup([
    L.marker([52.384539, -8.440788], {icon: scrapyardIcon}).addTo(map).bindPopup("Example Scrapyard")
]);

// water source
var waterLayer = L.layerGroup([
    L.marker([52.414704, -9.816826], {icon: waterIcon}).addTo(map).bindPopup("Example Water Source")
]);

// crop layer
var cropLayer = L.layerGroup([
    L.marker([53.434627, -9.608086], {icon: cropIcon}).addTo(map).bindPopup("Example Crop")
]);

// healer layer
var healerLayer = L.layerGroup([
    L.marker([54.035736, -8.652275], {icon: healerIcon}).addTo(map).bindPopup("Example Healer")
]);




// ********************* BASE LAYERS AND OVERLAYS **************************************



// var holyMarkers = L.layerGroup([littleton, denver]);
// var siteContemporary = L.layerGroup([littleton, denver]);
// var siteHistorical = L.layerGroup([littleton, denver]);
// var siteUnofficial = L.layerGroup([littleton, denver]);
// var scrapyard = L.layerGroup([littleton, denver]); 
// var forest = L.layerGroup([littleton, denver]);
// var springWater = L.layerGroup([littleton, denver]);
// var bog = L.layerGroup([littleton, denver]);
// var dump = L.layerGroup([littleton, denver]);
// var crops = L.layerGroup([littleton, denver]);
// var healer = L.layerGroup([littleton, denver]);
// var pilgrimageSite = L.layerGroup([littleton, denver]); 
// var festival = L.layerGroup([littleton, denver]); 
// var church = L.layerGroup([littleton, denver]); 
// var graveyard = L.layerGroup([littleton, denver]);


var mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';


var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
var streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});




var baseMaps = {
    "Ordnance Survey": osm,
    "Streets": streets
};


var overlayMaps = {
    "Contemporary Site": siteLayer,
    "Historical Site": siteHistLayer,
    "Unofficial Site": siteUnoffLayer,
    "Bog": bogLayer, 
    "Church": churchLayer, 
    "Dump": dumpLayer, 
    "Festival": festivalLayer,
    "Forest": forestLayer, 
    "Graveyard": graveLayer,
    "Pilgrimage Site": pilgrimageLayer, 
    "Scrapyard": scrapyardLayer, 
    "Water Source": waterLayer, 
    "Crop": cropLayer, 
    "Healer": healerLayer
};

L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

osm.addTo(map);

L.control.scale().addTo(map);

// ********************* SHOW OVERLAY ON LOAD **************************************


map.addLayer(siteLayer);
map.addLayer(siteHistLayer);
map.addLayer(siteUnoffLayer);
map.addLayer(bogLayer);
map.addLayer(churchLayer);
map.addLayer(dumpLayer);
map.addLayer(festivalLayer);
map.addLayer(forestLayer);
map.addLayer(graveLayer);
map.addLayer(pilgrimageLayer);
map.addLayer(scrapyardLayer);
map.addLayer(waterLayer);
map.addLayer(cropLayer);
map.addLayer(healerLayer);

// ********************* CREATE LEGEND **************************************

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);

// ********************* STATE INFO PANEL **************************************


    // control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    // this._div.innerHTML = 
    //     '<h4>US Population Density</h4>' +  
    //     (props ? '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    //     : 'Hover over a state');
    this._div.innerHTML = '<h4>Traveller Map</h4>';
};

info.addTo(map);





// ********************* GET COORDINATES **************************************
// https://stackoverflow.com/questions/37516184/getting-map-coordinates-from-leaflet-js

var lat, lng, coordsLat, coordsLng;

var selectedMarker;

map.addEventListener('mousemove', function(ev) {
   lat = ev.latlng.lat;
   lng = ev.latlng.lng;
});

document.getElementById("mapid").addEventListener("dblclick", function (event) {   

    if (selectedMarker != null) {
        map.removeLayer(selectedMarker);
    };
    selectedMarker = L.marker([lat, lng]).addTo(map).bindPopup("You have selected this point.", { offset: new L.Point(-1, -41) }).openPopup();

    coordsLat = lat;
    coordsLng = lng;
    console.log(lat + ', ' + lng);
});