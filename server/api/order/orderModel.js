var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({

    customer : {type: Schema.Types.ObjectId, ref: 'customer'},
    restaurant : {type: Schema.Types.ObjectId, ref: 'restaurant'},
    totalPrice : Number
    
});

module.exports = mongoose.model('order', orderSchema);