const express = require('express');

const UserData = require('../models/UserData.js');
const CommunityData = require('../models/CommunityData.js');

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

//* Index Route - get data from UserData model
router.get('/', (req, res) => {
	UserData.find()
		.then((journalEntry) => {
			res.json(journalEntry);
		})
		.catch((err) => {
			res.json(err);
		});
});

//* Index Route - get data from Community Data model
router.get('/community', (req, res) => {
	CommunityData.find()
		.then((journalList) => {
			res.json(journalList);
		})
		.catch((err) => {
			res.json(err);
		});
});

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

//* Delete Route
router.delete('/:id', async (req, res) => {
	try {
		const deletedJournal = await UserData.findByIdAndRemove(req.params.id);
		res.status(200).send(deletedJournal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//*Put route - EDIT (LIKES / COMMENTS) - DOES NOT WORK YET
router.put('/:id', async (req, res) => {
	await UserData.findByIdAndUpdate(req.params.id, req.body);
	res.json({ message: 'journal likes Updated' });
});

module.exports = router;
