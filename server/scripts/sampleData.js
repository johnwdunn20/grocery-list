const models = require('../models/models.js')


// ******** Script to add sample user data and items********

// delete everything in there to reset it
// models.Category.deleteMany({}).exec()
//   .then(info => {
//     console.log('Delete Succesful: ');
//     console.log(info);
//   })
//   .catch (err => {
//     console.log('Error', err);
//   })

// add myself as a sample user
// models.User.create({
//   name: 'John',
//   email: 'FakeEmail@gmail.com',
//   password: 'Test'
// })
//   .then(data => console.log('Added: ', data))
//   .catch(err => console.log('Error: ', err));

// get the userId
// models.User.findOne({name: 'John'}).exec()
//   .then(data => {
//     console.log('Full data: ', data);
//     console.log('User Id: ', data._id);
//   })
//   .catch(err => console.log('Error: ', err));

// models.User.findById('6542a7b6e06d8d00cdf55cb2').exec()
//   .then(data => {
//     console.log('Full data: ', data);
//     console.log('User Id: ', data._id);
//   })
//   .catch(err => console.log('Error: ', err));

// add initial categories
models.Grocery.create({
  user: '6542a7b6e06d8d00cdf55cb2',
  itemName: 'Milk',
  checked: false,
  category: '6541d71363cd5170e6fd96d2' // Dairy id
})
  .then(data => console.log('Added: ', data))
  .catch(err => console.log('Error: ', err));

models.Grocery.create({
  user: '6542a7b6e06d8d00cdf55cb2',
  itemName: 'Yogurt',
  checked: true,
  category: '6541d71363cd5170e6fd96d2'
})
  .then(data => console.log('Added: ', data))
  .catch(err => console.log('Error: ', err));


  models.Grocery.create({
    user: '6542a7b6e06d8d00cdf55cb2',
    itemName: '3 Apples',
    checked: true,
    category: '6541d71363cd5170e6fd96d0' // Produce
  })
    .then(data => console.log('Added: ', data))
    .catch(err => console.log('Error: ', err));

  models.Grocery.create({
    user: '6542a7b6e06d8d00cdf55cb2',
    itemName: 'Peanut Butter Pretzels',
    checked: true,
    category: '6541d71363cd5170e6fd96d7' // Snacks
  })
    .then(data => console.log('Added: ', data))
    .catch(err => console.log('Error: ', err));

    models.Grocery.create({
      user: '6542a7b6e06d8d00cdf55cb2',
      itemName: 'Ritz',
      checked: true,
      category: '6541d71363cd5170e6fd96d7' // Snacks
    })
      .then(data => console.log('Added: ', data))
      .catch(err => console.log('Error: ', err));