const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema  = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    phone_number: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', schema);