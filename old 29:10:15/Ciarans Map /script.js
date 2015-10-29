function initialize(){
    var mapOptions = {
        center: new google.maps.LatLng(53.011902,-6.329668),
        zoom: 10

    };

var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

    //addButtons(map);

   drawMarkers(map);

    addKmlLayer(map);


}


google.maps.event.addDomListener(window, "load", initialize);

function addKmlLayer(map) {
    var offasDykeLayer = new google.maps.KmlLayer('http://hikeview.co.uk/tracks/hikeview-offas-dyke.kml');
    offasDykeLayer.setMap(map);
    
}

function drawMarkers(map) {
    var image = "hike.gif";

    var centerMarker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(53.009487, -6.327651),
        map: map,
        title: "Glendalough Hike"

    });

}