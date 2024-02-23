const { Chat, Message } = require('../models')

const onUpdate = async ({ chat_id, sender, content }) => {
    const message = new Message ({
        sender:sender,
        text:content,
        chat_id:chat_id
    });
    await message.save();
    return message;
 };

module.exports = {
    onUpdate
};
