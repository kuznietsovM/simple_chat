const { Router } = require('express');

const { Chat, Message } = require('../../models');

const chatRouter = Router();

chatRouter.get('/', async (req, res) => {

    const chat = await Chat.findOne({ chat_id: req.query.chat_id });

    res.render('chat', {
        usernameToChat: req.query.usernameToChat,
        messages: await Message.find({ chat_id: chat._id })
    });
});

chatRouter.post('/', async (req, res) => {
    const chat = new Chat({
        user_id1: req.body.user1,
        user_id2: req.body.user2,
    });
    res.json(await chat.save());
});



module.exports = chatRouter;