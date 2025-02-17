const router = require("express").Router(); // import express and express router
const auth = require("../middlewares/auth");
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUserUpdates } = require("../middlewares/validation");

// protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdates, updateProfile); // authenticate '/me' and validate before updateProfile Runs

module.exports = router;
