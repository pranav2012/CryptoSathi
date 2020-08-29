const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001; 
const db = require('./database/database');
const login = require('./authantication/login');
const signup = require('./authantication/signup');
const google = require('./authantication/google');
const bcrypt = require('bcrypt-nodejs');
const send_mail = require('./mail/send_mail');

const app = express();

app.use(bodyparser.json());

app.use(cors());

app.get('/', (req,res)=>{
    res.send("hello cryptosathi's");
});

app.post('/login', (req,res) => {login.loginhandler(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{signup.signuphandler(req,res,db,bcrypt)});

app.post('/gauth', (req,res) => {google.googleauthchecker(req,res,db,bcrypt)});

app.post('/gregister', (req,res) => {google.googleregister(req,res,db,bcrypt)});

app.listen(port, () => console.log(`running on port ${port}`));