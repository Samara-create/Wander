const express = require('express');
const { findMatches } = require('../utils/matchmaking');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/find', authMiddleware, async (req, res) => {
    try {
        const matches = await findMatches(req.user.id);
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
