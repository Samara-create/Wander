const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const matchmakingRoutes = require('./routes/matchmakingRoutes');
const userRoutes = require('./routes/user'); // Updated to user.js
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Store active users
let activeUsers = new Map();

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join', (userId) => {
        activeUsers.set(userId, socket.id);
        console.log(`${userId} connected`);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        const receiverSocket = activeUsers.get(receiverId);

        if (receiverSocket) {
            io.to(receiverSocket).emit('receiveMessage', { senderId, message });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        activeUsers.forEach((value, key) => {
            if (value === socket.id) activeUsers.delete(key);
        });
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/matchmaking', matchmakingRoutes);
app.use('/api/users', userRoutes); // Updated to user.js
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));