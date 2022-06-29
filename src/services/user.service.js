const { User } = require('../models');
const { mailerService } = require('.');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password) && user.verified == true) {
        return user;
    }
    throw new Error('Invalid credentials');
};

const signup = async (name, email, DoB, password) => {
    try {
        const user = new User({
            name,
            email,
            DoB,
            password: await bcrypt.hash(password, 10)
        });
        await user.save();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'nedra.larson80@ethereal.email',
                pass: 'yGZTejtdT7yFJx9WpJ'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'nedra.larson80@ethereal.email',
            to: user.email,
            subject: 'Verification',
            text: `You are successfuly registred on our site!To verify your email please follow this link: http://localhost:3000/verify/${user.verifyingKey}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return user;
    } catch (e) {
        if (e.code === 11000) {
            throw new Error(`${email} is already exist in system`);
        }
    }
};

const verify = async verifyingKey => {
    const user = await User.findOne({ verifyingKey: verifyingKey });
    if (user) {
        user.verified = true;
        await user.save();
        return user;
    } else {
        throw new Error('Invalid verification key ');
    }
};

const getUser = async id => {
    const user = await User.findById(id);
    return user;
};

const updateUser = async (id,name,email) => {
    const user = await User.findByIdAndUpdate({_id: id}, { $set : {name,email }}, { new: true });
    return user;
};


module.exports = {
    login,
    signup,
    verify,
    getUser,
    updateUser
}