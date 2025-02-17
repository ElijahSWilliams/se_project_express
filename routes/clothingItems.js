const router = require("express").Router(); // import express and router
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems"); // extract functions from clothingItems file
const { validateID } = require("../middlewares/validation");

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// like
router.put("/:itemId/likes", auth, validateID, likeItem); //auth then validate item before liking

// Unlike
router.delete("/:itemId/likes", auth, validateID, dislikeItem); //auth then validate item before disliking

// Delete
router.delete("/:itemId", auth, validateID, deleteItem); //auth then validate before deleting

// export router
module.exports = router;
