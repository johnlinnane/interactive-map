var zoomInit = 10.5

if (L.Browser.ielt9) {
    alert('Please use another browser! ie. Chrome');
  }

// ******************** CREATE MAP  ***************************************


var map = L.map('mapid', {attributionControl: false, zoomControl: false}).setView([53.309863, -7.021065], zoomInit);




new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
map.doubleClickZoom.disable(); 

L.control.scale({position: 'bottomleft'}).addTo(map);


// ******************** CREATE BASE LAYERS  ***************************************



// ******** openstreetmap layer ******** WORKS
var osm =   L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    subdomains: ['a','b','c']
                });
// osm.addTo(map);


// ******** mapbox street layer ******** 
var streets =   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1IjoicGFuaXN0ZXJmYXRoZXJveSIsImEiOiJjazM3bXFweTEwMGV0M3Byd2I1aDdveGd0In0.qzVbRcZ7A4NKF4mLlVHbKQ'
                });

streets.addTo(map);



// //  ******** mapbox street map ******** API 404 not found
// var mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

// var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//         'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

// var streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});
// streets.addTo(map);








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

// setTimeout(function(){$('.pointer').fadeOut('slow');},3400); *******


// ******************** CREATE TEMPLATE ICON ***************************************


var defaultIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'icons/default.png',
        iconSize:     [iconSize, iconSize],
        // shadowSize:   [50, 64],
        iconAnchor:   [iconSize/2, iconSize/2],             // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],
        popupAnchor:  [0, -10]              // point from which the popup should open relative to the iconAnchor
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
    L.marker([53.243657, -6.971283], {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Nine Mile Road</b><br><a href='info.html'>Click Here</a>"),
    L.marker([53.343184, -6.959953], {icon: siteHistIcon}).addTo(map).bindPopup("Pinkeen Road"),
    L.marker([53.284727, -6.900387], {icon: siteHistIcon}).addTo(map).bindPopup("Scour Canal Bridge"),
    L.marker([53.350972, -7.097797], {icon: siteHistIcon}).addTo(map).bindPopup("Bullsbridge"),
    L.marker([53.367466, -7.023468], {icon: siteHistIcon}).addTo(map).bindPopup("The Woody Cross Road"),
    L.marker([53.4487, -7.08687],    {icon: siteHistIcon}).addTo(map).bindPopup("<img src='img/phils-road.png' class='popupImg'/><br>Phil's Road").bindTooltip("Click to see image", {direction: 'right', offset: [15, 0]}).openTooltip(),
    L.marker([53.37604, -7.10472],   {icon: siteHistIcon}).addTo(map).bindPopup("Jonestown Cross"),
    L.marker([53.30091, -7.08897],   {icon: siteHistIcon}).addTo(map).bindPopup("The Midge River"),
    L.marker([53.31685, -7.07155],   {icon: siteHistIcon}).addTo(map).bindPopup("Fan Hill"),
    L.marker([53.33078, -7.21776],   {icon: siteHistIcon}).addTo(map).bindPopup("Tubbercurry"),
    L.marker([53.32286, -7.19883],   {icon: siteHistIcon}).addTo(map).bindPopup("The Head of Tubbercurry"),
    L.marker([53.32294, -7.18948],   {icon: siteHistIcon}).addTo(map).bindPopup("The Green Road"),
    L.marker([53.35613, -7.16853],   {icon: siteHistIcon}).addTo(map).bindPopup("Fahey's Hill"),
    L.marker([53.42247, -6.92748],   {icon: siteHistIcon}).addTo(map).bindPopup("Andy's Road"),
    L.marker([53.38683, -6.92885],   {icon: siteHistIcon}).addTo(map).bindPopup("Birdy's Big House"),
    L.marker([53.38183, -7.12014],   {icon: siteHistIcon}).addTo(map).bindPopup("Jim Hills"),
    L.marker([53.36202, -7.17163],   {icon: siteHistIcon}).addTo(map).bindPopup("Judge Weightless"),
    L.marker([53.31412, -7.12421],   {icon: siteHistIcon}).addTo(map).bindPopup("Berrigan's Corner"),
    L.marker([53.30876, -7.13468],   {icon: siteHistIcon}).addTo(map).bindPopup("Blunt's Corner"),
    L.marker([53.43955, -7.0775],    {icon: siteHistIcon}).addTo(map).bindPopup("Captain Crinnon's"),

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


// ********************* SHOW THESE LAYERS ON LOAD **************************************


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


// ********************* ADD LAYERS TO LAYER CONTROL  **************************************



var baseMaps = {
    "Road Map": streets,
    "Physical Feature Map": osm
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

L.control.layers(baseMaps, overlayMaps, {collapsed:true}).addTo(map);



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

/*
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
*/



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
    selectedMarker = L.marker([lat, lng]).addTo(map).bindPopup("You have selected this point. <br>To change your selection, double click another location.", { offset: [0,-5] }).openPopup();

    coordsLat = lat;
    coordsLng = lng;
    console.log(lat + ', ' + lng);
});