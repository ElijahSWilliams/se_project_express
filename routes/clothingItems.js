const router = require("express").Router(); // import express and router
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems"); // extract functions from clothingItems file

// Create
router.post("/", auth, createItem);

// Read
router.get("/", auth, getItems);

// like
router.put("/:itemId/likes", auth, likeItem);

// Unlike
router.delete("/:itemId/likes", auth, dislikeItem);

// Delete
router.delete("/:itemId", auth, deleteItem);

// export router
module.exports = router;
