const bcrypt = require("bcrypt"); // import
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import user schema
const { JWT_SECRET } = require("../utils/config");
const {
  invalidData,
  dataNotFound,
  defaultData,
  duplicateData,
  unauthorizedData,
  ConflictError,
  NotFoundError,
  BadRequestError,
  ServerError,
  UnauthorizedError,
} = require("../utils/errors");

// User Controller File

const createUser = (req, res, next) => {
  // add next to allow central error handling
  const { name, avatar, email, password } = req.body;

  // Check if user exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("User Already Exists");
      }

      // If new user, hash password
      return bcrypt.hash(password, 10);
    })
    .then((hashPassword) => 
      // then
      // Create user with hashed password
       User.create({ name, avatar, email, password: hashPassword }) // return User.create
    )
    .then((user) => {
      // then with the result of user.create
      // Exclude password from the response
      const { password: newPassword, ...userWithoutPassword } = user.toObject();
      res.status(201).send(userWithoutPassword); // Respond with created user
    })
    .catch((err) => {
      // Handle errors
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid Data"));
      } else {
        next(err); // Pass other errors to the centralized error handler
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id; // get user Id
  console.log(userId);

  // access user
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not Found"));
      }
      return res.status(200).send(user); // successful response
    })
    .catch((err) => {
      console.log(err.name);
      console.error(err);
      next(err); // pass error to centralized error handler
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id; // get ID

  const { name, avatar } = req.body; // destructure fields that we want to change

  const updatedInfo = {}; // empty obj to store updated info

  // make sure nothing is empty
  if (!name && !avatar) {
    return next(new BadRequestError("Please Enter a Name and Avatar Link"));
  }

  if (name) {
    // if theres a name
    updatedInfo.name = name;
  }

  if (avatar) {
    // if theres an avatar
    updatedInfo.avatar = avatar;
  }

  // update the info
  return User.findByIdAndUpdate(userId, updatedInfo, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        // if no user
        return next(new NotFoundError("user not Found"));
      }
      // return
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        // if Validation Error
        return next(new BadRequestError("Invalid Data"));
      }

      return next(new ServerError("Server Error while updating profile"));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("An Email and Password are required"));
  }

  return User.findUserByCredential(email, password)
    .then((user) => {
      // create a JWS token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token }); // success
    })
    .catch((err) => {
      if (err.message === "Incorrect Email or Password") {
        return next(new UnauthorizedError("Incorrect Email or Password"));
      }
      // Handle unexpected errors
      return next(new ServerError("An Error Occured"));
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
