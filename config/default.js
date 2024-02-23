module.exports = {
    server: {
        port: 3000,
    },
    socket : {
        port: 3001,
        host: 'ws://localhost:3001'
    },
    jwt : {
        secret : 'jwtsecretkey'
    },
    db: {
        connectionString: 'mongodb://db:27017/hillelChat'
    },
    sessionSecret: 'oewhg3o9893hbleb'
};