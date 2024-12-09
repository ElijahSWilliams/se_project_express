const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
    select: false, // this hides the password when returning data from the database
  },
});

// create custom findUserByCredential method that is attached to userSchema
userSchema.statics.findUserByCredential = function findUserByCredential(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password") // include hashed password
    .then((user) => {
      // if user not found
      if (!user) {
        return Promise.reject(new Error("Incorrect Email or Password")); // throw error
      }

      // if user is found
      return bcrypt.compare(password, user.password).then((matched) => {
        // if passwords dont match
        if (!matched) {
          return Promise.reject(new Error("Incorrect Email or Password")); // throw error
        }
        // if passwords do match
        return user; // user is available
      });
    });
};

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
