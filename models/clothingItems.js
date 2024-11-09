const mongoose = require("mongoose");

const WEATHER = {
  cold: "cold",
  warm: "warm",
  hot: "hot",
};

const clothingItemSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    required: true,
    minlength: 2,
    maxlength: 4,
    enum: [WEATHER.cold, WEATHER.warm, WEATHER.hot],
  },
  imageUrl: {},
  owner: {},
  likes: {},
  createdAt: {},
});

module.exports = mongoose.model("item", clothingItemSchema);
