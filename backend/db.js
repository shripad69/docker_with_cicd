const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://shri:Shripad%401336@cluster0.rvkqs7c.mongodb.net/todo_app"
);

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
