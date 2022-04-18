const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	content: { type: String, required: true },
	createdAt: { type: Date },
	author: { type: String }, // req.session.user(usernam??)
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
