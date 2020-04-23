
var socket = io();
function RequestAllLocaions() {
    socket.emit("RequestAllLocaions");
    socket.on("SendAllLocations", function (data) {
        console.log(data)
    })
}


/* document.getElementById("button").addEventListener("click", PushAllData);
function PushAllData() {
    var Username = document.getElementById(userName).value
    var Shop = document.getElementById(shopName).value
    var City = document.getElementById(location).value
    var Rating = ratingValue
    var Review = document.getElementById(review).value
    document.getElementById("id")
    var list = [];

    if (Username != "" && Shop != "" && City != "" && Rating != "" && Review != "") {
        list.push(Username)
        list.push(Shop)
        list.push(City)
        list.push(Rating)
        list.push(Review)
        socket.emit(PushAllData)
    }
} */
