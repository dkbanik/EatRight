var express = require('express');

var api = require('./api/api');
var err = require('./middleware/err');
var Response = require('./api/classes');

var config = require('../server/config/config');

// db.url is different depending on NODE_ENV
var mongoose = require('mongoose');


const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(config.db.url, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry();

var app = express();

require('./middleware/appMiddleware')(app);

app.use('/api', api);
app.use(err());

module.exports = app;

/*

var parser = require('body-parser');
var path = require('path');
//var helloRouter = require('./hello');


var _ = require('lodash');
var morgan = require('morgan');
const fs = require('fs');

app.use('/image',express.static(path.join(__dirname,'images')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


var Response = require('./classes').Response;

var rectangleRouter = require('./rectangle');
app.use('/rectangle', rectangleRouter);

app.get('/hello', (req, res) => {

    //res.charset('utf8');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end("<h1>Hello World!</h1>");
});

app.get('/hello/:id', (req, res, next) => {

    var id = req.params.id;
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write("<h1>Hello World!</h1>");
    res.end(`<h2> ${id} </h2>`);
});


app.get('/image', (req, res) => {

    var imageNumber =  Math.floor(Math.random() * 14) + 1 ;

    res.sendFile(__dirname + '/images/mbuntu-'+imageNumber+'.jpg', function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
});

app.get('/file', (req, res) => {

    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
});




var port = 8000;
app.listen(port, function () {

    console.log(`App listening on port ${port}`);
});

*/

