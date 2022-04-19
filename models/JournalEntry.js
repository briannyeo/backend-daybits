const mongoose = require('mongoose');
const { Schema } = mongoose;

const journalEntrySchema = mongoose.Schema({
	title: { type: String },
	journalBody: { type: String },
	dailyGoalAchieved: [{ type: Boolean }],
	createdAt: { type: Date },
	//comments: [Comments],
	// likes: [{ type: Schema.Types.ObjectId, ref: 'UserData' }],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
