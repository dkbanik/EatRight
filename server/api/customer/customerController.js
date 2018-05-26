var Customer = require('./customerModel');
var _ = require('lodash');

const errHandler = require('../../middleware/err');
const Response = require('../classes');


exports.params = function (req, res, next, id) {

    Customer.findById(id)
        .then(function (customer) {
            if (!customer) {
                next(new Error('No customer with such id'));
            }
            else {
                req.customer = customer;
                next();
            }
        }, function (err) {
            next(err);
        });
};


exports.get = function(req, res, next){

    Customer.find({})
    .then(function(customers){
        res.json(new Response(null, customers));
    }, function(err){
        next(err);
    });
};

exports.getOne = function(req, res, next) {
    var customer = req.customer;
    res.json(new Response(null, customer));
};


exports.put = function(req, res, next) {

    var customer = req.customer;

    var update = req.body;

    _.merge(customer, update);

    customer.save(function(err, saved){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, saved));
        }
    });
};

exports.post = function(req, res, next){

    var newCustomer = req.body;

    Customer.create(newCustomer)
    .then(function(customer){

        res.json(new Response(null, customer));
    }, function(err){
        next(err);
    });
};

exports.delete = function(req, res, next){

    req.customer.remove(function(err, removed){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, removed));
        }
    });
};