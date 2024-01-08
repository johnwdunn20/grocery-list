const OpenAI = require("openai");

const openAIController = {};
// this brings in env to add to the environment variables
require('dotenv').config();
const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: API_KEY });
const systemPrompt = `You are a helpful assistant organizing a grocery list. You will categorize each item you are given into one of the below grocery store categories. Below each category (denoted as an H1 Heading) are examples of the types of items that would go in the section. When you give an answer, only state the word or words of the category that the item should go into. Do not respond with any punctuation that is outside the category. Keep brand names in mind. For example, "ritz" is a type of cracker. If an item does not go into a more specific category, place it in "Other"

# Produce
- Fruit
- Vegetables
- Cucumber
- Strawberries

#Meat & Seafood
- Chicken Breast
- Salmon
- Sausage

#Dairy
- Milk
- Cheese
- Yogurt
- Eggs

# Frozen Foods

Frozen vegetables
- Frozen fruits
- Frozen pizzas
- Ice cream

# Bakery
- Bread
- Cakes
- Pastries

# Canned Goods
- Soups
- Beans

# Dry Goods
- Pasta
- Rice
- Flour
- Sugar

# Snacks
- Chips
- Popcorn
- Pretzels

# Beverages
- Soft drinks
- Juices
- Coffee
- Tea

# Condiments & Sauces
- Ketchup
- Mayonnaise
- Mustard
- Salad dressings

# Cleaning Supplies
- Dish soap
- All-purpose cleaner
- Laundry detergent

# Personal Care
- Shampoo
- Soap
- Toothpaste

# Pet Supplies
- Dog food
- Cat food
- Pet toys

# Alcohol
- Beer
- Wine
- White Claw

# Health & Wellness
- Over-the-counter medications
- Vitamins
- First aid

# International Foods
- Ethnic spices
- Specialty foods

# Office & School Supplies
- Pens
- Notebooks
- Stationery

#Other
`;

openAIController.getCategory = async (req, res, next) => {
  const openai = new OpenAI({ apiKey: API_KEY });
  const { newItem } = req.body;
  console.log('newItem: ', newItem);
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: newItem }
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion);
  console.log(completion.choices[0]);
  console.log(completion.choices[0].message.content);
  res.locals.category = completion.choices[0].message.content;
  // **** Need to handle for errors. check the status I get back
  next();
}

// openAIController.getCategory({body: {newItem: 'chicken'}});

export default openAIController;