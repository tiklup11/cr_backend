const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    membersList : [String],
    name : String,
    score : {type : Number, default:0},
    ownerId : String,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team',TeamSchema);