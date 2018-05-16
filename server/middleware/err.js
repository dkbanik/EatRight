const Response = require('../api/classes');

const fs = require('fs');


module.exports = function () {

    return function (err, req, res, next) {

        if (err) {
            res.status(500).send(new Response(err.message, null));
            console.log(err);
            fs.appendFile('errLogs.txt', err + '\r\n', function (err) {
                if (err) {
                    console.log('error writing to file');
                }
            });
        }
    };
};