const { urlencoded } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    id: {type: String},
    url : {
        type: String,
        require: true
    },
    hash: {
        type: String
    },
    message: {
        type:String
    }
})
module.exports = URL = mongoose.model('URL', UrlSchema)