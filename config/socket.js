const socketIo = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });
};

module.exports = { initializeSocket };