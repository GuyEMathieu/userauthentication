// User.js

var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    employeeNumber: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employee', employeeSchema);