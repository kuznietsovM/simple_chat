const { User } = require('../models');
const { mailerService } = require('.');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password) && user.verified == true){
        return user;
    }
    throw new Error('Invalid credentials');
 };

const signup = async (name, email, DoB, password) => { 
    try{ 
        const user = new User({
            name,
            email,
            DoB,
            password: await bcrypt.hash(password,10)
        });
        await user.save();
        
        //send email verification
        const message = {
            from: 'mailforapphillel@gmail.com',
            to: user.email,
            subject: 'Verification',
            text: `You are successfuly registred on our site!To verify your email please follow this link: http://localhost:3000/verify/${user.verifyingKey} `
        }

        //mailerService(message);
        
        
        return user;
    } catch (e) {
        if (e.code === 11000) {
            throw new Error(`${email} is already exist in system`);
        }
    }
};

const verify = async verificationKey => {
    const user = await User.findOne({ verificationKey })
    if(user){
        user.verified = true;
        await user.save();
        return user;
    }else{
        throw new Error('Invalid verification key ')
    }
 };


module.exports = {
    login,
    signup,
    verify
}