var Order = require('./orderModel');
var _ = require('lodash');

const errHandler = require('../../middleware/err');
const Response = require('../classes');



exports.params = function (req, res, next, id) {

    Order.findById(id)
        .then(function (order) {
            if (!order) {
                next(new Error('No order with such id'));
            }
            else {
                req.order = order;
                next();
            }
        }, function (err) {
            next(err);
        });
};


exports.get = function(req, res, next){

    Order.find({})
    .then(function(orders){
        res.json(new Response(null, orders));
    }, function(err){
        next(err);
    });
};

exports.getOne = function(req, res, next) {
    var order = req.order;
    res.json(new Response(null, order));
};


exports.put = function(req, res, next) {

    var order = req.order;

    var update = req.body;

    _.merge(order, update);

    order.save(function(err, saved){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, saved));
        }
    });
};

exports.post = function(req, res, next){

    var newOrder = req.body;

    Order.create(newOrder)
    .then(function(order){

        res.json(new Response(null, order));
    }, function(err){
        next(err);
    });
};

exports.delete = function(req, res, next){

    req.order.remove(function(err, removed){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, removed));
        }
    });
};