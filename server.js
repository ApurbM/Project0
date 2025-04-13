const express = require('express');
require('dotenv').config();
const app = express();
const bodyparser = require('body-parser'); //it convert the upcoming body portion of http request into object
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const initialize = require('./authentication');
const PORT  = 8081;
app.use(bodyparser.json()); //this is the place where it convert the value
//db connection
app.use(bodyparser.urlencoded({extended:false})); //for form filling
app.use(session({
    secret: 'secret123' ,  //so that cilent cant change the session id
    resave: false,       
    saveUninitialized: false
}));
//passport initilzation
app.use(passport.initialize());
app.use(passport.session());

initialize(passport);
const DB = require('./db1');
DB();

//model link
const studentModel = require('./student');
const teacherModel = require('./teacher');
const loginUser = require('./LoginUser');
// router linking
const stuRuth = require('./stuRuth');
const tecRuth = require('./teacRuth');
// Middleware for routing
app.use('/',stuRuth);
app.use('/',tecRuth);


app.get('/',(req,res)=>{
    res.send("Welcome to our school Database");
})


app.post('/register',async (req,res)=>{
    try {
         const HashedPassWord = await bcrypt.hash(req.body.password,10);
         const value = new loginUser({username:req.body.username,password:HashedPassWord});
         const dataSaved =   await value.save();
         res.send(`${dataSaved.username} register to our DB successfully`);
    } catch (error) {
        res.status(505).send(error);
    }
});

app.post('/login', passport.authenticate(
    'local',
    {
        successRedirect:'/dashboard',
        failureRedirect:'/login-fail'
    }
));

app.get('/dashboard',(req,res)=>{
    if(req.isAuthenticated()){
        res.send("success in auth");
    }
    else{
        res.redirect('/login');
    }
})
app.get('/login-fail',(req,res)=>{
    res.send("login failed")
})
app.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.send(err);
        }
        res.send("logout success");
    })
})
app.listen(PORT,()=>{
    console.log('Connection successfull...');
});

// let array = [{id:1 , name:"apurb" , number:"9955001615"},{id:2 , name:"babita" , number:"6299848638"}];

// app.put('/array/:number',(req,res)=>{
//             const endpoint = req.params.number;
//             const updatedValue = req.body;
//             const check = array.findIndex((obj)=>{ return obj.number == endpoint});
//             if(check===-1){
//                res.status(500).send("not found the number");
//             }
//             else{
//                 array[check] = {...updatedValue};
//                  res.status(200).send(array);
//             }
// })
