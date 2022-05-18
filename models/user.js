const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName : String,
    friendsId : [String],
    joinedTeamsId : [String],
    owningTeamId : [String],
    solvedChallengesId : [String],
    joinedOn: { type: Date, default: Date.now },
    password : String
});

module.exports = mongoose.model('User',UserSchema);