var socket = io();
function sendToServer(){
    console.log("homejs")
    var i = 9;
    socket.emit("doc ready", i)
    socket.on("hallo van server", function(data){
        console.log(data)
    })
}