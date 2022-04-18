const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDataSchema = mongoose.Schema({
	username: { type: String },
	password: { type: String },
	habit: { type: String }, //type of habit
	habitstatus: { type: String }, //break or build
	goal: { type: String }, //e.g. run a marathon
	target: { type: String }, //30 mins a day
	startDate: { type: Date }, //date to start
	daysSucceeded: { type: Number }, // x out of 30days
	journals: [{ type: Schema.Types.ObjectId, ref: 'JournalEntry' }],
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
