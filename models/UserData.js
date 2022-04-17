const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
	username: { type: 'string' },
	password: { type: 'string' },
	habit: { type: String }, //type of habit
	habitstatus: { type: String }, //break or build
	goal: { type: String }, //e.g. run a marathon
	target: { type: String }, //30 mins a day
	startDate: { type: Date }, //date to start
	daysSucceeded: { type: Number }, // x out of 30days

	//journalLikes: { type: Schema.Types.ObjectId, ref: 'UserData' },
});
//journalEntry:  [{title: 1, body: 1}, {title : 2, body:2}]
const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
