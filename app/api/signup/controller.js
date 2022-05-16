const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { createUserValidation } = require('./validation');

const signUpRouter = Router();

const { usersProvider } = require('../../services/index');

signUpRouter.get('/', (req, res) => {
    res.render('signup');
})

signUpRouter.post('/', createUserValidation, async (req, res) => {
    await usersProvider.setUser({
        email: req.body.email,
        name: req.body.name,
        DoB: req.body.DoB,
        password: req.body.password
    });
    req.session.auth = true;
    req.session.username = req.body.name;
    res.redirect('/');
})

module.exports = signUpRouter;