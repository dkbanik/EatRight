var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemTypeSchema = new Schema({

    name :{
        type: String,
        required : true
    },

    restaurant: {type: Schema.Types.ObjectId, ref: 'restaurant'},

    description : String
});

module.exports = mongoose.model('item_type', itemTypeSchema);