const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an Username!"],
    unique: [true, "Username Exist"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", UserSchema);
