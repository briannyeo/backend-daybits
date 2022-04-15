const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = mongoose.Schema({
	journalTitle: { type: Schema.Types.ObjectId, ref: 'UserData' },
	commenterUserId: { type: String, required: true },
	commenterComment: { type: String, required: true },
	commenterDate: { type: Date, required: true },
	likes: { type: Number, default: 0 },
});

const CommunityData = mongoose.model('CommunityData', communitySchema);

module.exports = CommunityData;
