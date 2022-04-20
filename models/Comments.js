const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	comment: { type: String },
	dateCommented: { type: String },
	author: { type: String }, // req.session.user(usernam??)
	journalId: { type: String },
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
