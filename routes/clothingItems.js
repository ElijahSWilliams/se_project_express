const router = require("express").Router(); // import express and router
const verifyMiddleWare = require("../middlewares/auth");

const {
  getItems,
  createItem,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems"); // extract functions from clothingItems file

// Create
router.post("/", verifyMiddleWare, createItem);

// Read
router.get("/", verifyMiddleWare, getItems);

// like
router.put("/:itemId/likes", verifyMiddleWare, likeItem);

// Unlike
router.delete("/:itemId/likes", verifyMiddleWare, dislikeItem);

// Delete
router.delete("/:itemId", verifyMiddleWare, deleteItem);

// export router
module.exports = router;
