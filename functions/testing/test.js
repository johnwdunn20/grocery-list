const models = require('../models/models.js')

// I think it's easier to format the data on the backend and then send it to the front-end nice and clear. This way I just get the category name on the frontend

models.Grocery.find()
  .populate('category')
  .exec()
    .then(data => {
      console.log('Go');

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
      // Step 3: convert to an object
      const output = Object.keys(categorized).map(category => ({
        category,
        items: categorized[category]
      }));
      
      // console.log(output);
      // Store in res.locals
    })
    .catch(err => console.log(err));


// async function getAndFormatGroceries() {
//   try {
//     const groceries = await models.Grocery.find()
//     .populate('category')
//     .exec();

//     console.log(groceries);
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

// input: array of objs
// output: array of categories
const sampleOutput = [
  {
    category: 'Dairy',
    items: [ 
      {
        itemName: 'Milk',
        checked: false,
      },
      {
        itemName: 'Yogurt',
        checked: true,
      }
    ]
  },
  {
    category: 'Produce',
    items: [
      {
        itemName: '3 Apples',
        checked: false,
      }
    ]
  },
  {
    category: 'Snacks',
    items: [
      {
        itemName: 'Peanut Butter Pretzels',
        checked: true,
      },
      {
        itemName: 'Ritz',
        checked: true,
      }
    ]
  }
]

const groceries = [{
  "itemName": "Milk",
  "checked": false,
  "category": "Dairy"
},
{
  "itemName": "Yogurt",
  "checked": true,
  "category": "Dairy"
},
{
  "itemName": "3 Apples",
  "checked": true,
  "category": "Produce"
},
{
  "itemName": "Peanut Butter Pretzels",
  "checked": true,
  "category": "Snacks"
},
{
  "itemName": "Ritz",
  "checked": true,
  "category": "Snacks"
}]

