const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = mongoose.Schema({
	content: { type: String, required: true },
	createdAt: { type: Date },
	author: { type: Schema.Types.ObjectId, ref: 'UserData', required: true },
	journalId: {
		type: Schema.Types.ObjectId,
		ref: 'JournalEntry',
		required: true,
	},
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
