const express = require('express');
const path = require('path');
const app = express();
const Challenge = require('./models/challenge')
const Team = require('./models/team');
const User = require('./models/user');

app.set('view engine','ejs');
// app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, "views")));


app.use(express.urlencoded({extended:true}));

const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/cyber-range-db';

mongoose.connect(DB_URL,{useNewUrlParser:true});


const db = mongoose.connection;

db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("db connected");
})


app.get('/home/:id',(req,res)=>{
    const {id} = req.params;
    res.render("baseHome",{id});
})


app.get('/profile/:id',async(req,res)=>{
    const {uid} = req.params;

    // console.log(id);
    const user = await User.findOne({'_id':uid})
    res.render("profile",{user,uid});
})



app.get('/scoreboard/:id',async(req,res)=>{
    // const {id} = req.params;
    const teamsData = await Team.find({});
    res.render("scoreboard",{teamsData});
})

//particular challenge details : 
app.get('/challenges/:uid/:cid',async(req,res)=>{
    const chal = await Challenge.findById(req.params.cid)
    const {uid} = req.params;
    res.render('details',{chal,uid});
})

//renders all challenges
app.get('/challenges/:uid',async (req,res)=>{
    const allC = await Challenge.find({});
    const {uid} = req.params;
    res.render('index', {allC,uid});
})




//teams
app.get('/teams/:uid/createTeam', async(req,res)=>{
    console.log("on create team PAge");
    const {uid} = req.params;
    res.render('createTeam',{uid});
});

app.post('/teams/:uid', async(req,res)=>{

    const newTeam = new Team({name : req.body.teamName, ownerId : req.params.uid});
    await newTeam.save();
    console.log("team saved, new team : ");
    console.log(newTeam);

    const {uid} = req.params;
    const user = await User.findById(uid);
    user.joinedTeamsId.push(newTeam._id);
    user.owningTeamId.push(newTeam._id);
    await user.save();

    res.redirect(`/teams/${uid}/${newTeam._id}`);
})

app.get('/teams/:uid/:tid', async(req,res)=>{
    const t = await Team.findById(req.params.tid);
    res.render('teamDetails', {t});
});

app.get('/teams/:uid', async(req,res)=>{
    const {uid} = req.params;
    const user = await User.findById(uid);
    const teamIds = user.joinedTeamsId;
    const teamsData = [];

    for(let teamId of teamIds){
        const data = await Team.findById(teamId);
        teamsData.push(data);
    }
    res.render('teams', {teamsData,uid});
});




app.get('/signup',async(req,res)=>{
    res.render('signup')
})


app.post('/signup', async(req,res)=>{
    // console.log(req.body);
    const newUser = new User({userName : req.body.username, password : req.body.password});
    await newUser.save();
    // console.log("team saved");
    console.log(newUser);
    

    res.redirect(`/challenges/${newUser._id}`);
})




app.get('/login',async(req,res)=>{
    const failed = false;
    res.render('login',{failed});
})


app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    console.log(username);
    console.log(password);
    const user = await User.findOne({'userName':username});
    console.log('user : ');
    console.log(user);
    if(user && password==user.password){
        res.redirect(`/challenges/${user._id}`);
    }else{
        const failed = true;
        res.render('login',{failed})
    }
})




// app.get('/createteam',async(req,res)=>{
//     const newTeam = new Team({teamId:"dfsfdgfdgf",teamScore:33, teamOwnerId:"sffdgdf"}); 
//     await newTeam.save();
//     res.send(newTeam);
// });

app.listen(3000, ()=>{
    console.log("listening on port 3000");
})





