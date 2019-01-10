// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const homeRoute = require('./api/routes/homeRoute');
const postsRoute = require('./api/routes/postsRoute');
const commentsRoute = require('./api/routes/commentsRoute');

// Load dotenv variables
dotenv.load();

// Define PORT
const PORT = process.env.PORT || 2308;

// Connect to Database
mongoose.connect('mongodb://Test123:Test123@ds145299.mlab.com:45299/dbtest123', { useNewUrlParser: true });

// Use body parser to parse post requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Logger middleware
app.use(logger('dev'));

// Use Routes
app.use('/', homeRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentsRoute);

// Listen for HTTP Requests
app.listen(PORT, () => {
  console.log('Server running is port ' + PORT);
});
