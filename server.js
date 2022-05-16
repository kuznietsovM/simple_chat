const config = require('config');

const app = require('./app/index');

const { port } = config.get('server');


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});