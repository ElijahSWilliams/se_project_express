const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "Avatar Link Required."],
    validate: {
      validator(value) {
        return validator.isURL(value); // Ensures the avatar is a valid URL
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "Email Required."],
    validate: {
      validator(value) {
        return validator.isEmail(value); // Ensures the email is valid
      },
      message: "You must enter a valid email",
    },
    unique: true, // Ensures the email is unique across users
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
  },
});

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
