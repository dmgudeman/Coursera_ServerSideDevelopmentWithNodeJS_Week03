// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;



// create a schema for image type
//var ImageSchema = new Schema({
// url : { type : String},
// created : { type : Date, default : Date.now }
//});
//var Image = db.model('images', ImageSchema);

// create a schema
var promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        // type : Mongoose.Schema.ObjectId, ref : 'images',
        type: String,
        required: true
    },

    label: {
        type: String,
        default: '',
        required: true
    },
    price: {
        type: Currency
    },
    description: {
        type: String,
        required: true
    },

}, {
        timestamps: true
    });

// the schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('Promotion', promoSchema);

// make this available to our Node applications
module.exports = Promotions;