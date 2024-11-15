const router = require("express").Router(); // import express and router
const {
  getItems,
  createItem,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems"); // extract functions from clothingItems file

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// like
router.put("/:itemId/likes", likeItem);

// Unlike
router.delete("/:itemId/likes", dislikeItem);

// Delete
router.delete("/:itemId", deleteItem);
// export router
module.exports = router;
