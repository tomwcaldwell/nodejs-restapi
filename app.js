// load our app server using express...
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('short'));

app.use(express.static('./public'));

app.get('/', (req, res) => {
	console.log('Hello, responding to request.');
	res.send('Hello 3003');
});

const router = require('./routes/user.js');
app.use(router);




// localhost:3003
app.listen(3003, () => {
	console.log('Server is up and running on port 3003');
});