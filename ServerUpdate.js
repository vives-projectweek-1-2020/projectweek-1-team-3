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
        var bp = { lat: 51.0543422, lng: 3.7174243 };
        var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 9,
            center: bp,
            maxZoom: 20,
            minZoom: 7,
            mapTypeControl: true
        });


        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
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
            locations.push([value[i].locatie, value[i].latitude, value[i].longitude, value[i].rating, value[i].shop, value[i].review])
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
                review: item[5],
                // map: map,
            });



            oms.addListener('click', function (marker) {
                iw.setContent(marker.shop); //uitmysql halen colom winkel
                iw.open(map, marker);

                document.getElementById("winkel").innerHTML = marker.shop;
                document.getElementById("adress").innerHTML = marker.title;
                document.getElementById("maatregelen").innerHTML = "Ja";
                document.getElementById("score").innerHTML = marker.rating + "/5";

                document.getElementById("legend").style.display = "block";

                //setTimeout(function () { document.getElementById("legend").style.display = "none"; }, 10000);

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


function RequestReviews() {
    console.log("fgdfns")
    socket.emit("RequestAllReviews")
    socket.on("SendAllReviews", function (data) {

        PrintReviews(data)
    })
}
function PrintReviews(data) {

    for (var i = 0; i < data.length; i++) {
        var reviewbox = document.createElement("div");
        reviewbox.className = "reviewbox"
        reviewbox.style.borderColor = "gray"
        reviewbox.style.borderStyle = "groove"

        var head = document.createElement("div");
        head.className = "head"
        head.setAttribute("style", "display: flex; background-color: lightgrey;")

        var identifacation = document.createElement("h5")
        identifacation.className = "identification"
        identifacation.innerHTML = data[i].locatie
        identifacation.style.paddingLeft = "2px"

        var rating = document.createElement("h5")
        rating.innerHTML = data[i].rating + "&#10025"
        rating.className = "rating"
        rating.setAttribute("style", "text-align: right; padding-left: 10px;")


        head.append(identifacation)
        head.append(rating)

        reviewbox.append(head)

        var metaininfo = document.createElement("div");
        metaininfo.className = "metaininfo"
        metaininfo.setAttribute("style", "padding-left: 2px; display: flex; background-color: lightgrey;")

        var name = document.createElement("h6")
        name.innerHTML = data[i].username
        metaininfo.append(name)

        var date = document.createElement("h6")
        date.innerHTML = data[i].timestamp
        date.setAttribute("style", "text-align: right; padding-left: 10px;")
        metaininfo.append(date)

        reviewbox.append(metaininfo)

        var article = document.createElement("article");
        article.className = "article"
        article.style.height = '200px'
        article.style.overflow = scroll

        var reviewBlock = document.createElement("p")
        reviewBlock.style.padding = '6px'
        reviewBlock.id = "reviewBlock"
        reviewBlock.innerHTML = data[i].review
        article.append(reviewBlock)

        reviewbox.append(article)

        document.getElementById("review").append(reviewbox)
        document.getElementById("review").append(document.createElement("br"))
    }

}
function filtermarkers(){
    
}