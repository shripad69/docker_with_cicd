const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const env = require('dotenv').config()

mongoose.connect(process.env.MONGO_URL);
const userSchema = new Schema({

  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
  }

});

const todoSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  }
  
});

const userModel = new mongoose.model("users", userSchema);
const todoModel = new mongoose.model("todos", todoSchema);

module.exports =  {
    user : userModel,
    todos : todoModel
}
