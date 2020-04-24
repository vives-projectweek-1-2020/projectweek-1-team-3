require('dotenv').config()

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = require("./Database.js")
const request = require('request')

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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
// app.get('/reviews.js', (req, res) => {
//   res.sendFile(__dirname + '/pages/reviews.js');
// });
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


app.post('/Submit_Review', (req, res) => {
  // console.log(req.body)

  request('https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBapC08lQSjzK3EjliUyI89EB7j6a7YRZE&input=' + req.body.location, (error, response, data) => {

    if (error) return res.json({error: 'er is een error'})

    data = JSON.parse(data)


    const lat = data.results[0].geometry.location.lat
    const long = data.results[0].geometry.location.lng
    const location = data.results[0].formatted_address

    const review = {
      ...req.body,
      location,
      long,
      lat
    }

    db.insertReview(review)

    return res.send("Review submitted")
  })
})

io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('RequestAllLocations', () => {
    new Promise((resolve, reject) => {
      stateQ = db.getAllLocations();
      resolve(stateQ)
    }).then(function (value) {
      //console.log(value)
      socket.emit("SendAllLocations", value);
    }).catch(function (err) {
      socket.emit("Error", err);
      console.log(err);
    })
  });
  socket.on('RequestAllReviews', () => {
    
    new Promise((resolve, reject) => {
      stateQ = db.getAllLocations();
      resolve(stateQ)
    }).then(function (value) {
      
      socket.emit("SendAllReviews", value);
    }).catch(function (err) {
      socket.emit("Error", err);
      console.log(err);
    })
  });

  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });

});

http.listen(8080, () => {
  console.log('listening on: http://localhost:8080');
});