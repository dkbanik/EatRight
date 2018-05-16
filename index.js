
var config = require('./server/config/config.js');
var app = require('./server/server.js');

var logger = require('./server/util/logger.js');



//var port = 8000;
app.listen(config.port);
console.log('listening on http://localhost:' + config.port);

