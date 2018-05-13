var rectangleRouter = require('express').Router();

class Rectangle {
    constructor(id, height, width) {
        this.id = id;
        this.height = height;
        this.width = width;
    }

}

var idCounter = 1;
var obj0 = new Rectangle(idCounter, 55, 'anything');
var obj1 = new Rectangle(++idCounter, 55, 105);
var obj2 = new Rectangle(++idCounter, 55, 106);
var rectangles = new Array(obj0, obj1, obj2);



var middleware = function (req, res, next) {

    if (!req.body.addon)
        req.body.addon = 'added by middleware';
    next();
}


rectangleRouter.param('id', function (req, res, next, id) {

    //var obj = _.find(rectangles,function(obj) { return obj.id == id;});
    var obj = rectangles.filter(x => x.id == id);
    //var obj = rectangles.find(x => x.id == id);

    if (obj) {
        console.log(obj);
        req.rectangle = obj;
        next();
    } else {
        next(new Error('failed to load rectangle'));
    }

});


rectangleRouter.get('/:id', (req, res, next) => {

    var object = req.rectangle;
    res.send(object);
})

rectangleRouter

rectangleRouter.get('/', (req, res, next) => {

    res.send(rectangles);
}).post('/', middleware, (req, res, next) => {

    var rectangle = req.body;

    var newRectangle = new Rectangle(++idCounter, rectangle.height, rectangle.width);
    rectangles.push(newRectangle);
    //newRectangle.addon = rectangle.addon;
    res.send(newRectangle);
}).put('/', (req, res, next) => {

    var obj = rectangles.filter(x => x.id == req.body.id);

    if (obj.length == 1) {
        var index = rectangles.indexOf(obj[0]);
        if (index !== -1) {
            rectangles[index] = req.body;
            res.send(rectangles[index]);
        }
        else{
            next(new Error('multiply rectangles with the same id found'));    
        }
    }


    else {
        next(new Error('no such rectangle found'));

    }
});

module.exports = rectangleRouter;