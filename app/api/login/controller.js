const { Router } = require('express');
const { loginValidation } = require('./validation');

const loginRouter = Router();

const { User } = require('../../../models');

loginRouter.get('/', (req, res) => {
    res.render('login');
})

loginRouter.post('/', loginValidation, async (req, res) => {
    user = await User.findOne({ email: req.body.email });
    if (user) {
        if (req.body.password == user.password) {
            req.session.auth = true;
            req.session.username = user.name;
            res.redirect('/');
        } else {
            res.send('Password wrong');
        }
    } else {
        res.send('Email wrong');
    }
})
module.exports = loginRouter;