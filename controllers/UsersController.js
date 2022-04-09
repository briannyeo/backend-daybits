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

//Index route
users.get('/', (req, res) => {
	UserAccount.find()
		.then((userInfo) => {
			res.json(userInfo);
		})
		.catch((err) => {
			res.json(err);
		});
});

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

module.exports = users;
