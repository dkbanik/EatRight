var express = require('express');

var app = express();

app.get('/hello', (req, res) => {

    //res.charset('utf8');
    res.writeHead(200, {'content-type':'text/html'});
    res.end("<h1>Hello World!</h1>");
});

app.get('/hello/:id', (req, res) => {

    var id = req.params.id;
    res.writeHead(200, {'content-type':'text/html'});
    res.write("<h1>Hello World!</h1>");
    res.end(`<h2> ${id} </h2>`);
});

app.get('/file', (req, res) => {

    res.sendFile(__dirname + '/index.html' , function(err){
        if(err){
            res.status(500).send(err);
        }
    })
});
var port = 8000;
app.listen(port, function(){

    console.log(`App listening on port ${port}`);
});

