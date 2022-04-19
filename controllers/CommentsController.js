const express = require('express');
const Comments = require('../models/Comments.js');

const router = express.Router();

// * Create Route - this posts the data onto the comments database
router.post('/', async (req, res) => {
	console.log(req.session.user);
	const user = req.session.user;
	console.log('body', req.body);

	//const array = [{ author: user, comment: req.body }];
	//const array1 = JSON.stringify(array);

	try {
		const newComment = await Comments.create({
			comment: JSON.stringify(req.body),
			author: JSON.stringify(user),
		});
		res.status(200).send(newComment);
		console.log(newComment);
		//mongoose.connection.close(); //close the connection so that the program will end
	} catch (error) {
		console.log(error);
	}
});

//const createdComment = await Comments.create(req.body);
// const createdComment = new Comments({ author: user, comment: req.body })
// createdComment.save();

// Comments.insertMany(array)
// 	.then(function (docs) {
// 		res.json(docs);
// 	})
// 	.catch(function (err) {
// 		res.status(400).json({ error: err.message });
// 	});

module.exports = router;
