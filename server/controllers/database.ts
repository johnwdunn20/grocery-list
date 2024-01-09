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
    try {
      const { newItem } = req.body;
      const category = res.locals.category;
      const userId = res.locals.id;
      console.log('userId: ', userId);
      if (!newItem) {
        return next({
          log: `Missing newItem`,
          status: 400,
          message: { err: `Missing newItem` },
        });
      }
      if (!category) {
        return next({
          log: `Missing category`,
          status: 400,
          message: { err: `Missing category` },
        });
      }
      // create the new item
      const item_data = await models.Item.create({
        itemName: newItem
      })
      console.log('Item created: ', item_data);
      // find the category
      const cat_data = await models.Grocery.findOne({
        category: category,
        user: userId,
        isHistory: false
      })
      console.log('Category found: ', cat_data);
      // if category doesn't exist
      if (!cat_data) {
        console.log('Category does not exist');
        const newCat_data = await models.Grocery.create({
          user: userId,
          category: category,
          items: [item_data],
        });

        console.log('New category created: ', newCat_data);
      } else { // if category does exist
        // add new item
        cat_data.items.push(item_data)
    
        // save new item
        await cat_data.save()
        console.log('Item added to category');

        return next();
    }
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
