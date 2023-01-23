const mongoose = require("mongoose");

const urls = new mongoose.Schema({
    url : {type: String, required: true},
    shortUrl: {type: String, unique: true, required: true},
    user: { type: mongoose.Schema.ObjectId, ref: 'users', required: true }
}, {
    timestamps : true
})

module.exports = mongoose.model('urls', urls);
