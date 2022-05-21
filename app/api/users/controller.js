const { Router } = require('express');

const { User } = require('../../../models');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.json(await User.find());
});

userRouter.get('/:id', async (req, res) => {
    res.json(await User.findById(req.params.id));
});

userRouter.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        DoB: req.body.DoB,
        password: req.body.password
    });
    res.json(await user.save());
});

userRouter.put('/:id', async (req, res) => {
    const newUser = req.body;
    res.json(await User.findByIdAndUpdate(req.params.id, newUser, { new: true }));
});

userRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
});

module.exports = userRouter;