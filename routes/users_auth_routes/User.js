// User.js

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);