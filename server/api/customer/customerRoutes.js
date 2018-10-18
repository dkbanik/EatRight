var customerRouter = require('express').Router();

var logger = require('../../util/logger');

var customerController = require("./customerController");
var createRoutes = require('../../util/createRoutes');

createRoutes(customerController, customerRouter);


customerRouter.param('name', customerController.nameParams);
customerRouter.route('/findByName/:name')
.get(customerController.getOne)

module.exports = customerRouter;