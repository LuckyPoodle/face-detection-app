
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',//based on ur hosting
        user: 'postgres',
        password: process.env.REACT_APP_DB_PASS,
        database: 'faceappdb'
    }
});


app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});
app.get('/hi',(req,res)=>{
    res.send("HI THERE")
})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

app.post('/register',(req,res)=>{ register.handleRegister(req,res,db,bcrypt)}); //dependency injection
app.listen(3000, () => {

    console.log('app is running on port 3000');

});

//API plan:
/*
/  root route
/signin route - POST request , respond with success or fail
/register - POST request , respond with new created user
/profile/:userId - GET , respond with the user
/image - PUT updating score , respond with updated user 's photo count



*/