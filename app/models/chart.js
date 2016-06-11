// load the things we need
var mongoose = require('mongoose');

// define the schema for our chart model
var chartSchema = mongoose.Schema({
       
        obm     : String,
        value1   : Number,
        value2   : Number,
        value3   : Number,
        value4   : Number,
        value5   : Number,
        value6   : Number,
        value7   : Number,
        value8   : Number,
        value9   : Number
    
});


// create the model for charts and expose it to our app
module.exports = mongoose.model('Chart', chartSchema);