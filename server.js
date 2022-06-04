const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { appRouter, apiRouter } = require('./src');

const app = express();

const { port } = config.get('server');

app.use(bodyParser.urlencoded());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('trust proxy', 1);

app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        auth: false
    }
}));

app.use(cookieParser());
app.use('/assets', express.static(path.join('public', 'assets')));

app.use('/api', apiRouter);
app.use('/', appRouter);

mongoose.connect(config.get('db.connectionString'))
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(e => {
        console.log('Connection error: ', e);
    });
