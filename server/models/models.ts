import mongoose from 'mongoose';
import 'dotenv/config'
const MONGO_DB_URI = process.env.MONGO_DB_URI || '';

mongoose.connect(MONGO_DB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName: 'groceries'
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

// Item Schema
const itemSchema = new Schema({
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
})

const Item = mongoose.model('item', itemSchema)

// Grocery schema
const grocerySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User
    // **** fk
  },
  category: {
    type: String,
    required: true
  },
  items: [itemSchema],
  isHistory: {
    type: Boolean,
    default: false
  },
  historyDate: {
    type: Date,
    default: Date.now
  }
});

const Grocery = mongoose.model('grocery', grocerySchema);

export default {
  User,
  Grocery,
  Item
};