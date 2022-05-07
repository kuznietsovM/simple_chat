const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { usersProvider } = require('../../services/index');


const homeRouter = Router();

homeRouter.get('/',async (req,res) =>{
    res.render('index',{
        users: await usersProvider.getUsers(),
        auth:req.session.auth,
        username:req.session.username,
    });
});

homeRouter.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','..','..','views','chat','index.html'));
});

homeRouter.get('/logout',(req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});

module.exports = homeRouter;