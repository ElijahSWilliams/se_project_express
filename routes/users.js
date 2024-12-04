const router = require("express").Router(); // import express and express router
const { verifyMiddleWare } = require("../middlewares/auth");
const { getUsers, createUser, getUser } = require("../controllers/users");

//protected routes
router.get("/", verifyMiddleWare, getUsers); //this route now requires authorization
router.get("/:id", verifyMiddleWare, getUser); //requires protection
router.post("/", verifyMiddleWare, createUser); //requires protection
router.get("/users/me");

module.exports = router;
