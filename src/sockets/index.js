const { Server } = require('socket.io');
const config = require('config');
const { onUpdate } = require('./message');

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('join', chat_id =>{
        socket.join(chat_id);
    });

    socket.on('onUpdate:client', async (payload) => {
        console.log('payload: ', payload);
        const message = await onUpdate(payload);

        io.to(payload.chat_id).emit('onUpdate:server', message);
    });
});

const init = (server) => {
    io.listen(server);
};

module.exports = {
    init,
    io
};