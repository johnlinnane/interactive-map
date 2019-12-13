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



var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                    maxZoom: 20,
                    subdomains:['mt0','mt1','mt2','mt3']
                });

// googleSat.addTo(map);



// ******************** ICON ZOOM SIZE ***************************************

var iconSize = 40;
var zoom = map.getZoom();
console.log('Map zoom level: ' + zoom);


map.on('zoomend', function() {
    if (map.getZoom() >= 10.5) {
        iconSize = 40;
    } else if (map.getZoom() < 10.5 && map.getZoom() >= 7) {
        iconSize = 30;
    } else {
        iconSize = 10;
    }
    console.log('Icon size: ' + iconSize);
});

// ******************** SEARCH BAR ***************************************

// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);

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


var authSiteIcon    = new defaultIcon({iconUrl: 'icons/site-auth.png'}), 
    siteHistIcon    = new defaultIcon({iconUrl: 'icons/site-hist.png'});
    siteUnoffIcon   = new defaultIcon({iconUrl: 'icons/site-unauth.png'}),
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

// authorised sites layer
var authSiteLayer = L.layerGroup([
    // L.marker([53.296774, -6.985813], {icon: authSiteIcon}).addTo(map).bindPopup("Example Authorised Site")
]);

// historical sites layer
var histSiteLayer = L.layerGroup([
    L.marker([53.279380, -7.025221], {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Nine Mile Road</b>      <br><br><img src='img/sites/019ninemile.jpg' class='popupImg'/><br><br>"    + nineMileText    + "<br>", {maxHeight: 250}),
    L.marker([53.343184, -6.959953], {icon: siteHistIcon}).addTo(map).bindPopup("<b>Pinkeen Road</b><br>"       + pinkeenText + "<br>",     {maxHeight: 250}),
    L.marker([53.284727, -6.900387], {icon: siteHistIcon}).addTo(map).bindPopup("<b>Scour Canal Bridge</b>      <br><br><img src='img/sites/019scourbridge.jpg' class='popupImg'/><br><br>" + scourText       + "<br>", {maxHeight: 250}),
    L.marker([53.36158, -7.07842],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Bullsbridge</b>             <br><br><img src='img/sites/09abullsbridge.jpg' class='popupImg'/><br> <img src='img/sites/09bbullsbridge.jpg' class='popupImg'/><br><img src='img/sites/09cbullsbridge.jpg' class='popupImg'/><br><br>" + bullsbridgeText + "<br>", {maxHeight: 250}),
    L.marker([53.367466, -7.023468], {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Woody Cross Road</b>    <br><br><img src='img/sites/010awoodycross.jpg' class='popupImg'/><br><img src='img/sites/010bwoodycross.jpg' class='popupImg'/><br><br>"    + woodyCrossText + "<br>",  {maxHeight: 250}),
    L.marker([53.4487, -7.08687],    {icon: siteHistIcon}).addTo(map).bindPopup("<b>Phil's Road</b>             <br><br><img src='img/sites/01philsroad.jpg' class='popupImg'/><br><br>"    + philsRoadText   + "<br>", {maxHeight: 250}),
    L.marker([53.37604, -7.10472],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Jonestown Cross</b>         <br><br><img src='img/sites/06jonestown.jpg' class='popupImg'/><br><br>"    + jonestownXText  + "<br>", {maxHeight: 250}),
    L.marker([53.30091, -7.08897],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Midge River</b>         <br><br><img src='img/sites/017midgeriver.jpg' class='popupImg'/><br><br>"  + midgeRiverText  + "<br>", {maxHeight: 250}),
    L.marker([53.31685, -7.07155],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Fan Hill</b>                <br><br><img src='img/sites/018fanhill.jpg' class='popupImg'/><br><br>"     + fanHillText     + "<br>", {maxHeight: 250}),
    L.marker([53.33078, -7.21776],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Tubberdaly</b>              <br><br><img src='img/sites/012atubberdaly.jpg' class='popupImg'/><br><img src='img/sites/012btubberdaly.jpg' class='popupImg'/><br><img src='img/sites/012ctubberdaly.jpg' class='popupImg'/><br><br>"              + tubberdalyText + "<br>",  {maxHeight: 250}),
    L.marker([53.32286, -7.19883],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Head of Tubbercurry</b> <br><br><img src='img/sites/013headtubb.jpg' class='popupImg'/><br><br>"    + headTubberText  + "<br>", {maxHeight: 250}),
    L.marker([53.32294, -7.18948],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>The Green Road</b>          <br><br><img src='img/sites/014greenrd.jpg' class='popupImg'/><br><br>"     + greenRoadText   + "<br>", {maxHeight: 250}),
    L.marker([53.35613, -7.16853],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Fahey's Hill</b>            <br><br><img src='img/sites/08faheyshill.jpg' class='popupImg'/><br><br>"   + faheysHillText  + "<br>", {maxHeight: 250}),
    L.marker([53.42247, -6.92748],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Andy's Road</b>             <br><br><img src='img/sites/03andysrd.jpg' class='popupImg'/><br><br>"      + andysRdText     + "<br>", {maxHeight: 250}),
    L.marker([53.38683, -6.92885],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Birdy's Big House</b>       <br><br><img src='img/sites/04birdys.jpg' class='popupImg'/><br><br>"       + birdysHouseText + "<br>", {maxHeight: 250}),
    L.marker([53.38183, -7.12014],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Jim Hills</b>               <br><br><img src='img/sites/05ajimhills.jpg' class='popupImg'/><br><img src='img/sites/05bjimhills.jpg' class='popupImg'/><br><img src='img/sites/05cjimhills.jpg' class='popupImg'/><br><br>"               + jimHillsText + "<br>",    {maxHeight: 250}),
    L.marker([53.36202, -7.17163],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Judge Weightless</b>        <br><br><img src='img/sites/07judge.jpg' class='popupImg'/><br><br>"        + judgeText       + "<br>", {maxHeight: 250}),
    L.marker([53.31412, -7.12421],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Berrigan's Corner</b>       <br><br><img src='img/sites/016berrigans.jpg' class='popupImg'/><br><br>"   + berrigansText   + "<br>", {maxHeight: 250}),
    L.marker([53.30876, -7.13468],   {icon: siteHistIcon}).addTo(map).bindPopup("<b>Blunt's Corner</b>          <br><br><img src='img/sites/015blunts.jpg' class='popupImg'/><br><br>"      + bluntsText      + "<br>", {maxHeight: 250}),
    L.marker([53.43955, -7.0775],    {icon: siteHistIcon}).addTo(map).bindPopup("<b>Captain Crinnon's</b>       <br><br><img src='img/sites/02cptcrinnons.jpg' class='popupImg'/><br><br>"  + crinnonsText    + "<br>", {maxHeight: 250})

]);

// unauthorised sites layer
var unauthSiteLayer = L.layerGroup([
    // L.marker([53.180262, -8.195808], {icon: siteUnoffIcon}).addTo(map).bindPopup("Example Unauthorised Site")
]);


// bog layer
var bogLayer = L.layerGroup([
    // L.marker([53.328567, -6.904102], {icon: bogIcon}).addTo(map).bindPopup("Example Bog")
]);

// church layer
var churchLayer = L.layerGroup([
    // L.marker([53.299698, -6.953283], {icon: churchIcon}).addTo(map).bindPopup("Example Church")
]);

// dump layer
var dumpLayer = L.layerGroup([
    // L.marker([51.917143, -8.459474], {icon: dumpIcon}).addTo(map).bindPopup("Example Dump")
]);

//festival layer
var festivalLayer = L.layerGroup([
    // L.marker([53.025436, -8.607134], {icon: festivalIcon}).addTo(map).bindPopup("Example Festival")
]);

// forest layer
var forestLayer = L.layerGroup([
    // L.marker([53.327337, -7.044263], {icon: forestIcon}).addTo(map).bindPopup("Example Forest")
]);

// graveyard layer
var graveLayer = L.layerGroup([
    // L.marker([53.922671, -6.787346], {icon: graveIcon}).addTo(map).bindPopup("Example Graveyard")
]);

// pilgrimage site layer
var pilgrimageLayer = L.layerGroup([
    // L.marker([53.254258, -7.226799], {icon: pilgrimageIcon}).addTo(map).bindPopup("Example Pilgrimage Site")
]);

// scrapyard layer
var scrapyardLayer = L.layerGroup([
    // L.marker([52.384539, -8.440788], {icon: scrapyardIcon}).addTo(map).bindPopup("Example Scrapyard")
]);

// water source
var waterLayer = L.layerGroup([
    // L.marker([52.414704, -9.816826], {icon: waterIcon}).addTo(map).bindPopup("Example Water Source")
]);

// crop layer
var cropLayer = L.layerGroup([
    // L.marker([53.434627, -9.608086], {icon: cropIcon}).addTo(map).bindPopup("Example Crop")
]);

// healer layer
var healerLayer = L.layerGroup([
    // L.marker([54.035736, -8.652275], {icon: healerIcon}).addTo(map).bindPopup("Example Healer")
]);

// select all layer
var layer_select_all = new L.GeoJSON(null);

// ********************* SHOW THESE LAYERS ON LOAD **************************************


map.addLayer(authSiteLayer);
map.addLayer(histSiteLayer);
map.addLayer(unauthSiteLayer);
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
    "Physical Feature Map": osm,
    "Sattelite": googleSat
};

var overlayMaps = {
    "Authorised Site": authSiteLayer,
    "Historical Site": histSiteLayer,
    "Unauthorised Site": unauthSiteLayer,
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


