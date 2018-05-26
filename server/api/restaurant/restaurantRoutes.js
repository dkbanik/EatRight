var restaurantRouter = require('express').Router();

var logger = require('../../util/logger');

var restaurantController = require("./restaurantController");
var createRoutes = require('../../util/createRoutes');

createRoutes(restaurantController, restaurantRouter);

module.exports = restaurantRouter;