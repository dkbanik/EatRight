var express = require('express');
var parser = require('body-parser');

var app = express();

var rectangleRouter = require('./rectangle');
//var helloRouter = require('./hello');


var _ = require('lodash');
var morgan = require('morgan');
const fs = require('fs');

app.use(express.static('images'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

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

app.get('/file', (req, res) => {

    res.sendFile(__dirname + '/index.html', function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
});

app.use(function (err, req, res, next) {

    if (err) {
        res.status(500).send(err.message);
        console.log(err);
        fs.appendFile('errLogs.txt', err + '\r\n', function (err) {
            if (err) {
                console.log('error writing to file');
            }
        });
    }

});


var port = 8000;
app.listen(port, function () {

    console.log(`App listening on port ${port}`);
});

module.exports = app;

