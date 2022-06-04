const { Schema, SchemaTypes, model } = require('mongoose');

const MessageSchema = new Schema({
    text: String,
    date: Date,
    sender: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
});

const Message = model('Message', MessageSchema, 'messages');

module.exports = Message;