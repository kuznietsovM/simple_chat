module.exports = {
    ...require('./default'),
    server: {
        port: process.env.PORT || 80
    },
    db: {
        connectionString: process.env.MONGO_URL
    }
};