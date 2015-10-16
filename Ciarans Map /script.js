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

    var marker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(53.009487, -6.327651),
        map: map,
        title: "Glendalough Hike"
        
    });
    
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
    
    var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
    
    
    marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}