const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlagSchema = new Schema({
    fId : String, //same as challenge
    flagString : String     
});

module.exports = mongoose.model('Flag',FlagSchema);