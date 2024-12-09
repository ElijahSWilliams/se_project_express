const router = require("express").Router(); // import express and express router
const auth = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");

// protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
