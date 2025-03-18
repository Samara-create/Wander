const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('../config/passport');

module.exports = (app) => {
    app.use(cors());
    app.use(compression());
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
};
