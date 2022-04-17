const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const UserData = require('../models UserData.js');

//Seed Accounts
const saltRounds = 10;
users.get('/seedaccount', async (req, res) => {
	try {
		await UserData.deleteMany({});
		await UserData.create([
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
	UserData.find()
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
		const createdUser = await UserData.create(req.body);
		console.log('created user is: ', createdUser);
		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
});

//get data from frontend - profile - FIND AND UPDATE (ADD EDIT ROUTE)
users.get('/profile', (req, res) => {
	UserData.find()
		.sort({ _id: -1 })
		.limit(1) //find most recent addition
		.then((userInfo) => {
			res.json(userInfo);
		})
		.catch((err) => {
			res.json(err);
		});
});

//create - profile
users.post('/profile', async (req, res) => {
	try {
		const createdProfile = await UserData.create(req.body);
		res.status(200).send(createdProfile);
	} catch (error) {
		res.status(400).json({ error: error.message });
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
	const user = await UserData.findOne({ username });

	if (!user) {
		res.json({ status: 'error' });
	} else if (bcrypt.compareSync(password, user.password)) {
		req.session.user = user.username;
		req.session.userId = user._id;
		console.log(req.session);
		//req.session.count = 1;
		//user: req.session.user
		res.json({ status: 'success' });
		console.log('Successfully authenticated');
	} else {
		res.json({ status: 'failed' });
	}
	// res.send(user);
	//* success or failure
});

users.post('/logout', (req, res) => {
	req.session.destroy();
	res.json({ status: 'success' });
});

module.exports = users;
