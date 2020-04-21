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
  locations.push(["Name1", 53, 6])
  locations.push(["Name1", 53, 6])
  locations.push(["Name1", 54, 6])
  locations.push(["Name1", 54, 7])
  locations.push(["Name1", 53, 6])
  // }
  for (var i = 0; i < locations.length; i++) {
    var item = locations[i];
    // var image = {
    //     url: '/img/Gray.png',
    //     scaledSize: new google.maps.Size(20, 20),
    //     optimized: false,
    //     zIndex: 100
    // }

    var marker = new google.maps.Marker({
      position: { lat: item[1], lng: item[2] },
      title: String(item[0]),
      // map: map,
    });
    oms.addListener('click', function (marker) {
      iw.setContent('TESTTESTTESTTEST');
      iw.open(map, marker);
    });
    oms.addMarker(marker);
    clusterMarker.push(marker);
  }
  new MarkerClusterer(map, clusterMarker, {
    maxZoom: 11,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',//standard cluster markers
  });
}
/* var legend = document.getElementById('legend');
for (var style in styles) {
  var name = style.name;
  var icon = style.icon;
  var div = document.createElement('div');
  div.innerHTML = '<img src="' + icon + '"> ' + name;
  legend.appendChild(div);
} */

// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 16,
//     center: new google.maps.LatLng(-33.91722, 151.23064),
//     mapTypeId: 'roadmap'
//   });

//   var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//   var icons = {
//     parking: {
//       name: 'Parking',
//       icon: iconBase + 'parking_lot_maps.png'
//     },
//     library: {
//       name: 'Library',
//       icon: iconBase + 'library_maps.png'
//     },
//     info: {
//       name: 'Info',
//       icon: iconBase + 'info-i_maps.png'
//     }
//   };
// }
