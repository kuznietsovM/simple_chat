const { Schema, SchemaTypes, model, Types } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    DoB: {
        type: SchemaTypes.Date,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    verified: {
        type: SchemaTypes.Boolean,
        default: false
    },
    verifyingKey: {
        type: SchemaTypes.String,
        default: () => {
            return (new Types.ObjectId()).toString();
        }
    },
    chats: {
        type: SchemaTypes.ObjectId,
        ref: 'Chat'
    }
});

const User = model('User', UserSchema, 'users');

module.exports = User;
