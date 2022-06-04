const usersProvider = require('./userProvider');
const chatsProvider = require('./chatProvider');
const userService = require('./user.service');
const mailerService = require('./mailer.service');

module.exports = {
    usersProvider,
    chatsProvider,
    userService,
    mailerService
};