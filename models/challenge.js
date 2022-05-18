const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    title: String,
    type : String,
    solvedCount : {type :Number, default:0},  //no of users solved this 
    solvedByFirst : {type : String, default:null}, //userId,
    description : {
        text : String,
        redirectUrl : String,
        resourseUrl : String,
    }
 });

module.exports = mongoose.model('Challenge',ChallengeSchema);