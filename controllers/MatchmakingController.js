const User = require("../models/User");

// Match users based on travel preferences
exports.findMatches = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user);
        if (!currentUser) return res.status(404).json({ msg: "User not found" });

        const matches = await User.find({
            "_id": { "$ne": currentUser._id }, // Exclude current user
            "travelPreferences.destinations": { "$in": currentUser.travelPreferences.destinations },
            "travelPreferences.budget": { "$gte": currentUser.travelPreferences.budget - 500, "$lte": currentUser.travelPreferences.budget + 500 }, // Budget range
            "travelPreferences.travelStyle": currentUser.travelPreferences.travelStyle,
            "travelPreferences.personalityType": { "$ne": currentUser.travelPreferences.personalityType } // Opposites attract
        });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Send Match Request
exports.sendMatchRequest = async (req, res) => {
    try {
        const { matchId } = req.body;
        const currentUser = await User.findById(req.user);
        const matchUser = await User.findById(matchId);

        if (!currentUser || !matchUser) return res.status(404).json({ msg: "User not found" });

        // Save match request (later for notifications)
        res.json({ msg: `Match request sent to ${matchUser.name}` });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
