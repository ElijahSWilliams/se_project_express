const ClothingItems = require("../models/clothingItems");
const {
  dataNotFound,
  defaultData,
  invalidData,
  forbidden,
  ServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

// ClothingItem Controller File

// Read
const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((clothes) => {
      res.status(200).send(clothes);
    })
    .catch((err) => {
      console.error(err);
      return next(new ServerError("An Error Occured in getItems"));
    });
};

// create
const createItem = (req, res, next) => {
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
        return next(new BadRequestError("Bad Request Error in createItem"));
      }
      return next(new ServerError("Server Error"));
    });
};

// Like
const likeItem = (req, res, next) => {
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
        return next(new NotFoundError("Item Not Found error in likeItem"));
      }
      return res.status(200).send({ message: "Liked", item });
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID"));
      }
      return next(new ServerError("An Error Has Occured in likeItem"));
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
        return next(new NotFoundError("Item not Found"));
      }
      return res.status(200).send({ message: "disliked", item });
    })
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      if (err.name === "CastError") {
        return res.status(invalidData).send({ message: "Invalid ID" });
      }
      return next(
        new ServerError("An error occured on the server in dislikeItem")
      );
    });
};

// Delete
const deleteItem = (req, res, next) => {
  const { itemId } = req.params; // get item ID from req param
  console.log("itemId:", itemId);
  const userId = req.user._id; // declare userID

  ClothingItems.findById(itemId)
    .orFail() // ensures an error is thrown if the item doesn't exist
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return next(new ForbiddenError("Unauthorized Action"));
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
            return next(new NotFoundError("Item Not Found"));
          }
          if (err.name === "CastError") {
            return next(new BadRequestError("Invalid Data"));
          }
          return next(new ServerError("An Error occured during deletion"));
        }); // end findByIdAndDelete
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return next(new NotFoundError("Invalid ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item Not Found"));
      }
      return next(new ServerError("Server Erro