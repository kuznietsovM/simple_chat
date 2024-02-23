module.exports = {
    ...require('./default'),
    server: {
        port: process.env.PORT || 80
    },
    socket : {
        port: process.env.PORT || 81,
        host: 'ws://hillel-chat.herokuapp.com'
    },
    db: {
        connectionString: process.env.MONGO_URL
    }
};