var itemTypeRouter = require('express').Router();

var logger = require('../../util/logger');

var itemTypeController = require("./itemTypeController");
var createRoutes = require('../../util/createRoutes');

createRoutes(itemTypeController, itemTypeRouter);

module.exports = itemTypeRouter;