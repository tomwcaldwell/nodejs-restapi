// Will contain all of user-related routes

// const / variables
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// Messages route
router.get('/messages', (req, res) => {
    console.log('Show messages here...');
    res.end();
});

// Users route
router.get('/users', (req, res) => {

	const connection = getConnection();

	const queryString = "SELECT * FROM users";
	connection.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log('Failed to get users: ' + err);
			res.sendStatus(500);
			return
		}
		res.json(rows);
	});
});

// MySQL pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'tom',
    database: 'mysql_table'
})

// MySQL generic function
function getConnection() {
    return pool
}

// user_create route
router.post('/user_create', (req, res) => {
	console.log('Trying to create a new user...');

	const firstName = req.body.create_first_name;
	const lastName = req.body.create_last_name;

	const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
	getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
		if (err) {
			console.log('Error inserting data to database: ' + err);
			res.sendStatus(500);
			return
		}
		console.log('Inserted a new user with id: ', results.insertId);
		res.end();
	});

	res.end();
});

// user/id route
router.get('/user/:id', (req, res) => {
	console.log("Fetching user with id: " + req.params.id);

	const connection = getConnection();

	const queryString = "SELECT * FROM users WHERE id = ?";
	const userId = req.params.id;

	connection.query(queryString, [userId], (err, rows, fields) => {
		if (err) {
			console.log("Failed to return data: " + err);

			res.sendStatus(500);
			// throw err;
			// res.end();
			return
		}

		console.log("Fetched users successfully");
		const users = rows.map((row) => {
			return {firstName: row.first_name, lastName: row.last_name}
		});

		res.json(users);
	});
	//res.end();
});

module.exports = router;