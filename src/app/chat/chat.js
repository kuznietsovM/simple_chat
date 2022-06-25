const { Router } = require('express');

const { Chat } = require('../../models');

const chatRouter = Router();

chatRouter.post('/', async (req, res) => {
    const chat = new Chat({
        user_id1: req.body.user1,
        user_id2: req.body.user2,
    });
    res.json(await chat.save());
});

module.exports = chatRouter;