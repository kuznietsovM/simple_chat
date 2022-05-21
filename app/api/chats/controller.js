const { Router } = require('express');

const { Chat } = require('../../../models');

const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    res.json(await Chat.find());
});

chatRouter.get('/:id', async (req, res) => {
    res.json(await Chat.findById(req.params.id));
});

chatRouter.post('/', async (req, res) => {
    const chat = new Chat({
        user_id1: req.body.user_id1,
        user_id2: req.body.user_id2,
    });
    res.json(await chat.save());
});

chatRouter.put('/:id', async (req, res) => {
    const newChat = req.body;
    res.json(await Chat.findByIdAndUpdate(req.params.id, newChat, { new: true }));
});

chatRouter.delete('/:id', async (req, res) => {
    await Chat.findByIdAndDelete(req.params.id);
    res.status(200).send();
});

module.exports = chatRouter;