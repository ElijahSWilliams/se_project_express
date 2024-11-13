const router = require("express").Router(); //import express and router
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems"); //extract functions from clothingItems file

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/:itemId", updateItem);

//Delete
router.delete("/:itemId", deleteItem);
//export router
module.exports = router;
