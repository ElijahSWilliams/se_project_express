const router = require("express").Router();
const userRouter = require("./users"); // import user Router
const clothesRouter = require("./clothingItems"); // import clothing Router
const { dataNotFound } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

// mount routes to specific paths
router.use("/users", userRouter); // use userRouter at users endpoint       //localhost:3001/users
router.use("/items", clothesRouter); // use clothesRouter at Items endpoint //localhost:3001/items

// handle non-existent routes
router.use((req, res) =>
  res.status(dataNotFound).send({ message: "Route Not Found" })
);

module.exports = router;
