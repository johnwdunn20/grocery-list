const models = require('../models/models.js');

const databaseController = {};

// Get all groceries and format them for the frontend
databaseController.getGroceries = (req, res, next) => {
  models.Grocery.find() // **** Will need to be updated to find the actual user's data
    .populate('category')
    .exec()
    .then(data => {
      console.log('Getting data');
      /*** Formatting data for the front end */
      // 1. Get initial formatting
      const initialFormat = [];
      data.forEach(obj => {
        const { itemName, checked, category, id } = obj;
        const categoryName = category.category;
        initialFormat.push({
          itemName,
          checked,
          categoryName,
          id
        })
      })
      // console.log(initialFormat);
      // 2. Format as an array
      const categorized = initialFormat.reduce((acc, curr) => {
        const { itemName, checked, categoryName, id } = curr;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push({ itemName, checked, id });
        return acc;
      }, {});
      // console.log(categorized);
      // Step 3: convert to an array of objects
      const outputArrOfObjs = Object.keys(categorized).map(category => ({
        category,
        items: categorized[category]
      }));

      // console.log(outputArrOfObjs);
      // Store in res.locals and call next
      res.locals.groceries = outputArrOfObjs;
      return next();
    })
    .catch(err => next({
      log: `Express error handler caught error in databaseController.getGroceries. Error: ${err}`,
      status: 500,
      message: { err },
    }));
}

databaseController.addItem = (req, res, next) => {
  const { newItem } = req.body;

  // get id of the category
  models.Category.findOne({
    category: res.locals.category
  })
    .then(data => {
      if (!data) {
        return next({
          log: `Not able to find category. LLM found ${res.locals.category} which does not exist as a standard category`,
          status: 500,
          message: { err: `Not able to find category. LLM found ${res.locals.category} which does not exist as a standard category` },
        });
      }
      console.log(data.id);
      const categoryId = data.id;

      // use that id to insert into groceries
      models.Grocery.create({
        user: '6542a7b6e06d8d00cdf55cb2', // **** hard-coding for now, will update it later
        itemName: newItem,
        category: categoryId
      })
        .then(data => {
          console.log('Inserted: ', data);
          next();
        })
    })
    .catch(err => next({
      log: `Express error handler caught error in databaseController.getGroceries. Error: ${err}`,
      status: 500,
      message: { err },
    }))


}

databaseController.deleteItem = (req, res, next) => {
  console.log('invoking deleteItem controller');
  const id = req.params.id
  console.log(id);
  models.Grocery
    .findByIdAndDelete(id)
    .exec()
    .then(data => {
      console.log('Deleted: ', data);
      res.locals.deletedItem = data;
      return next();
    })
    .catch(err => next({
      log: `Express error handler caught error in databaseController.deleteItem. Error: ${err}`,
      status: 500,
      message: { err },
    }))
}

databaseController.toggleCheck = (req, res, next) => {
  console.log('invoking toggleItem controller');
  const id = req.params.id;
  const { checked } = req.body;
  console.log(id);
  models.Grocery
    .findByIdAndUpdate(id, { checked: checked })
    .exec()
    .then(data => {
      console.log('Updated', data);
      res.locals.updatedItem = data;
      return next();
    })
    .catch(err => next({
      log: `Express error handler caught error in databaseController.toggleCheck. Error: ${err}`,
      status: 500,
      message: { err },
    }))
}

module.exports = databaseController;