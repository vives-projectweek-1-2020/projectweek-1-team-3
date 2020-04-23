
var socket = io();
function RequestAllLocaions(){
    socket.emit("RequestAllLocaions");
    socket.on("SendAllLocations", function(data){
        console.log(data)
    })
}
var Username =document.getElementById()
var Shop = document.getElementById()
var City = document.getElementById()
var Rating = document.getElementById()
var Review = document.getElementById()
document.getElementById("button").addEventListener("click", PushAllData);
function PushAllData(){
    document.getElementById("id")
    var list = [];
    list.push(Username)
    list.push(Shop)
    list.push(City)
    list.push(Rating)
    list.push(Review)
}
