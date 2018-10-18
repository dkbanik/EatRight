var Item = require('./itemModel');
var _ = require('lodash');

const errHandler = require('../../middleware/err');
const Response = require('../classes');


exports.params = function (req, res, next, id) {

    Item.findById(id)
        .then(function (item) {
            if (!item) {
                next(new Error('No item with such id'));
            }
            else {
                req.item = item;
                next();
            }
        }, function (err) {
            next(err);
        });
};


exports.get = function(req, res, next){

    Item.find({}).populate('itemType').exec()
    .then(function(items){
        res.json(new Response(null, items));
    }, function(err){
        next(err);
    });
};

exports.getOne = function(req, res, next) {
    var item = req.item;
    res.json(new Response(null, item));
};


exports.put = function(req, res, next) {

    var item = req.item;

    var update = req.body;

    _.merge(item, update);

    item.save(function(err, saved){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, saved));
        }
    });
};

exports.post = function(req, res, next){

    var newItem = req.body;

    Item.create(newItem)
    .then(function(item){

        res.json(new Response(null, item));
    }, function(err){
        next(err);
    });
};

exports.delete = function(req, res, next){

    req.item.remove(function(err, removed){

        if(err){
            next(err);
        }
        else{
            res.json(null, removed);
        }
    });
};