const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const UserAccount = require('../models/UserAccount.js');

//Seed Accounts
const saltRounds = 10;
users.get('/seedaccount', async (req, res) => {
	try {
		await UserAccount.deleteMany({});
		await UserAccount.create([
			{
				username: 'simon',
				password: bcrypt.hashSync('12345', saltRounds),
			},
			{
				username: 'admin',
				password: bcrypt.hashSync('88888', saltRounds),
			},
		]);
		res.send('Seed');
	} catch (error) {
		console.log(error);
	}
});

//Index route. Getting the data from the front-end when user registers.
users.get('/', (req, res) => {
	UserAccount.find()
		.then((userInfo) => {
			res.json(userInfo);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Adds new users accounts to MongoDB.
users.post('/', async (req, res) => {
	//overwrite the user password with the hashed password, then pass that in to our database
	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	try {
		const createdUser = await UserAccount.create(req.body);
		console.log('created user is: ', createdUser);
		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
});

//SESSIONS
users.get('/progress', (req, res) => {
	const user = req.session.user;

	if (user) {
		res.send(user);
	} else {
		res.send('no entry');
	}
});

users.post('/home', async (req, res) => {
	const { username, password } = req.body;
	// const hashPassword = bcrypt.hashSync(password, saltRounds);
	const user = await UserAccount.findOne({ username });

	if (!user) {
		res.send('User not found');
	} else if (bcrypt.compareSync(password, user.password)) {
		req.session.user = user;
		//req.session.count = 1;
		res.send('Ok');
		console.log('Successfully authenticated');
	} else {
		res.send('No');
	}
	// res.send(user);
	//* success or failure
});

users.post('/logout', (req, res) => {
	req.session.destroy();
	res.send('logout');
});

module.exports = users;
