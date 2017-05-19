var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExampleSchema   = new Schema({
    name: String,
    author: String,
    description: String,
    picName: String,
    full: String
});

module.exports = mongoose.model('Examples', ExampleSchema);
