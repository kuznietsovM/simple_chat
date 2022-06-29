const { Router } = require('express');

const { User,Chat } = require('../../models');


const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    res.render('index', {
        users: await User.find(),
        auth: req.session.auth,
        username: req.session.username,
        userID: req.session.userID,
        chats:await Chat.find()
    });
});



homeRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = homeRouter;