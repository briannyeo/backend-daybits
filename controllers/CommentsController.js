const express = require('express');
const Comments = require('../models/Comments.js');

const router = express.Router();

// * Create Route - this posts the comments into the comments database
router.post('/', async (req, res) => {
	//console.log(req.session.user);
	//const user = req.session.user;
	console.log('body:', req.body);

	req.body.author = req.session.user;
	console.log('new object is this', req.body);

	try {
		const newComment = await Comments.create(req.body);
		await newComment.save();
		res.status(200).send(newComment);
		console.log('this is a new comment: ', newComment);
		//mongoose.connection.close(); //close the connection so that the program will end
	} catch (error) {
		console.log(error);
	}
});

// * Get Route - this gets all the comments of a particular journal entry from the comments database
router.get('/:id', (req, res) => {
	console.log('this is journalId', req.params.id);
	Comments.find({ journalId: `${req.params.id}` })
		.then((comments) => {
			res.json(comments);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
