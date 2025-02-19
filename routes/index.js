const router = require("express").Router();
const userRouter = require("./users"); // import user Router
const clothesRouter = require("./clothingItems"); // import clothing Router
const NotFoundError  = require("../utils/NotFoundError");
const { login, createUser } = require("../controllers/users");
const { validateLogin, validateUser } = require("../middlewares/validation");

// mount routes to specific paths
router.use("/users", userRouter); // use userRouter at users endpoint       //localhost:3001/users
router.use("/items", clothesRouter); // use clothesRouter at Items endpoint //localhost:3001/items

router.post("/signup", validateUser, createUser);
router.post("/signin", validateLogin, login);

// handle non-existent routes
router.use((req, res, next) => next(new NotFoundError("Route Not Found")));

module.exports = router;
