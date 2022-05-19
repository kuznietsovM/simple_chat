const config = require('config');
const mongoose = require('mongoose');

const app = require('./app/index');

const { port } = config.get('server');

mongoose.connect(config.get('db.connectionString'))
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(e => {
        console.log('Connection error: ', e);
    });
