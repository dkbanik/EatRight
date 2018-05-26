var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({

    name :{
        type: String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    mobile : {
        type : Number,
        minlength : 10,
        maxlength : 10,
        required : true,
        unique : true
    },

    description : String
});

module.exports = mongoose.model('restaurant', restaurantSchema);