const router = require("express").Router(); // import express and express router
const auth = require("../middlewares/auth");
const { getCurrentUser, updateProfile } = require("../controllers/users");

// protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
