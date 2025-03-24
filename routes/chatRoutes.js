const express = require('express');
const router = express.Router();

// Define your chat routes here
router.get('/', (req, res) => {
    res.send('Chat route');
});

module.exports = router;