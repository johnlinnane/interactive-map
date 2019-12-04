
// ********************* GET COORDINATES **************************************
// https://stackoverflow.com/questions/37516184/getting-map-coordinates-from-leaflet-js

var lat, lng, coordsLat, coordsLng;

var selectedMarker;

map.addEventListener('mousemove', function(ev) {
   lat = ev.latlng.lat;
   lng = ev.latlng.lng;
});

document.getElementById("mapid").addEventListener("dblclick", function addMarker(event) {   

    if (selectedMarker != null) {
        map.removeLayer(selectedMarker);
    };
    selectedMarker = L.marker([lat, lng]).addTo(map).bindPopup("You have selected this point. <br>To change your selection, double click another location.", { offset: [0,-5] }).openPopup();

    coordsLat = lat;
    coordsLng = lng;
    console.log(lat + ', ' + lng);
});