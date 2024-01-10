import path from 'path';
import express, { Express, Request, Response, NextFunction,} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import controllers
import databaseController from './controllers/database';
import authController from './controllers/auth';
import openAIController from './controllers/openAi';


const PORT = 3000;
const app: Express = express();

// standard configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:8080', // ** probably need to update this
  credentials: true,
}));

// Router so all requests go to /api
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Initial Load - get all groceries
apiRouter.get('/groceries',
  authController.isLoggedIn,
  databaseController.getGroceries,
  (req: Request, res: Response) => {
  return res.status(200).json(res.locals.groceries);
});

// Add new Item
apiRouter.post('/addItem',
  openAIController.getCategory,
  authController.isLoggedIn,
  databaseController.addItem,
  (req: Request, res: Response) => {
    console.log(req.body.newItem);
    return res.status(200).json(res.locals.category)
  }
);

// Get Category (when not logged in)
apiRouter.post('/category',
  openAIController.getCategory,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.category);
  }
);

// Delete item
apiRouter.delete('/deleteItem',
  authController.isLoggedIn,
  databaseController.deleteItem,
  (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('id: ', id);
    res.status(200).json(res.locals.deletedItem);
  }
);

// Toggle Checbox
apiRouter.patch('/toggleCheck',
  authController.isLoggedIn,
  databaseController.toggleCheck,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.updatedItem);
  }
);

// Clear Found Items
apiRouter.post('/clearFound',
  authController.isLoggedIn,
  databaseController.clearFound,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);

// Clear All Items
apiRouter.post('/clearAll',
  authController.isLoggedIn,
  databaseController.clearAll,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);

// Login
apiRouter.post('/login',
  authController.login,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.id);
  }
);

// Signup
apiRouter.post('/signup',
  authController.signup,
  (req, res) => {
    return res.status(200).json(res.locals.id);
  }
);

// Logout
apiRouter.post('/logout',
  authController.logout,
  (req: Request, res: Response) => {
    return res.status(200).send('Logged out');
  }
);

// isLoggedIn - sends response if user is logged in
apiRouter.get('/isLoggedIn',
  authController.isLoggedIn,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.id);
  }
);

// catch-all
app.use('*', (req: Request, res: Response) => {
  return res.status(400).send('The page you are looking for was not found');
})

// default error handler
type Error = {
  log: string,
  status: number,
  message: { err: string },
}
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: Error = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: Error = {...defaultErr, ...err};
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;