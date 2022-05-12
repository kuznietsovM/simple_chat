const { Router } = require('express');

const { usersProvider } = require('../../services/index');

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.json(await usersProvider.getUsers());
});

userRouter.get('/:id', async (req, res) => {
    res.json(await usersProvider.getUser(req.params.id));
});

userRouter.post('/', async (req, res) => {
    res.json(await usersProvider.setUser(req.body));
});

userRouter.put('/:id', async (req, res) => {
    const user = req.body;
    res.json(await usersProvider.setUser({ id: req.params.id, ...user }));
});

userRouter.delete('/:id', async (req, res) => {
    await usersProvider.deleteUser(req.params.id);
    res.status(200).send();
});

module.exports = userRouter;