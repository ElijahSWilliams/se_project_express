const ClothingItems = require("../models/clothingItems");
const { dataNotFound, defaultData, invalidData } = require("../utils/errors");

//ClothingItem Controller File

//Read
const getItems = (req, res) => {
  ClothingItems.find({})
    .then((clothes) => {
      res.status(200).send(clothes);
    })
    .catch((err) => {
      console.error(err);
      return res.status(defaultData).send({ message: "Error from getItems" });
    });
};

//create
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body; //destructure

  const owner = req.user._id;

  console.log(req.body);
  console.log(owner);

  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(invalidData).send({ message: err.message });
      }
      return res.status(defaultData).send({ message: "Error from createItem" });
    });
};

//Update
const updateItem = (req, res) => {
  const { itemId } = req.params; //get item ID from req params
  const { imageUrl } = req.body; //get image Url from req body

  ClothingItems.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(defaultData)
        .send({ message: "Error from 'updateItem'", err });
    });
};

//Like
const likeItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  //find item by ID and update
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, //add user ID to likes array if not already there
    { new: true } //return updates document
  )
    .then((item) => {
      if (!item) {
        return res.status(dataNotFound).send({ message: "Item Not Found" });
      }
      return res.status(200).send({ message: "Liked", item });
    })
    .catch((err) => {
      console.error(err);
      return res.status(defaultData).send({ message: "Error from LikeItem" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);

  ClothingItems.findByIdAndDelete(
    itemId,
    { $pull: { likes: req.user._id } }, //remove user id from array
    { new: true } //return updated array
  )
    .then((item) => {
      if (!item) {
        return res
          .status(dataNotFound)
          .send({ message: "Item Not Founf in dislike function" });
      }
      return res.status(200).send({ message: "disliked" }, item);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(defaultData)
        .send({ message: "Error from dislike function" });
    });
};

//Delete
const deleteItem = (req, res) => {
  const { itemId } = req.params; //get item ID from req param
  console.log(itemId);

  ClothingItems.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(200).send({ message: "Successfully Deleted", item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "Item Not Found") {
        return res.status(dataNotFound).send({ message: "Item Not Found" });
      }
      return res.status(defaultData).send({ message: "Error from deleteItem" });
    });
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  likeItem,
  dislikeItem,
  deleteItem,
};
