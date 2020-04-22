var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require("./Database.js")
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/ServerUpdate.js', (req, res) => {
  res.sendFile(__dirname + '/ServerUpdate.js');
});
app.get('/userData.js', (req, res) => {
  res.sendFile(__dirname + '/pages/userData.js');
});
app.get('/red-dot.png', (req, res) => {
  res.sendFile(__dirname + '/pages/red-dot.png');
});
app.get('/green-dot.png', (req, res) => {
  res.sendFile(__dirname + '/pages/green-dot.png');
});


app.get('/map', (req, res) => {
  res.sendFile(__dirname + '/pages/map.html');
});
app.get('/reviews', (req, res) => {
  res.sendFile(__dirname + '/pages/reviews.html');
});
app.get('/tos', (req, res) => {
  res.sendFile(__dirname + '/pages/tos.html');
});
app.get('/css/styles.css', (req, res) => {
  res.sendFile(__dirname + '/css/styles.css');
});
app.get('/map.js', (req, res) => {
  res.sendFile(__dirname + '/Map/map.js');
});
app.get('/userReview', (req, res) => {
  res.sendFile(__dirname + '/pages/userReview.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/pages/about.html');
});
app.get('/vivesLogo', (req, res) => {
  res.sendFile(__dirname + '/images/vivesLogo.png');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('doc ready', (msg) => {
    console.log('doc ready from client: ' + msg);
    socket.emit("hallo van server", "hallo van server")
    db.asyncFunction();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

http.listen(8080, () => {
  console.log('listening on: http://localhost:8080');
});