const router = require("express").Router(); // import express and express router
const verifyMiddleWare = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");

//protected routes
router.get("/", verifyMiddleWare, getUsers); //this route now requires authorization
router.get("/:id", verifyMiddleWare, getUser); //requires protection
router.post("/", verifyMiddleWare, createUser); //requires protection
router.get("/me", verifyMiddleWare, getCurrentUser);
router.patch("/me", verifyMiddleWare, updateProfile);

module.exports = router;
