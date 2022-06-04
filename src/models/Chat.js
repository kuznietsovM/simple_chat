const { Schema, SchemaTypes, model } = require('mongoose');

const ChatSchema = new Schema({
    user_id1: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    user_id2: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    }
});

const Chat = model('Chat', ChatSchema, 'chats');

module.exports = Chat;