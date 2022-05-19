const { Router } = require('express');
const { createUserValidation } = require('./validation');

const signUpRouter = Router();

const { User } = require('../../../models');

signUpRouter.get('/', (req, res) => {
    res.render('signup');
})

signUpRouter.post('/', createUserValidation, async (req, res) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        DoB: req.body.DoB,
        password: req.body.password
    });
    await user.save();

    req.session.auth = true;
    req.session.username = req.body.name;
    res.redirect('/');
})

module.exports = signUpRouter;