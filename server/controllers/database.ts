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

  // add a new item
  addItem: (req, res, next) => {
    const { newItem } = req.body;

    // get id of the category
    models.Category.findOne({
      category: res.locals.category,
    })
      .then((data) => {
        if (!data) {
          return next({
            log: `Not able to find category. LLM found ${res.locals.category} which does not exist as a standard category`,
            status: 500,
            message: {
              err: `Not able to find category. LLM found ${res.locals.category} which does not exist as a standard category`,
            },
          });
        }
        console.log(data.id);
        const categoryId = data.id;

        // use that id to insert into groceries
        models.Grocery.create({
          user: "6542a7b6e06d8d00cdf55cb2", // **** hard-coding for now, will update it later
          itemName: newItem,
          category: categoryId,
        }).then((data) => {
          console.log("Inserted: ", data);
          next();
        });
      })
      .catch((err) =>
        next({
          log: `Express error handler caught error in databaseController.getGroceries. Error: ${err}`,
          status: 500,
          message: { err },
        })
      );
  },

  deleteItem: async (req, res, next) => {
    console.log("invoking deleteItem controller");
    const id = req.params.id;
    console.log(id);
    models.Grocery.findByIdAndDelete(id)
      .exec()
      .then((data) => {
        console.log("Deleted: ", data);
        res.locals.deletedItem = data;
        return next();
      })
      .catch((err) =>
        next({
          log: `Express error handler caught error in databaseController.deleteItem. Error: ${err}`,
          status: 500,
          message: { err },
        })
      );
  },

  toggleCheck: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { checked } = req.body;
      const data = await models.Grocery.findByIdAndUpdate(id, {
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
