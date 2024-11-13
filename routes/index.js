const router = require("express").Router();

const userRouter = require("./users"); //import user Router
const clothesRouter = require("./clothingItems"); //import clothing Router

//mount routes to specific paths
router.use("/users", userRouter);
router.use("/items", clothesRouter);

//handle non-existent routes
router.use((req, res) => {
  return res.status(500).send({ message: "Route Not Found" });
});

module.exports = router;
