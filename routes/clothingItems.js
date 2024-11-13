const router = require("express").Router(); //import express and router
const { getItems, createItem } = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
module.exports = router;
