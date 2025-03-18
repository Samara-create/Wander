const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const socketIo = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: { origin: '*' },
        pingTimeout: 10000,
        maxHttpBufferSize: 1e6,
    });

    const pubClient = createClient();
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));

    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log(\User connected: \\);

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(\User \ joined room \\);
        });

        socket.on('sendMessage', ({ room, message }) => {
            chatNamespace.to(room).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log(\User disconnected: \\);
        });
    });

    return io;
};

module.exports = { initializeSocket };
