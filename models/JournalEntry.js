const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalEntrySchema = mongoose.Schema({
	title: { type: String },
	journalBody: { type: String },
	dailyGoalAchived: { type: Boolean },
	createdAt: { type: Date },
	//comments: [Comments],
	author: { type: Schema.Types.ObjectId, ref: 'UserData' },
	likes: [{ type: Schema.Types.ObjectId, ref: 'UserData' }],
	totalLikes: { type: Number, default: 0 },
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
