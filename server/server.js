const path = require('path');
const express = require('express');
const PORT = 3000;
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
// standard configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Probably need a router that routes everything to /api

// Testing
app.get('/', (req, res) => {
  return res.status(200).send('Test Works!')
});



// catch-all
app.use('*', (req, res) => {
  return res.status(400).send('The page you are looking for was not found');
})

// default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = {...defaultErr, ...err};
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;