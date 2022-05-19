const { Schema, SchemaTypes, model } = require('mongoose');

const UserSchema = new Schema({
    email: String,
    name: String,
    DoB: Date,
    password: SchemaTypes.String,
});

const User = model('User', UserSchema, 'users');

module.exports = User;
