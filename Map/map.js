function initMap() {
  

  console.log("initmap")
  var bp = { lat: 51.30, lng: 3.14 };
  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 11,
    center: bp,
    maxZoom: 20,
    minZoom: 9,
    mapTypeControl: true
  });
  var iw = new google.maps.InfoWindow();
  var oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });
  var locations = [];
  var clusterMarker = [];

  // for (i = 0; i < value.length; i++) {
    locations.push(["Brugge",  51.209348, 3.2246995])
    locations.push(["Gent", 51.0543422, 3.7174243])
  locations.push(["Name1",  0, 3.2246995])
  locations.push(["Name1", 0, 3.7174243])
  locations.push(["Name1", 53, 6])
  // }
  for (var i = 0; i < locations.length; i++) {
    var item = locations[i];
    var image = {
         url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png ',
         scaledSize: new google.maps.Size(20, 20),
         optimized: false,
         zIndex: 100
     }

    

    var marker = new google.maps.Marker({
      position: { lat: item[1], lng: item[2] },
      title: String(item[0]),
      // map: map,
    });

   

    oms.addListener('click', function (marker) {
      iw.setContent("Naamwinkel");
      iw.open(map, marker);
      
      document.getElementById("winkel").innerHTML=" aflezen uit mysql";
      document.getElementById("maatregelen").innerHTML="Ja";
      document.getElementById("openingsuren").innerHTML="20-21";
      
      document.getElementById("legend").style.display = "block";
      
      setTimeout(function(){document.getElementById("legend").style.display = "none";},5000);
      
    });

    oms.addMarker(marker);
    clusterMarker.push(marker);
  }
  new MarkerClusterer(map, clusterMarker, {
    maxZoom: 11,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',//standard cluster markers
  });
}
/*
let map;
// global array to store the marker object 
let markersArray = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:51.30, lng: 3.14},
    zoom: 8
  });
  addMarker({lat: 51.209348, lng:  3.2246995}, "yellow");
  addMarker({lat: -34.397, lng: 150.644}, "green");
  addMarker({lat: -34.597, lng: 150.844}, "blue");
}

function addMarker(latLng, color) {
  let url = "http://maps.google.com/mapfiles/ms/icons/";
  url += color + "-dot.png";

  let marker = new google.maps.Marker({
    map: map,
    position: latLng,
    icon: {
      url: url
    }
  });

  //store the marker object drawn in global array
  markersArray.push(marker);
}*/
