const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Define your auth routes here
router.post('/register', (req, res) => {
    // Registration logic
    res.send('User registered');
});

router.post('/login', (req, res) => {
    const user = { id: 1, username: 'testUser' };
    const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;