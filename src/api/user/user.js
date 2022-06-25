const { Router } = require('express');

const { User } = require('../../models');
const { userService } = require('../../services');
const { signupValidation } = require('../../validations');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.json(await User.find());
});

userRouter.get('/:id', async (req, res) => {
    res.json(await User.findById(req.params.id));
});

userRouter.post('/',signupValidation.apiValidator, async (req, res) => {
    const user = await userService.signup(req.body.name,req.body.email,req.body.DoB,req.body.password);
    res.json(user);
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