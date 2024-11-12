const User = require("../models/user"); //import user schema

//User Controller File

const getUsers = (req, res) => {
  User.find({}) //empty curly braces to find all users
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message }); //send 500 error code and error message
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if ((err = "DocumentNotFoundError")) {
        return res.status(404).send({ message: err.message }); //send 404 not found
      } else if ((err = "CastError")) {
        return res.status(400).send({ message: err.message }); //send 400 bad request
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
