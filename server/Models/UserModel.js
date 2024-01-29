const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Your last name  is required"],
  },
  email: {
    type: String,
    required: [true, "Your email is required!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Your password is required"],
  },
});

//create a user table or collection if there is no table with that name already
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
