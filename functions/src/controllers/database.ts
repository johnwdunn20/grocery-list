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
        itemName: newItem,
      });
      // find the category
      const cat_data = await models.Grocery.findOne({
        category: category,
        user: userId,
        isHistory: false,
      });
      // if category doesn't exist
      if (!cat_data) {
        const newCat_data = await models.Grocery.create({
          user: userId,
          category: category,
          items: [item_data],
        });
      } else {
        // if category does exist
        // add new item to the array
        cat_data.items.push(item_data);

        // save new item
        await cat_data.save();
      }
      // return next
      return next();
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
      const { id, categoryId } = req.body;
      const userId = res.locals.id;
      if (!id) {
        return next({
          log: `Missing id of item to delete`,
          status: 400,
          message: { err: `Missing id of item to delete` },
        });
      }
      if (!categoryId) {
        return next({
          log: `Missing categoryId`,
          status: 400,
          message: { err: `Missing categoryId` },
        });
      }
      if (!userId) {
        return next({
          log: `Missing user id`,
          status: 400,
          message: { err: `Missing user id` },
        });
      }
      // console.log("idToDelete: ", id);
      // console.log("userId: ", userId);
      // delete the item
      const deletedItem = await models.Item.findOneAndDelete({
        user: userId,
        _id: id,
      }).exec();

      // delete item from grocery list
      const updated_grocery = await models.Grocery.findOneAndUpdate(
        {
          user: userId,
          _id: categoryId,
        },
        {
          $pull: { items: { _id: id } },
        },
        {
          returnDocument: "after",
        }
      ).exec();

      // if no items left, delete the grocery list
      if (updated_grocery && updated_grocery.items.length === 0) {
        await models.Grocery.findOneAndDelete({
          user: userId,
          _id: categoryId,
        }).exec();
      }

      // console.log("Updated grocery: ", updated_grocery);

      if (!deletedItem || !updated_grocery) {
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
      const { id, categoryId, checked } = req.body;
      const userId = res.locals.id;
      if (!id) {
        return next({
          log: `Missing id of item to delete`,
          status: 400,
          message: { err: `Missing id of item to delete` },
        });
      }
      if (!categoryId) {
        return next({
          log: `Missing categoryId`,
          status: 400,
          message: { err: `Missing categoryId` },
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
      const updatedItem = await models.Item.findOneAndUpdate(
        {
          user: userId,
          _id: id,
        },
        {
          checked: checked,
        },
        {
          returnDocument: "after",
        }
      ).exec();

      // update the item in the grocery list
      const updated_grocery = await models.Grocery.findOneAndUpdate(
        {
          user: userId,
          _id: categoryId,
          "items._id": id,
        },
        {
          $set: { "items.$.checked": checked },
        },
        {
          returnDocument: "after",
        }
      ).exec();

      // console.log("Updated", updatedItem);
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
      // delete all items that are checked
      const deletedItems = await models.Item.deleteMany({
        user: userId,
        checked: true,
      }).exec();

      // delete all items in grocery list that are checked
      const updated_groceries = await models.Grocery.updateMany(
        {
          user: userId,
          isHistory: false,
        },
        {
          $pull: { items: { checked: true } },
        }
      ).exec();

      // delete all grocery lists that are empty
      await models.Grocery.deleteMany({
        user: userId,
        isHistory: false,
        items: [],
      }).exec();

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

      const updated_groceries = await models.Grocery.updateMany(
        {
          user: userId,
          isHistory: false,
        },
        {
          isHistory: true,
        }
      ).exec();

      return next();
    } catch (err) {
      return next({
        log: `Express error handler caught error in databaseController.clearAll. Error: ${err}`,
        status: 500,
        message: { err },
      });
    }
  },
};

export default databaseController;
