const { Router } = require('express');
// const { createUserValidation } = require('./validation');
const { userService } = require('../../services');
const { signupValidation } = require('../../validations');

const signUpRouter = Router();

const { User } = require('../../models');

signUpRouter.get('/', (req, res) => {
    res.render('signup', { error: '' });
})

signUpRouter.post('/', signupValidation.appValidator , async (req, res) => {  
    const { error } = req.validation;
    if(error){
        res.render('signup', { error: JSON.stringify(error.details)});
    }else{
        try{
            const user = await userService.signup(req.body.name,req.body.email,req.body.DoB,req.body.password);
            res.render('signup', {hideForm: true, message: `Success sign up! Check ${user.email} !`, error: ''});
        }catch (e) {
            res.render('signup', { error: e.toString() });
        }
    } 
});

module.exports = signUpRouter;