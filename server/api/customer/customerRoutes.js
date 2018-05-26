var customerRouter = require('express').Router();

var logger = require('../../util/logger');

var customerController = require("./customerController");
var createRoutes = require('../../util/createRoutes');

createRoutes(customerController, customerRouter);

module.exports = customerRouter;