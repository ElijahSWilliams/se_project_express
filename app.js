const express = require("express"); //import express module
const mongoose = require("mongoose"); //import mongoose module
const cors = require("cors"); //import cors module
const mainRouter = require("./routes/index"); // this includes both routers
const errorHandler = require("./middlewares/errorHandling");
const { errors } = required("celebrate"); //import errors from celebrate

const app = express();

const { PORT = 3001 } = process.env;

// establish moongoose connection to database
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => console.error(err));

// Route Implements
app.use(express.json()); // parse Data before any routers. You will usually need to do this
app.use(cors({ origin: "http://localhost:3000" })); // install cors

app.use("/", mainRouter);

app.use(errors()); //celebrate error handler

app.use(errorHandler); //centralized middleware for handling errors

app.listen(PORT, () => {
  console.log("Running on Port:", PORT);
});
