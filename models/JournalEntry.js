const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comments = require('./Comments');

const journalEntrySchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	dailyGoalAchived: { type: Boolean },
	createdAt: { type: Date },
	comments: [Comments],
	author: { type: Schema.Types.ObjectId, ref: 'UserLogin', required: true },
	likes: [{ type: Schema.Types.ObjectId, ref: 'UserLogin', required: true }],
	totalLikes: { type: Number, default: 0 },
});

//journalEntry:  [{title: 1, body: 1}, {title : 2, body:2}]
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
