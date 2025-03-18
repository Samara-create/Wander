const connectedUsers = new Map();

const setupChatNamespace = (io) => {
    const chatNamespace = io.of('/chat');

    chatNamespace.on('connection', (socket) => {
        console.log(`User connected to chat namespace: ${socket.id}`);
        connectedUsers.set(socket.id, socket);
        
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        socket.on('sendMessage', ({ room, message }) => {
            chatNamespace.to(room).emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected from chat: ${socket.id}`);
            connectedUsers.delete(socket.id);
        });
    });
};

module.exports = setupChatNamespace;
