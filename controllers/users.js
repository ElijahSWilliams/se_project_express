const User = require("../models/user"); // import user schema
const bcrypt = require("bcrypt"); //import
const {
  invalidData,
  dataNotFound,
  defaultData,
  duplicateData,
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

module.exports = { getUsers, createUser, getUser };
