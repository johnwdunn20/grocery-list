const models = require('../models/models.js');

const databaseController = {};

// Get all groceries and format them for the frontend
databaseController.getGroceries = (req, res, next) => {
  models.Grocery.find()
  .populate('category')
  .exec()
    .then(data => {
      /*** Formatting data for the front end */
      // 1. Get initial formatting
      const initialFormat = [];
      data.forEach( obj => {
        const {itemName, checked, category} = obj;
        const categoryName = category.category;
        initialFormat.push({
          itemName,
          checked,
          categoryName
        })
      })
      // console.log(initialFormat);
      // 2. Format as an array
      const categorized = initialFormat.reduce((acc, curr) => {
        const { itemName, checked, categoryName } = curr;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push({ itemName, checked });
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

module.exports = databaseController;