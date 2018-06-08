const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const db = require('./config/database.js');
const Starwars = require('./models/starwars');
const starwarsRouter = require('./route/starwars.route');
const helmet = require('helmet');
const cors = require('cors');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

// Logging
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

// TODO: Add helmet
app.use(helmet());
// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// TODO: Connect to MongoDB
mongoose.connect(db.uri, db.options)
  .then(() => { console.log('MongoDB connected.'); })
  .catch((err) => { console.error(`MongoDB error.:${err}`); });
// TODO: Enable CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200',
}));
// TODO: Use Starwars router
app.use('/', starwarsRouter);

// Start server
app.listen(port);
