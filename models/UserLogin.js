const mongoose = require('mongoose');

const userAccountSchema = mongoose.Schema({
	//_id: Schema.Types.ObjectId,
	username: { type: 'string' },
	password: { type: 'string' },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
