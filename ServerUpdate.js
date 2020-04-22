var socket = io();
function RequestAllLocaions(){
    socket.emit("RequestAllLocaions");
    socket.on("SendAllLocations", function(data){
        console.log(data)
    })
}