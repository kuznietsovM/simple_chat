const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { loginValidation } = require('./validation');

const loginRouter = Router();

const { usersProvider } = require('../../services/index');

loginRouter.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'..','..','..','views','login','index.html'));
})

loginRouter.post('/',loginValidation,async (req,res) =>{
    users = await usersProvider.getUsers();
    user = users.find(({ email }) => email === req.body.email );
    if(user){
        if(req.body.password == user.password){
            req.session.auth = true;
            req.session.username = user.name;
        }else{
            res.send('Password wrong');
        }
    }else{
        res.send('Email wrong');
    }
    res.redirect('/');
})
module.exports = loginRouter;