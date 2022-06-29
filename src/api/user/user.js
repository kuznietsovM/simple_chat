const { Router } = require('express');

const { User } = require('../../models');
const { userService } = require('../../services');
const { signupValidation } = require('../../validations');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.json(await User.find());
});

userRouter.get('/me', async (req, res) => {
    const { id } = req.user;
    res.json(await userService.getUser(id));
});

userRouter.post('/', signupValidation.apiValidator, async (req, res) => {
    const user = await userService.signup(req.body.name, req.body.email, req.body.DoB, req.body.password);
    res.json(user);
});

userRouter.put('/', async (req, res) => {
    const { id } = req.user;
    const { name, email } = req.body;
    res.json(await userService.updateUser(id, name, email));
});

userRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
});

module.exports = userRouter;