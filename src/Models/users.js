const mongoose = require("mongoose");

const users = new mongoose.Schema({
    _id: String,
    name : String,
    familyName: String,
    emails: [],
}, {
    timestamps : true
})


module.exports = mongoose.model('users', users);