const { Router } = require('express');
const user = require('./user/user');
const chat = require('./chat/chat');
const auth = require('./user/auth');
const jwtHook = require('../middlewares/jwt.middleware');


const apiRouter = Router();

apiRouter.use('/chats', chat);
apiRouter.use('/users',jwtHook, user);
apiRouter.use('/auth',  auth);

module.exports = apiRouter;