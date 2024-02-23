const { Schema, SchemaTypes, model } = require('mongoose');

const MessageSchema = new Schema({
    text: String,
    date: {
        type: Date, 
        default: Date.now
    },
    sender: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    chat_id: SchemaTypes.ObjectId
});

const Message = model('Message', MessageSchema, 'messages');

module.exports = Message;