const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required product name"],
  },
  description: {
    type: String,
    required: [true, "Required product description"],
  },
  category: {
    type: String,
    required: [true, "Required product category"],
  },
  price: {
    type: Number,
    require: [true, "Required product price"],
  },
  imageLink: {
    type: String,
    required: [true, "Required product category"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
