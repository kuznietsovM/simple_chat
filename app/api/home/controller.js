const { Router } = require('express');
const { usersProvider } = require('../../services/index');


const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    res.render('index', {
        users: await usersProvider.getUsers(),
        auth: req.session.auth,
        username: req.session.username,
    });
});

homeRouter.get('/chat', (req, res) => {
    res.render('chat');
});

homeRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = homeRouter;