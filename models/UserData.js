const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDataSchema = mongoose.Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
	habit: { type: String, required: true },
	goal: { type: String, required: true },
	startDate: { type: Date, required: true },
	targetPerDay: { type: String, required: true },
	daysSucceeded: [{ type: Boolean }],
	journalTitle: { type: String, required: true },
	journalEntry: { type: String, required: true },
	journalDate: { type: Date, required: true },

	//journalLikes: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
