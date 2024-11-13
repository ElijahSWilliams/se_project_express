const ClothingItems = require("../models/clothingItems");

//ClothingItem Controller File
const getItems = (req, res) => {
  ClothingItems.find({})
    .then((clothes) => {
      res.status(200).send(clothes);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, likes } = req.body;

  ClothingItems.create({ name, weather, imageUrl })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const {} = req.body;
};

module.exports = { getItems, createItem };
