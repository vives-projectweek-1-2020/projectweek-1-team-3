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
    locations.push(["Brugge",  51.209348, 3.2246995])  //mysql coordinaten hier ingeven
    locations.push(["Gent", 51.0543422, 3.7174243])
  locations.push(["Name1",  0, 3.2246995])
  locations.push(["Name1", 0, 3.7174243])
  locations.push(["Name1", 53, 6])
  // }


 var rating = 1;
  
  for (var i = 0; i < locations.length; i++) {
    var item = locations[i];
    if (rating > 2,5) {
      var image = {  
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png ',
        scaledSize: new google.maps.Size(30, 30),
        optimized: false,
        zIndex: 100
      } 
    }
    else 
    {
      var image = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png ',
        scaledSize: new google.maps.Size(30, 30),
        optimized: false,
        zIndex: 100
    }



  
  }

    

    var marker = new google.maps.Marker({
      position: { lat: item[1], lng: item[2] },
      title: String(item[0]),
      icon: image,
      // map: map,
    });

   

    oms.addListener('click', function (marker) {
      iw.setContent("Naamwinkel"); //uitmysql halen colom winkel
      iw.open(map, marker);
      
      document.getElementById("winkel").innerHTML=" aflezen uit mysql";  //mysql importeren hier
      document.getElementById("maatregelen").innerHTML="Ja";
      document.getElementById("score").innerHTML="0/5";
      
      document.getElementById("legend").style.display = "block";
      
      setTimeout(function(){document.getElementById("legend").style.display = "none";},10000);
      
    });

    oms.addMarker(marker);
    clusterMarker.push(marker);
  }
  new MarkerClusterer(map, clusterMarker, {
    maxZoom: 11,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',//standard cluster markers
  });
}

function getData(){
  setTimeout(() => {
      setData()
  }, 500);
}
function setData(){
  console.log("here")
  var rigthDataDiv = document.getElementById("rightDataDiv");
  rigthDataDiv.innerHTML += "fake data "
  getData()
}
