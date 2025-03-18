const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const setupRedisAdapter = require('./config/redis');
const admin = require('./config/firebase');
const setupChatNamespace = require('./sockets/chat');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const { PORT } = require('./config/env');

// Initialize Express
const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

// Middleware
applyMiddleware(app);

// Initialize Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: '*' },
    pingTimeout: 10000,
    maxHttpBufferSize: 1e6,
});

// Setup Redis Adapter for Socket.IO
setupRedisAdapter(io);

// Setup Chat Namespace
setupChatNamespace(io);

// Routes
app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/trip', routes.trip);
app.use('/matchmaking', routes.matchmaking);
app.use('/message', routes.message);
app.use('/security', routes.security);
app.use('/notification', routes.notification);
app.use('/admin', routes.admin);
app.use('/moderation', routes.moderation);

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
