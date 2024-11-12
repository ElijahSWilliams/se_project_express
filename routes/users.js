const router = require("express").Router(); //import express and express router
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers); //no '/users' because routes are cumulative; default '/users' route is in index.js
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
