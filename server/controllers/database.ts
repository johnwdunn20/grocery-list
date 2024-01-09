import models from "../models/models";
import { Request, Response, NextFunction } from "express";

const databaseController = {
  // Get all groceries and format them for the frontend
  getGroceries: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.id;

      const groceries = await models.Grocery.find({
        user: userId,
        isHistory: false,
      }); // **** Will need to be updated to find the actual user's data
      res.locals.groceries = groceries;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.getGroceries. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  addItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('add item invoked');
      const { newItem } = req.body;
      const category = res.locals.category;
      const userId = res.locals.id;
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
        user: userId,
        itemName: newItem
      })
      // find the category
      const cat_data = await models.Grocery.findOne({
        category: category,
        user: userId,
        isHistory: false
      })
      // if category doesn't exist
      if (!cat_data) {
        const newCat_data = await models.Grocery.create({
          user: userId,
          category: category,
          items: [item_data],
        });

      } else { // if category does exist
        // add new item to the array
        cat_data.items.push(item_data)
    
        // save new item
        await cat_data.save()

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

  deleteItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idToDelete = req.params.id;
      const userId = res.locals.id;
      if (!idToDelete) {
        return next({
          log: `Missing id of item to delete`,
          status: 400,
          message: { err: `Missing id of item to delete` },
        });
      }
      if (!userId) {
        return next({
          log: `Missing user id`,
          status: 400,
          message: { err: `Missing user id` },
        });
      }
      console.log("idToDelete: ", idToDelete);
      console.log("userId: ", userId);
      const deletedItem = await models.Item.findOneAndDelete({
        user: userId,
        _id: idToDelete
      }).exec();
      // console.log("Deleted: ", deletedItem);
      if (!deletedItem) {
        return next({
          log: `Item not found`,
          status: 400,
          message: { err: `Item not found` },
        });
      }
      res.locals.deletedItem = deletedItem;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.deleteItem. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  toggleCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idToToggle = req.params.id;
      const { checked } = req.body;
      const userId = res.locals.id;
      if (!idToToggle) {
        return next({
          log: `Missing id of item to delete`,
          status: 400,
          message: { err: `Missing id of item to delete` },
        });
      }
      if (!userId) {
        return next({
          log: `Missing user id`,
          status: 400,
          message: { err: `Missing user id` },
        });
      }
      // update the item
      const updatedItem = await models.Item.findOneAndUpdate({
        user: userId,
        _id: idToToggle,
      }, {
        checked: checked,
      },{
        returnDocument: 'after'
      }).exec();

      // update the item in the grocery list
      // find the grocery list

      console.log("Updated", updatedItem);
      res.locals.updatedItem = updatedItem;
      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.toggleCheck. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  clearFound: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.id;
      if (!userId) {
        return next({
          log: `Missing user id`,
          status: 400,
          message: { err: `Missing user id` },
        });
      }
      // *** this logic needs to be updated if I want to keep history
      // get all the items for that user where isHistory=false
      const groceries = await models.Grocery.find({
        user: userId,
        isHistory: false,
      });
      // iterate through the items and delete the ones that are checked
      groceries.forEach(async (grocery) => {
        grocery.items.forEach(async (item) => {
          if (item.checked) {
            await models.Item.findOneAndDelete({ _id: item._id }).exec();
          }
        });
      });
      // save the items
      groceries.forEach(async (grocery) => {
        await grocery.save();
      });

      return next();

    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.clearFound. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },

  clearAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.id;
      if (!userId) {
        return next({
          log: `Missing user id`,
          status: 400,
          message: { err: `Missing user id` },
        });
      }
      
      const updated_groceries = await models.Grocery.updateMany({
        user: userId,
        isHistory: false,
      }, {
        isHistory: true,
      }).exec();

      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.clearAll. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  }
};

export default databaseController;
