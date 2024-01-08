// Copying all of models.ts here
import models from "../models/models";


// ******** Command to run: npx ts-node --transpile-only  scripts/sampleData.ts ********

// insert user data
const users = [
  {
    name: 'test',
    password: 'test12345!',
    email: 'test@gmail.com',
  },
  {
    name: 'john',
    password: 'john12345!',
    email: 'john@gmail.com',
  },
  {
    name: 'Elisabeth',
    password: 'Elisabeth12345!',
    email: 'elisabeth@gmail.com',
  },
]

const createUser = async (user) => {
  try {
    const data = await models.User.create(user)
    console.log('Created: ', data);
  } catch (err) {
    console.log('Error: ', err);
  }
}

// comment out once users are created
// for (const user of users) {
//   createUser(user);
// }

const deleteAll = async () => {
  console.log('deleting all');
  const data = await models.Grocery.deleteMany();
  console.log(data);
  const data2 = await models.Item.deleteMany();
  console.log(data2);
}
// deleteAll();

// insert category data for each user
// when I do this in the db controller, I need to ensure that I first check if the category already exists and has isHistory false. If it does, then I insert. If not, then I create the category with isHistory false and then insert the item
const newItem = async (item, category, user) => {
  console.log('New Item Invoked');
  try {
    // create the new item
    const item_data = await models.Item.create({
      itemName: item
    })
    console.log('Item created: ', item_data);
    // find the category
    const cat_data = await models.Grocery.findOne({
      category: category,
      user: user,
      isHistory: false
    })
    console.log('Category found: ', cat_data);
    // if category doesn't exist
    if (!cat_data) {
      const newCat_data = await models.Grocery.create({
        user: user,
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
    }

  } catch (err) {
    console.log('Error: ', err);
  }
}

const initialCategoriesTest = [
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
  'Other'
];

const ItemsTest_Produce = [
  'Apples',
  'Avocado',
  'Bananas',
  'Berries',
  'Squash',
  'Tomatoes',
  'Zucchini'
];


for (const prod of ItemsTest_Produce) {
  setTimeout( () => {
    newItem(prod, 'Produce', '659b830c467947c49d48d568')
  }, 1000)
}
const ItemsTest_MeatSeafood = [
  'Beef',
  'Chicken',
  'Fish',
  'Pork',
  'Shrimp'
];
/*
for (const prod of ItemsTest_MeatSeafood) {
  newItem(prod, 'Meat & Seafood', '659b830c467947c49d48d568')
}
const ItemsTest_Dairy = [
  'Butter',
  'Cheese',
  'Eggs',
  'Milk',
  'Yogurt'
];
for (const prod of ItemsTest_Dairy) {
  newItem(prod, 'Dairy', '659b830c467947c49d48d568')
}

const ItemsTest_FrozenFoods = [
  'Frozen Meals',
  'Frozen Veggies',
  'Ice Cream',
  'Pizza'
];
for (const prod of ItemsTest_FrozenFoods) {
  newItem(prod, 'Frozen Foods', '659b830c467947c49d48d568')
}

const ItemsTest_Bakery = [
  'Bread',
  'Bagels',
  'Muffins',
  'Tortillas'
];
for (const prod of ItemsTest_Bakery) {
  newItem(prod, 'Bakery', '659b830c467947c49d48d568')
}

const ItemsTest_CannedGoods = [
  'Beans',
  'Broth',
  'Soup',
  'Tomatoes',
  'Tuna'
];
for (const prod of ItemsTest_CannedGoods) {
  newItem(prod, 'Canned Goods', '659b830c467947c49d48d568')
}

const ItemsTest_DryGoods = [
  'Cereal',
  'Flour',
  'Pasta',
  'Rice',
  'Sugar'
];

for (const prod of ItemsTest_DryGoods) {
  newItem(prod, 'Dry Goods', '659b830c467947c49d48d568')
}

const ItemsTest_Snacks = [
  'Chips',
  'Cookies',
  'Crackers',
  'Granola Bars',
  'Popcorn'
];

for (const prod of ItemsTest_Snacks) {
  newItem(prod, 'Snacks', '659b830c467947c49d48d568')
}

const ItemsTest_Beverages = [
  'Coffee',
  'Juice',
  'Soda',
  'Tea',
  'Water'
];

for (const prod of ItemsTest_Beverages) {
  newItem(prod, 'Beverages', '659b830c467947c49d48d568')
}

const ItemsTest_CondimentsSauces = [
  'BBQ Sauce',
  'Ketchup',
  'Mayo',
  'Mustard',
  'Salad Dressing'
];

for (const prod of ItemsTest_CondimentsSauces) {
  newItem(prod, 'Condiments & Sauces', '659b830c467947c49d48d568')
}

const ItemsTest_CleaningSupplies = [
  'Bleach',
  'Dish Soap',
  'Laundry Detergent',
  'Paper Towels',
  'Sponges'
];
for (const prod of ItemsTest_CleaningSupplies) {
  newItem(prod, 'Cleaning Supplies', '659b830c467947c49d48d568')
}

const ItemsTest_PersonalCare = [
  'Deodorant',
  'Floss',
  'Shampoo',
  'Soap',
  'Toothpaste'
];

for (const prod of ItemsTest_PersonalCare) {
  newItem(prod, 'Personal Care', '659b830c467947c49d48d568')
}

const ItemsTest_PetSupplies = [
  'Cat Food',
  'Cat Litter',
  'Dog Food',
  'Dog Treats'
];

for (const prod of ItemsTest_PetSupplies) {
  newItem(prod, 'Pet Supplies', '659b830c467947c49d48d568')
}
*/