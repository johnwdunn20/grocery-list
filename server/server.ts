import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

// import controllers
import databaseController from './controllers/database';
import openAIController from './controllers/openAi';


const PORT = 3000;
const app = express();

// standard configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Testing
app.get('/', (req, res) => {
  return res.status(200).send('Test Works!')
});

// Probably need a router that routes everything to /api
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Initial Load - get all groceries
apiRouter.get('/groceries',
  databaseController.getGroceries,
  (req, res) => {
  return res.status(200).json(res.locals.groceries);
});

// Add new Item
apiRouter.post('/addItem',
  openAIController.getCategory,
  databaseController.addItem,
  (req, res) => {
    console.log(req.body.newItem);
    return res.status(200).json(res.locals.category)
  }
);

// Delete item
apiRouter.delete('/deleteItem/:id',
  databaseController.deleteItem,
  (req, res) => {
    const id = req.params.id;
    console.log('id: ', id);
    res.status(200).json(res.locals.deletedItem);
  }
);

// Toggle Checbox
apiRouter.patch('/toggleCheck/:id',
  databaseController.toggleCheck,
  (req, res) => {
    return res.status(200).json(res.locals.updatedItem);
  }
);

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