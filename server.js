require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const journalController = require('./controllers/journalController');
const userController = require('./controllers/UsersController');

const app = express();
const PORT = process.env.PORT; // 2000;
const MONGODB_URI = process.env.MONGODB_URI; // "mongodb://localhost:27017/holidays";

// Error / Disconnection
mongoose.connection.on('error', (err) =>
	console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

//...farther down the page

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to mongoose...');
});

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/daybits/journal', journalController);
app.use('/daybits/register', userController);

app.get('/', (req, res) => {
	res.send('Hi 2');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
