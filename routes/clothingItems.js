const router = require("express").Router(); //import express and router
const {
  getItems,
  createItem,
  updateItem,
  likeItem,
  deleteItem,
  dislikeItem,
} = require("../controllers/clothingItems"); //extract functions from clothingItems file

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/:itemId", updateItem);

//like
router.put("/:itemId/likes", likeItem);

//Unlike
router.put("/:itemId/likes", dislikeItem);

//Delete
router.delete("/:itemId", deleteItem);
//export router
module.exports = router;
