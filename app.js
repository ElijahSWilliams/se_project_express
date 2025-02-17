const express = require("express"); // import express module
const mongoose = require("mongoose"); // import mongoose module
const cors = require("cors"); // import cors module
require("dotenv").config(); // import dotenv module and call config method
const { errors } = require("celebrate"); // import errors from celebrate
const mainRouter = require("./routes/index"); // this includes both routers
const errorHandler = require("./middlewares/errorHandling");

const app = express();
const { requestLogger, errorLogger } = require("./middlewares/logger"); // import logging functions to log errors

const { PORT = 3001 } = process.env;

/* const corsOptions = {
  origin: ["http://localhost:3000", "https://api.wtwr-demo.jumpingcrab.com"],
}; */

// establish moongoose connection to database
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => console.error(err));

// Route Implements
app.use(express.json()); // parse Data before any routers. You will usually need to do this
app.use(cors()); // install cors

app.use(requestLogger); // initialize request logger for logging requests. this must come before the routes

// code for testing app crashes (*Remove when code review is passed*)
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", mainRouter); // head router

app.use(errorLogger); // initialize error logger for logging errors. This must come after the routes

app.use(errors()); // celebrate error handler function call

app.use(errorHandler); // centralized middleware for handling errors

app.listen(PORT, () => {
  console.log("Running on Port:", PORT);
});
