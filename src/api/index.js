const { Router } = require('express');
const user = require('./user/user');
const chat = require('./chat/chat');


const apiRouter = Router();

apiRouter.use('/chats', chat);
apiRouter.use('/users', user);

module.exports = apiRouter;