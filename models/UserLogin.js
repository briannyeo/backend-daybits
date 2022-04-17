const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
	//_id: Schema.Types.ObjectId,
	username: { type: 'string' },
	password: { type: 'string' },
});

const UserLogin = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLogin;
