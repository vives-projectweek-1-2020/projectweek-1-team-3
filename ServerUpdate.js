var socket = io();
// function RequestAllLocaions(){
//     socket.emit("RequestAllLocaions");
//     socket.on("SendAllLocations", function(data){
//         console.log(data)
//     })
// }
function getCoordinates(callback) {
    requestLocations(function (data) {
        //console.log(data);
        callback(data);
    });
}
function requestLocations(callback) {
    function getUpdateData() {
        socket.emit("RequestAllLocations");
    }
    socket.on("SendAllLocations", function (data) {
        // console.log(data)
        callback(data)
    })
    getUpdateData();
}

function initMap() {
    new Promise((resolve, reject) => {
        var stateQ;
        getCoordinates(function (value) {
            stateQ = value;
            resolve(stateQ);
        });
    }).then(function (value) {
        console.log(value)
        var bp = { lat: 51.30, lng: 3.14 };
        var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 11,
            center: bp,
            maxZoom: 20,
            minZoom: 9,
            mapTypeControl: true
        });


        // Create the search box and link it to the UI element.
 var input = document.getElementById('pac-input');
 var searchBox = new google.maps.places.SearchBox(input);
 map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

 // Bias the SearchBox results towards current map's viewport.
 map.addListener('bounds_changed', function() {
   searchBox.setBounds(map.getBounds());
 });

        var iw = new google.maps.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map, {
            markersWontMove: true,
            markersWontHide: true,
            basicFormatEvents: true
        });
        var locations = [];
        var clusterMarker = [];
        

        for (i = 0; i < value.length; i++) {
            locations.push([value[i].locatie, value[i].latitude, value[i].longitude, value[i].rating, value[i].shop])
        }


        //var rating = 1;

        for (var i = 0; i < locations.length; i++) {
            var item = locations[i];
            if (item[3] > 2.5) {
                var image = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png ',
                    scaledSize: new google.maps.Size(30, 30),
                    optimized: false,
                    zIndex: 100
                }
            }
            else {
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
                rating: item[3],
                shop: item[4],
                // map: map,
            });



            oms.addListener('click', function (marker) {
                iw.setContent(marker.shop); //uitmysql halen colom winkel
                iw.open(map, marker);

                document.getElementById("winkel").innerHTML = marker.title;  //mysql importeren hier
                document.getElementById("maatregelen").innerHTML = "Ja";
                document.getElementById("score").innerHTML = marker.rating + "/5";

                document.getElementById("legend").style.display = "block";

                setTimeout(function () { document.getElementById("legend").style.display = "none"; }, 10000);

            });

            oms.addMarker(marker);
            clusterMarker.push(marker);
        }
        new MarkerClusterer(map, clusterMarker, {
            maxZoom: 11,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',//standard cluster markers
        });
    }).catch(function (err) {
        socket.emit("Error", err);
        console.log(err);
    })

}

