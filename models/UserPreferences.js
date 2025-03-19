const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destinations: [String],
    activities: [String],
    budget: { type: String, enum: ['low', 'medium', 'high'] },
    travelStyle: { type: String, enum: ['adventure', 'relaxation', 'cultural', 'luxury'] },
}, { timestamps: true });

module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);
