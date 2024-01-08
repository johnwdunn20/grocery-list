import models from "../models/models";

const databaseController = {
  // Get all groceries and format them for the frontend
  getGroceries: async (req, res, next) => {
    try {
      // get the jwt from cookies?
      const groceries = await models.Grocery.find({
        user: req.user.id,
        isHistory: false,
      }); // **** Will need to be updated to find the actual user's data
      res.locals.groceries = groceries;
      // return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.getGroceries. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  addItem: async (req, res, next) => {
    const { newItem } = req.body;
    try {
      // get the category and then push a new item into that arr
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.addItem. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  deleteItem: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await models.Item.findByIdAndDelete(id).exec();
      console.log("Deleted: ", data);
      res.locals.deletedItem = data;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.deleteItem. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  toggleCheck: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { checked } = req.body;
      const data = await models.Item.findByIdAndUpdate(id, {
        checked: checked,
      }).exec();

      console.log("Updated", data);
      res.locals.updatedItem = data;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.toggleCheck. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },
};

export default databaseController;
