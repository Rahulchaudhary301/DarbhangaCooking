const mongoose = require('mongoose')

const Admin = new mongoose.Schema({


    username: {
        type: String,
        trim: true
    },

    password: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }



}, { timestamps: true })


module.exports = mongoose.model('Admin', Admin)