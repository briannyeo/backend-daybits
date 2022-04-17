const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDataSchema = mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'UserLogin' },
	habit: { type: String },
	habitstatus: { type: String },
	goal: { type: String },
	target: { type: String },
	startDate: { type: Date },
	daysSucceeded: { type: Number },
	dailygoal: { type: Boolean },
	title: [{ type: String }],
	body: [{ type: String }],
	journalDate: [{ type: Date }],
	likes: [{ type: String }],

	//journalLikes: { type: Schema.Types.ObjectId, ref: 'UserLogin' },
});
//journalEntry:  [{title: 1, body: 1}, {title : 2, body:2}]
const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
