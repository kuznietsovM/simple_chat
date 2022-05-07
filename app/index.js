const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('config');

const signup = require('./api/signup/controller');
const home = require('./api/home/controller');
const login = require('./api/login/controller');
const users = require('./api/users/controller');
const chats = require('./api/chats/controller');


const app = express();

app.use(bodyParser()); 
app.use(express.json());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'..','views'));
app.set('trust proxy',1);

app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        auth:false
    }
}));

app.use(cookieParser());
app.use('/assets',express.static(path.join('public','assets')));


app.use('/',home);
app.use('/users',users);
app.use('/chats',chats);
app.use('/signup',signup);
app.use('/login',login);


app.use(errors());

module.exports = app;