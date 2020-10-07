const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'olatunji',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	db.select('*').from('users')
	 .then(response => {
	 	res.json(response)
	 })
	 .catch(err => {
	 	res.status(400).json('error loading users')
	 })
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(3000, () => {
	console.log("App is running on port 3000");
});



// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

