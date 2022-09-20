const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
  name : {
    type: String,
    required: [true, "Please provide a name!"],
    unique: false,
  },
  surname : {
    type: String,
    required: [true, "Please provide a surname!"],
    unique: false,
  },

});

module.exports = mongoose.model("User", UserSchema);
