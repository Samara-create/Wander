const express = require('express');
const router = express.Router();

// Define your matchmaking routes here
router.get('/', (req, res) => {
    res.send('Matchmaking route');
});

module.exports = router;