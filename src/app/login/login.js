const { Router } = require('express');
//const { loginValidation } = require('./validation');
const { loginValidation } = require('../../validations');

const loginRouter = Router();

const { User } = require('../../models');
const { userService } = require('../../services');

loginRouter.get('/', (req, res) => {
    res.render('login', { error: '' });
})

loginRouter.post('/', loginValidation.appValidator, async (req, res) => {  //TODO : app validator
    const { error } = req.validation;
    if(error){
        res.render('login', { error: JSON.stringify(error.details) });
    }else{
        try{
            const user = await userService.login(req.body.email,req.body.password);
            req.session.auth = true;
            req.session.username = user.name;
            req.session.userID = user._id;
            res.redirect('/');
        }catch (e){
            res.render('login', { error: 'Invalid credentials'});
        }
        
    }
});
module.exports = loginRouter;