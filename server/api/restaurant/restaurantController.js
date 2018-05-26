var Restaurant = require('./restaurantModel');
var _ = require('lodash');

const errHandler = require('../../middleware/err');
const Response = require('../classes');


exports.params = function (req, res, next, id) {

    Restaurant.findById(id)
        .then(function (restaurant) {
            if (!restaurant) {
                next(new Error('No customer with such id'));
            }
            else {
                req.restaurant = restaurant;
                next();
            }
        }, function (err) {
            next(err);
        });
};


exports.get = function(req, res, next){

    Restaurant.find({})
    .then(function(restaurants){
        res.json(new Response(null, restaurants));
    }, function(err){
        next(err);
    });
};

exports.getOne = function(req, res, next) {
    var restaurant = req.restaurant;
    res.json(new Response(null, restaurant));
};


exports.put = function(req, res, next) {

    var restaurant = req.restaurant;

    var update = req.body;

    _.merge(restaurant, update);

    restaurant.save(function(err, saved){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, saved));
        }
    });
};

exports.post = function(req, res, next){

    var newRestaurant = req.body;

    Restaurant.create(newRestaurant)
    .then(function(restaurant){

        res.json(new Response(null, restaurant));
    }, function(err){
        next(err);
    });
};

exports.delete = function(req, res, next){

    req.restaurant.remove(function(err, removed){

        if(err){
            next(err);
        }
        else{
            res.json(null, removed);
        }
    });
};