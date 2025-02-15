const express = require("express"); //import express module
const mongoose = require("mongoose"); //import mongoose module
const cors = require("cors"); //import cors module
require("dotenv").config(); //import env module
const mainRouter = require("./routes/index"); // this includes both routers
const errorHandler = require("./middlewares/errorHandling");
const { errors } = require("celebrate"); //import errors from celebrate
const app = express();
const { requestLogger, expressLogger } = require("./middlewares/logger"); //import logging functions to log errors
const { errorLogger } = require("express-winston");

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

app.use(requestLogger); //initialize request logger for logging requests. this must come before the routes

app.use("/", mainRouter); //head router

app.use(errorLogger); //initialize error logger for logging errors. This must come after the routes

app.use(errors()); //celebrate error handler function call

app.use(errorHandler); //centralized middleware for handling errors

app.listen(PORT, () => {
  console.log("Running on Port:", PORT);
});
