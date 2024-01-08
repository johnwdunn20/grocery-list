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
for (const user of users) {
  createUser(user);
}

// insert category data for each user
// when I do this in the db controller, I need to ensure that I first check if the category already exists and has isHistory false. If it does, then I insert. If not, then I create the category with isHistory false and then insert the item
const newItem = async (item, category, user) => {
  try {
    const category = await Grocery.find({
      category: category,
      user: user,
    })
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
const ItemsTest_MeatSeafood = [
  'Beef',
  'Chicken',
  'Fish',
  'Pork',
  'Shrimp'
];
const ItemsTest_Dairy = [
  'Butter',
  'Cheese',
  'Eggs',
  'Milk',
  'Yogurt'
];
const ItemsTest_FrozenFoods = [
  'Frozen Meals',
  'Frozen Veggies',
  'Ice Cream',
  'Pizza'
];
const ItemsTest_Bakery = [
  'Bread',
  'Bagels',
  'Muffins',
  'Tortillas'
];
const ItemsTest_CannedGoods = [
  'Beans',
  'Broth',
  'Soup',
  'Tomatoes',
  'Tuna'
];
const ItemsTest_DryGoods = [
  'Cereal',
  'Flour',
  'Pasta',
  'Rice',
  'Sugar'
];
const ItemsTest_Snacks = [
  'Chips',
  'Cookies',
  'Crackers',
  'Granola Bars',
  'Popcorn'
];
const ItemsTest_Beverages = [
  'Coffee',
  'Juice',
  'Soda',
  'Tea',
  'Water'
];
const ItemsTest_CondimentsSauces = [
  'BBQ Sauce',
  'Ketchup',
  'Mayo',
  'Mustard',
  'Salad Dressing'
];
const ItemsTest_CleaningSupplies = [
  'Bleach',
  'Dish Soap',
  'Laundry Detergent',
  'Paper Towels',
  'Sponges'
];
const ItemsTest_PersonalCare = [
  'Deodorant',
  'Floss',
  'Shampoo',
  'Soap',
  'Toothpaste'
];
const ItemsTest_PetSupplies = [
  'Cat Food',
  'Cat Litter',
  'Dog Food',
  'Dog Treats'
];
const ItemsTest_Alcohol = [
  'Beer',
  'Liquor',
  'Wine'
];
const ItemsTest_HealthWellness = [
  'Allergy Medicine',
  'First Aid',
  'Pain Reliever',
  'Vitamins'
];
const ItemsTest_InternationalFoods = [
  'Asian',
  'Hispanic',
  'Indian',
  'Italian'
];
const ItemsTest_OfficeSchoolSupplies = [
  'Notebooks',
  'Pens',
  'Printer Paper',
  'Printer Ink'
];
const ItemsTest_Other = [
  'Batteries',
  'Light Bulbs',
  'Trash Bags'
];
