const path = require('path');
const express = require('express');
const PORT = 3000;
const app = express();
require('dotenv').config();
// standard configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Probably need a router that routes everything to /api




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