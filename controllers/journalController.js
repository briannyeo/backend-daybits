const express = require('express');
const mongoose = require('mongoose');

const JournalEntry = require('../models/JournalEntry.js');
const UserData = require('../models/UserData.js');
const ObjectId = mongoose.Types.ObjectId;

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

	// 	const filter = { username: req.session.user };
	// 	const newEntry = req.body;

	// try {

	// 	const currentUser = await UserData.findOne(filter);

	// 	const currentEntry = await JournalEntry.findById(req.params.id);

	// 	//const newJournalEntry = new JournalEntry(newEntry);
	// 	newJournalEntry.save();

	// 	currentUser.journals.push(newJournalEntry);
	// 	currentUser.save();

	// 	res.status(200).send('success');
	// } catch (error) {
	// 	res.status(400).json({ error: error.message });
	// }
	//journals: { _id: req.params.id },

	console.log(req.params.id);
	console.log('user', req.session.user);
	const deletedDAta = await UserData.updateOne(
		{ username: req.session.user },
		{
			$pull: {
				journals: ObjectId(req.params.id),
			},
		}
	).exec();
	console.log(deletedDAta);
	res.status(200).json({ status: 'success' });

	//ORIGINAL CODE
	// try {
	// 	const deletedJournal = await JournalEntry.findByIdAndRemove(req.params.id);
	// 	res.status(200).send(deletedJournal);
	// } catch (error) {
	// 	res.status(400).json({ error: error.message });
	// }
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
