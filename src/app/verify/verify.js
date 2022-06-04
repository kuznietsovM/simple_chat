const { Router } = require('express');
const { userService } = require('../../services');

const verifyRouter = Router();

verifyRouter.get('/:verifyingKey', async (req, res) =>{
    try{
        const { verifyingKey } = req.params;
        const user = await userService.verify(verifyingKey);

        console.log(user);
        res.send('Verified! Now you can login!');
    } catch (e){
        res.send(e.toString());
    }
})

module.exports = verifyRouter;