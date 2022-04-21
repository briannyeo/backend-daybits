const express = require('express');
const mongoose = require('mongoose');
//const Comments = require('../models/Comments');
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

//* Index Route - get data from JournalEntry model. TRYING OUT DEEP POPULATE.
// router.get('/', (req, res) => {
// 	UserData.find()
// 		.populate({
// 			path: 'journals',
// 			model: JournalEntry,
// 			populate: { model: Comments, path: 'comments' },
// 		})
// 		.select('-password')
// 		.then((journalEntry) => {
// 			res.json(journalEntry);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

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

//* Get Journal Route - get single journal from JournalEntry model for Journal Details Page
router.get('/:id', (req, res) => {
	//console.log(req.params.id);
	JournalEntry.findById(req.params.id)
		.then((journalDetails) => {
			//console.log(journalDetails);
			res.json(journalDetails);
		})
		.catch((err) => {
			res.json(err);
		});
});

//* Create Route - this posts the data onto the journalEntry database
router.post('/', async (req, res) => {
	//req.session.user = user.username;
	//console.log('journal POST route', req.session.id);
	//console.log('body', req.body);
	const filter = { username: req.session.user };
	console.log('newjournalentry', req.body);
	console.log('user', req.session.user);
	try {
		// const createdJournal = await UserData.findOneAndUpdate(filter, {
		// 	$push: { journals: [newEntry] },
		// });

		const currentUser = await UserData.findOne(filter);
		console.log('after TRY', req.body);
		const newJournalEntry = await JournalEntry.create(req.body);
		console.log(newJournalEntry);
		//newJournalEntry.save();

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

//Delete Route
// router.delete('/:id', async (req, res) => {
// delete route needs to delete thorugh populate
// UserData.findOne({ username: req.session.user })
// 	.populate('journals')
// 	.select('-password')
// 	.then((profile) => {
// 		res.json(profile);
// 	})
// 	.catch((err) =>, async (req, res) => {

//delete route needs to delete thorugh popula
//* Delete Route
router.delete('/:id', async (req, res) => {
	const filter = { username: req.session.user };
	try {
		//first remove from the userData collection
		await UserData.updateOne(
			{ filter },
			{
				$pull: {
					journals: ObjectId(req.params.id),
				},
			}
		).then(() => JournalEntry.findByIdAndDelete(req.params.id)); // To remove from the Journals collection thereafter.

		res.status(200).json({ status: 'success' });
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

module.exports = router;
