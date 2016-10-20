// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// create a schema for image type
//var ImageSchema = new Schema({
 // url : { type : String},
 // created : { type : Date, default : Date.now }
//});
//var Image = db.model('images', ImageSchema);

// create a schema
var leaderSchema = new Schema({
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
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        default: '',
        required: true
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
var Leaders = mongoose.model('Leader', leaderSchema);

// make this available to our Node applications
module.exports = Leaders;