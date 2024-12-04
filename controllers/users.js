const User = require("../models/user"); // import user schema
const bcrypt = require("bcrypt"); //import
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  invalidData,
  dataNotFound,
  defaultData,
  duplicateData,
  unauthorizedData,
} = require("../utils/errors");

// User Controller File
const getUsers = (req, res) => {
  User.find({}) // empty curly braces to find all users
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(defaultData).send({ message: "An error has occured" }); // send 500 error code and error message
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body; //get name avatar email and password

  //check if user exists
  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.status(duplicateData).send({ message: "User Already Exists" });
    }
    //hash password before creating a user
    bcrypt
      .hash(password, 10)
      .then((hashPassword) => {
        User.create({ name, avatar, email, password: hashPassword })
          .then((user) => {
            res.status(201).send(user);
          })
          .catch((err) => {
            console.error(err);
            if (err.name === "ValidationError") {
              return res.status(invalidData).send({ message: err.message });
            }
            return res
              .status(defaultData)
              .send({ message: "An error has occured" });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(defaultData).send({ message: "An Error Occured" });
      });
  }); //
}; //end createUser

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(dataNotFound).send({ message: err.message }); // send 404 not found
      }
      if (err.name === "CastError") {
        return res.status(invalidData).send({ message: err.message }); // send 400 bad request
      }
      return res.status(defaultData).send({ message: "An Error has occured" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredential(email, password)
    .then((user) => {
      //create a JWS token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.status(200).send({ user, token });
    })
    .catch((err) => {
      return res.status(unauthorizedData).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser, login };
