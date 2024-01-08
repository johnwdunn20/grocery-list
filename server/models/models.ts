import mongoose from 'mongoose';
import 'dotenv/config'
const MONGO_DB_URI = process.env.MONGO_DB_URI || '';


mongoose.connect(MONGO_DB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName: 'shopping_data'
  // authSource - set to my login and pw if I have connection issues
});

const Schema = mongoose.Schema;

// Users schema
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('user', usersSchema);

// Category schema
const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true
  }
});

const Category = mongoose.model('category', categorySchema);

// Grocery schema
const grocerySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User
    // **** fk
  },
  itemName: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: Category
  }
});

const Grocery = mongoose.model('grocery', grocerySchema);


// History schema
const historySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User
    // **** fk
  },
  itemName: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: Category
    // *** fk
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

const History = mongoose.model('history', historySchema);

export default {
  User,
  Category,
  Grocery,
  History,
};