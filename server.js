var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/home.js', (req, res) => {
  res.sendFile(__dirname + '/home.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('doc ready', (msg) => {
    console.log('doc ready from client: ' + msg);
    socket.emit("hallo van server", "hallo van server")
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

http.listen(8080, () => {
  console.log('listening on: http://localhost8080');
});