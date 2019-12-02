var zoom = 10.5;
var zoomScalar = zoom;

// ******************** CREATE MAP ***************************************


var map = L.map('mapid', {attributionControl: false}).setView([53.309863, -7.021065], zoom);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGFuaXN0ZXJmYXRoZXJveSIsImEiOiJjazM3bXFweTEwMGV0M3Byd2I1aDdveGd0In0.qzVbRcZ7A4NKF4mLlVHbKQ'
}).addTo(map);

// ******************** CREATE DEFAULT ICON ***************************************


var defaultIcon = L.Icon.extend({
    options: {
        shadowUrl: 'icons/default.png',
        iconSize:     [40, 40],
        // shadowSize:   [50, 64],
        iconAnchor:   [20, 20],
        // shadowAnchor: [4, 62],
        popupAnchor:  [20, 20]
    }
});

// ******************** DEFINE CUSTOM ICONS ***************************************


var bogIcon         = new defaultIcon({iconUrl: 'icons/bog.png'}),
    churchIcon      = new defaultIcon({iconUrl: 'icons/church.png'}),
    churchIcon      = new defaultIcon({iconUrl: 'icons/default.png'}),
    dumpIcon        = new defaultIcon({iconUrl: 'icons/dump.png'}),
    dump2Icon       = new defaultIcon({iconUrl: 'icons/dump2.png'}),
    festivalIcon    = new defaultIcon({iconUrl: 'icons/festival.png'}),
    forestIcon      = new defaultIcon({iconUrl: 'icons/forest.png'}),
    forest2Icon     = new defaultIcon({iconUrl: 'icons/forest2.png'}),
    graveIcon       = new defaultIcon({iconUrl: 'icons/grave.png'}),
    pilgrimageIcon  = new defaultIcon({iconUrl: 'icons/pilgrimage.png'}),
    scrapyardIcon   = new defaultIcon({iconUrl: 'icons/scrapyard.png'}),
    wagonBlackIcon  = new defaultIcon({iconUrl: 'icons/wagon-black.png'});
    wagonColourIcon = new defaultIcon({iconUrl: 'icons/wagon-colour.png'}),
    wagonWhiteIcon  = new defaultIcon({iconUrl: 'icons/wagon-white.png'}),
    waterIcon       = new defaultIcon({iconUrl: 'icons/water.png'});


// ******************** ADD CUSTOM MARKERS TO MAP ***************************************


L.marker([53.295209, -7.074218], {icon: wagonBlackIcon}).addTo(map).bindPopup("I am a wagon.");



// ******************** ADD RED CIRCLES ***************************************



var circle1 = L.circle([53.243657, -6.971283], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle1.bindPopup("<b>The Nine Mile Road</b><br><a href='info.html'>Click Here</a>");



var circle2 = L.circle([53.343184, -6.959953], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle2.bindPopup("<b>Pinkeen Road</b><br><a href='info.html'>Click Here</a>");


var circle3 = L.circle([53.284727, -6.900387], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle3.bindPopup("<b>Scour Bridge Canal</b><br><a href='info.html'>Click Here</a>");



var circle4 = L.circle([53.350972, -7.097797], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle4.bindPopup("<b>Bullsbridge</b><br><a href='info.html' >Click Here</a>");




var circle5 = L.circle([53.367466, -7.023468], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

circle5.bindPopup("<b>The Woody Cross Road</b><br><a href='info.html'>Click Here</a>");


// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);


// ********************* ADD CUSTOM ICONS **************************************


var forestIcon = L.icon({
    iconUrl: 'icons/forest.png',
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [40, 40], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([53.327337, -7.044263], {icon: forestIcon}).addTo(map);


var wagonColourIcon = L.icon({
    iconUrl: 'icons/wagon-colour.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([53.296774, -6.985813], {icon: wagonColourIcon}).addTo(map);


// ********************* ADD CUSTOM ICONS **************************************

var littleton = L.marker([53.328567, -6.904102]).bindPopup('This is Littleton, CO.');
var denver    = L.marker([53.299698, -6.953283]).bindPopup('This is Denver, CO.');

// ********************* ADD HOLY SITES LAYER **************************************



var holyMarkers = L.layerGroup([littleton, denver]);
var siteContemporary = L.layerGroup([littleton, denver]);
var siteHistorical = L.layerGroup([littleton, denver]);
var siteUnofficial = L.layerGroup([littleton, denver]);
var scrapyard = L.layerGroup([littleton, denver]); 
var forest = L.layerGroup([littleton, denver]);
var springWater = L.layerGroup([littleton, denver]);
var bog = L.layerGroup([littleton, denver]);
var dump = L.layerGroup([littleton, denver]);
var crops = L.layerGroup([littleton, denver]);
var healer = L.layerGroup([littleton, denver]);
var pilgrimageSite = L.layerGroup([littleton, denver]); 
var festival = L.layerGroup([littleton, denver]); 
var church = L.layerGroup([littleton, denver]); 
var graveyard = L.layerGroup([littleton, denver]);


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
    "Holy Sites": holyMarkers,
    "Contemporary Site": siteContemporary,
    "Historical Site": siteHistorical,
    "Unofficial Site": siteUnofficial,
    "Scrapyard": scrapyard, 
    "Forest": forest, 
    "Spring Water": springWater, 
    "Bog": bog, 
    "Dump": dump, 
    "Crops": crops, 
    "Healer": healer, 
    "Pilgrimage Site": pilgrimageSite, 
    "Festival": festival, 
    "Church": church, 
    "Graveyard": graveyard
};

L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

osm.addTo(map);

L.control.scale().addTo(map);

// ********************* SHOW OVERLAY ON LOAD **************************************


map.addLayer(holyMarkers);

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

// ********************* ZOOM **************************************

map.on('zoomend', function() {
    console.log(map.getZoom());
    zoomScalar = map.getZoom();
});


// ********************* GET COORDINATES **************************************
// https://stackoverflow.com/questions/37516184/getting-map-coordinates-from-leaflet-js

var lat, lng, coordsLat, coordsLng;

var selectedMarker;

map.addEventListener('mousemove', function(ev) {
   lat = ev.latlng.lat;
   lng = ev.latlng.lng;
});

document.getElementById("mapid").addEventListener("click", function (event) {   

    if (selectedMarker != null) {
        map.removeLayer(selectedMarker);
    };
    selectedMarker = L.marker([lat, lng]).addTo(map).bindPopup("Selected Location: " + lat + ", " + lng, { offset: new L.Point(-1, -41) }).openPopup();

    coordsLat = lat;
    coordsLng = lng;
    console.log(lat + ', ' + lng);
});