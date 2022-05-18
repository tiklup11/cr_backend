const mongoose = require('mongoose');
const Challenge = require('../models/challenge');
const ChallengesData = require('./challenges')

const DB_URL = 'mongodb://127.0.0.1:27017/cyber-range-db';

mongoose.connect(DB_URL,{useNewUrlParser:true});


const db = mongoose.connection;

db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("db connected");
})

const seedDB = async ()=>{
    await Challenge.deleteMany({});
     
    for(var data of ChallengesData){
        const newC = new Challenge(data)
        await newC.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});