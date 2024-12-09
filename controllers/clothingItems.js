const ClothingItems = require("../models/clothingItems");
const {
  dataNotFound,
  defaultData,
  invalidData,
  duplicateData,
  unauthorizedData,
} = require("../utils/errors");

// ClothingItem Controller File

// Read
const getItems = (req, res) => {
  ClothingItems.find({})
    .then((clothes) => {
      res.status(200).send(clothes);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(defaultData)
        .send({ message: "An Error from getItems has occured" });
    });
};

// create
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body; // destructure

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
      return res
        .status(defaultData)
        .send({ message: "An Error from createItem has occured" });
    });
};

// Like
const likeItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  // find item by ID and update
  ClothingItems.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // add user ID to likes array if not already there
    { new: true } // return updates document
  )
    .then((item) => {
      if (!item) {
        return res.status(dataNotFound).send({ message: "Item Not Found" });
      }
      return res.status(200).send({ message: "Liked", item });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(invalidData).send({ message: "Invalid Id" });
      }
      return res
        .status(defaultData)
        .send({ message: "An Error from LikeItem has occured" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log("itemId", itemId);

  ClothingItems.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // remove user id from array
    { new: true } // return updated array
  )
    .then((item) => {
      if (!item) {
        return res
          .status(dataNotFound)
          .send({ message: "Item Not Found in dislike function" });
      }
      return res.status(200).send({ message: "disliked", item });
    })
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(invalidData).send({ message: "Invalid ID" });
      }
      return res
        .status(defaultData)
        .send({ message: "An Error from dislike function has occured" });
    });
};

// Delete
const deleteItem = (req, res) => {
  const { itemId } = req.params; // get item ID from req param
  console.log("itemId:", itemId);
  const userId = req.user._id; // declare userID

  ClothingItems.findById(itemId)
    .orFail() // ensures an error is thrown if the item doesn't exist
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return res.status(403).send({ message: "Unauthorized Action" });
      }
      // proceed with deletion if itemid and userid match
      return ClothingItems.findByIdAndDelete(itemId)
        .then((deletedItem) => {
          res
            .status(200)
            .send({ message: "Successfully Deleted", deletedItem });
        })
        .catch((err) => {
          console.log(err.name);
          if (err.name === "DocumentNotFoundError") {
            return res.status(dataNotFound).send({ message: "Item Not Found" });
          }
          if (err.name === "CastError") {
            return res.status(invalidData).send({ message: "Invalid Data" });
          }
          return res
            .status(defaultData)
            .send({ message: "An Error occured during deletion" });
        }); // end findByIdAndDelete
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(dataNotFound).send({ message: "Invalid Id" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(dataNotFound).send({ message: "Item Not Found" });
      }
      return res.status(defaultData).send({ message: "Server Error" });
    });
};

module.exports = {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
};
