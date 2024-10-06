const mongoose = require("mongoose");

const mongooseString =
  "mongodb+srv://postmanapicheck:mongodbpassword@cluster0.gpwms9i.mongodb.net/Todos_DB";

mongoose.connect(mongooseString);

const tableSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todoModel = mongoose.model("todos_table", tableSchema);
module.exports = { todoModel };
