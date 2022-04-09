const express = require('express');

const UserData = require('../models/UserData.js');
// const UserAccount = require('../models/UserAccount.js');
// const CommunityData = require('../models/CommunityData.js');
const router = express.Router();

router.get('/seedjournal', async (req, res) => {
	const journal = [
		{
			title: 'title1',
			body: 'body1',
			user: 'user1',
		},
		{
			title: 'title2',
			body: 'body2',
			user: 'user2',
		},
	];
	await journal.deleteMany({});
	await journal.insertMany(journal);
	res.json(journal);
});

//* Index Route - this gets the data from the form
router.get('/', (req, res) => {
	UserData.find()
		.then((journalEntry) => {
			res.json(journalEntry);
		})
		.catch((err) => {
			res.json(err);
		});
});

// router.get('/', (req, res) => {
// 	UserData.find()
// 		.then((journalEntry) => {
// 			res.json(journalEntry);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

//* Create Route - this posts the data onto the /api/holidays page
router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		const createdJournal = await UserData.create(req.body);
		res.status(200).send(createdJournal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//* Delete Route - DOESNT WORK
// router.delete('/:id', async (req, res) => {
// 	try {
// 		console.log('deleting');
// 		const deletedHoliday = await Holiday.findByIdAndRemove(req.params.id);
// 		res.status(200).send(deletedHoliday);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// });

//*Put route
// router.put('/:id', async (req, res) => {
// 	await Holiday.findByIdAndUpdate(req.params.id, req.body);
// 	res.json({ message: 'Holiday Updated' });
// });

module.exports = router;
