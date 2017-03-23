var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
      type: String,
      required: true
    },
    date_added: {
      type: Date,
      default: Date.now()
    }},
    {
        collection: 'images'
    }
);

module.exports = mongoose.model('Image', ImageSchema);
