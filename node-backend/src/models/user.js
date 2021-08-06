const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  dni: String,
});

const User = mongoose.model("usres", userSchema);

module.exports = User;
