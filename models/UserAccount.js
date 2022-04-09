const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAccountSchema = mongoose.Schema({
	_id: Schema.Types.ObjectId,
	username: { type: 'string', required: true },
	password: { type: 'string', required: true },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
