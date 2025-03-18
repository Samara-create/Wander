const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('../config/passport');

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const tripRoutes = require('../routes/trip');
const matchmakingRoutes = require('../routes/matchmaking');
const messageRoutes = require('../routes/message');
const securityRoutes = require('../routes/security');
const notificationRoutes = require('../routes/notification');
const adminRoutes = require('../routes/admin');
const moderationRoutes = require('../routes/moderation');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/trip', tripRoutes);
app.use('/matchmaking', matchmakingRoutes);
app.use('/message', messageRoutes);
app.use('/security', securityRoutes);
app.use('/notification', notificationRoutes);
app.use('/admin', adminRoutes);
app.use('/moderation', moderationRoutes);

module.exports = app;
