const { Router } = require('express');

const { chatsProvider } = require('../../services/index');

const chatRouter = Router();

chatRouter.get('/', async(req,res) =>{
    res.json(await chatsProvider.getChats());
});

chatRouter.get('/:id',async (req,res) =>{
    res.json(await chatsProvider.getChat(req.params.id));
});

chatRouter.post('/',async(req,res) =>{
    res.json(await chatsProvider.setChat(req.body));
});

chatRouter.put('/:id',async(req,res) =>{
    const chat = req.body;
    res.json(await chatsProvider.setChat({id:req.params.id, ...chat}));
});

chatRouter.delete('/:id',async (req,res) =>{
    await chatsProvider.deleteChat(req.params.id);
    res.status(200).send();
});

module.exports = chatRouter;