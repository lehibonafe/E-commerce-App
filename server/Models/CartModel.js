const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter user ID"],
  },
  cartItems: [
    {
      productId: {
        type: String,
        required: [true, "Product ID is required"],
      },
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
        required: [true, "Required product price"],
      },
      imageLink: {
        type: String,
        required: [true, "Required image link"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },
      subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: [true, "Total Price is required"],
  },
  orderedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
