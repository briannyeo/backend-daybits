//****************DEPENDENCIES***************
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const journalController = require('./controllers/journalController.js');
const usersController = require('./controllers/UsersController.js');
//const userDataController = require('./controllers/UserDataController');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT; // 2000;
const MONGODB_URI = process.env.MONGODB_URI; // "mongodb://localhost:27017/holidays";

// Error / Disconnection
mongoose.connection.on('error', (err) =>
	console.log(err.message + ' is Mongod not running?')
);
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to mongoose...');
});

//****************MIDDLEWARES***************//
app.set('trust proxy', 1); // add this line
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		// add the cookie stuff below
		cookie: {
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			secure: process.env.NODE_ENV === 'production',
		},
	})
);
// app.use(
// 	session({
// 		secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
// 		cookie: { httpOnly: false },
// 		resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
// 		saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
// 	})
// );
// server.js cors settings
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://daybits-frontend.vercel.app/daybits',
		],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);
app.use(express.json());

//****************ROUTES***************//
app.use('/daybits/journal', journalController);
app.use('/daybits/register', usersController);

app.get('/', (req, res) => {
	res.send('Hi 2');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
