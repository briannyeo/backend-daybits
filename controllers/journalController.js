const express = require('express');

const JournalEntry = require('../models/JournalEntry.js');

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

//* Index Route - get data from JournalEntry model
router.get('/', (req, res) => {
	JournalEntry.find()
		.then((journalEntry) => {
			res.json(journalEntry);
		})
		.catch((err) => {
			res.json(err);
		});
});

//* Create Route - this posts the data onto the /journal page
router.post('/', async (req, res) => {
	//req.session.user = user.username;
	try {
		console.log('from journalcontroller', req.body);
		const createdJournal = await JournalEntry.create(req.body);
		res.status(200).send(createdJournal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//* Delete Route
router.delete('/:id', async (req, res) => {
	try {
		const deletedJournal = await JournalEntry.findByIdAndRemove(req.params.id);
		res.status(200).send(deletedJournal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//*Put route - EDIT (LIKES / COMMENTS) - DOES NOT WORK YET
// router.put('/:id', async (req, res) => {
// 	await UserData.findByIdAndUpdate(req.params.id, req.body);
// 	res.json({ message: 'journal likes Updated' });
// });

//TRYING POPULATE
// router.post('/test', async (req, res) => {
// 	try {
// 		UserData.findOne({ title: 'grdg' })
// 			.populate('community')
// 			.exec(function (err, UserData) {
// 				UserData.community.likes = 2;
// 			});
// 	} catch (error) {
// 		console.log(error);
// 	}
// 	res.send('success');
// });

module.exports = router;
