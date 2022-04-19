const express = require('express');

const JournalEntry = require('../models/JournalEntry.js');
const UserData = require('../models/UserData.js');

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
	UserData.find()
		.populate('journals')
		.select('-password')
		.then((journalEntry) => {
			res.json(journalEntry);
		})
		.catch((err) => {
			res.json(err);
		});
});

//* Create Route - this posts the data onto the journalEntry database
router.post('/', async (req, res) => {
	//req.session.user = user.username;
	//console.log('journal POST route', req.session.id);
	console.log('body', req.body);
	const filter = { username: req.session.user };
	const newEntry = req.body;

	try {
		// const createdJournal = await UserData.findOneAndUpdate(filter, {
		// 	$push: { journals: [newEntry] },
		// });

		const currentUser = await UserData.findOne(filter);

		const newJournalEntry = new JournalEntry(newEntry);
		newJournalEntry.save();

		currentUser.journals.push(newJournalEntry);
		currentUser.save();

		res.status(200).send('success');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}

	// ORIGINAL CODE
	//try {
	// 	const createdJournal = await JournalEntry.create(req.body);
	// 	res.status(200).send(createdJournal);
	// } catch (error) {
	// 	res.status(400).json({ error: error.message });
	// }
});

//* Delete Route
router.delete('/:id', async (req, res) => {
	//delete route needs to delete thorugh populate
	// UserData.findOne({ username: req.session.user })
	// 	.populate('journals')
	// 	.select('-password')
	// 	.then((profile) => {
	// 		res.json(profile);
	// 	})
	// 	.catch((err) => {
	// 		res.json(err);
	// 	});

	//ORIGINAL CODE
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
