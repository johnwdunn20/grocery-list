const models = require('../models/models.js')

console.log(models);


// ******** Script to add preliminary data to Categories ********

// declare initial categories
const initialCategories = [
  'Produce',
  'Meat & Seafood',
  'Dairy',
  'Frozen Foods',
  'Bakery',
  'Canned Goods',
  'Dry Goods',
  'Snacks',
  'Beverages',
  'Condiments & Sauces',
  'Cleaning Supplies',
  'Personal Care',
  'Pet Supplies',
  'Alcohol',
  'Health & Wellness',
  'International Foods',
  'Office & School Supplies',
]
// delete everything in there to reset it
// models.Category.deleteMany({}).exec()
//   .then(info => {
//     console.log('Delete Succesful: ');
//     console.log(info);
//   })
//   .catch (err => {
//     console.log('Error', err);
//   })


// iterate through initial categories array and add all of them
initialCategories.forEach( cat => {
  models.Category.create({category: cat})
    .then(data => {
      console.log('Created: ', data);
    })
    .catch(err => {
      console.log('Error: ', err);
    })
})