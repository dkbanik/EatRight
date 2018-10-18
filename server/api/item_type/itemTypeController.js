var ItemType = require('./itemTypeModel');
var _ = require('lodash');

const errHandler = require('../../middleware/err');
const Response = require('../classes');


exports.params = function (req, res, next, id) {

    ItemType.findById(id)
        .then(function (itemType) {
            if (!itemType) {
                next(new Error('No item type with such id'));
            }
            else {
                req.itemType = itemType;
                next();
            }
        }, function (err) {
            next(err);
        });
};


exports.get = function(req, res, next){

    ItemType.find({}).populate('restaurant').exec()
    .then(function(itemTypes){
        res.json(new Response(null, itemTypes));
    }, function(err){
        next(err);
    });
};

exports.getOne = function(req, res, next) {
    var itemType = req.itemType;
    res.json(new Response(null, itemType));
};


exports.put = function(req, res, next) {

    var itemType = req.itemType;

    var update = req.body;

    _.merge(itemType, update);

    itemType.save(function(err, saved){

        if(err){
            next(err);
        }
        else{
            res.json(new Response(null, saved));
        }
    });
};

exports.post = function(req, res, next){

    var newItemType = req.body;

    ItemType.create(newItemType)
    .then(function(itemType){

        res.json(new Response(null, itemType));
    }, function(err){
        next(err);
    });
};

exports.delete = function(req, res, next){

    req.itemType.remove(function(err, removed){

        if(err){
            next(err);
        }
        else{
            res.json(null, removed);
        }
    });
};