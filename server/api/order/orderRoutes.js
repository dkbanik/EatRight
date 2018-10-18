var orderRouter = require('express').Router();

var logger = require('../../util/logger');

var orderController = require("./orderController");
var createRoutes = require('../../util/createRoutes');

createRoutes(orderController, orderRouter);


module.exports = orderRouter;