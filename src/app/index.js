const { Router } = require('express');

const appRouter = Router();

appRouter.use('/', require('./home/home'));
appRouter.use('/signup', require('./signup/signup'));
appRouter.use('/login', require('./login/login'));
appRouter.use('/verify', require('./verify/verify'));
appRouter.use('/chat',require('./chat/chat'));

module.exports = appRouter;