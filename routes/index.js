const router = require("express").Router();

const userRouter = require("./users"); //import user Router

router.use("/users", userRouter);

module.exports = router;
