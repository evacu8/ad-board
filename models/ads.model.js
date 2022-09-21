const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  published: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  seller: { type: String, required: true },
});

module.exports = mongoose.model("Ad", adsSchema);
