var itemRouter = require('express').Router();

var logger = require('../../util/logger');

var itemController = require("./itemController");
var createRoutes = require('../../util/createRoutes');

createRoutes(itemController, itemRouter);

module.exports = itemRouter;