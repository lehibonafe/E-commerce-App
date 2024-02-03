const Order = require("../Models/OrderModel");
const Cart = require("../Models/CartModel");

module.exports.userCheckout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    const cart = await Cart.findOne({ userId: userId });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).send({ message: "The cart is empty" });
    }

    // Check if the user already has an existing order history
    const orderHistory = await Order.find({ userId: userId });

    if (orderHistory.length > 0) {
      // If order history exists, create a new order and append it to the history
      const newOrder = new Order({
        userId: userId,
        productsOrdered: cart.cartItems,
        totalPrice: cart.totalPrice,
      });

      // Save the new order
      const savedOrder = await newOrder.save();

      // Clear the user's cart after creating the order
      await Cart.findOneAndUpdate(
        { userId: userId },
        { $set: { cartItems: [], totalPrice: 0 } }
      );

      return res.status(200).send({ message: savedOrder });
    } else {
      // If no existing order history, create a new one
      const newOrder = new Order({
        userId: userId,
        productsOrdered: cart.cartItems,
        totalPrice: cart.totalPrice,
      });

      // Save the new order
      const savedOrder = await newOrder.save();

      // Clear the user's cart after creating the order
      await Cart.findOneAndUpdate(
        { userId: userId },
        { $set: { cartItems: [], totalPrice: 0 } }
      );

      return res.status(200).send({ message: savedOrder });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error. " + error.message });
  }
};

module.exports.getUserOrders = (req, res) => {
  return Order.find({ userId: req.user.id })
    .then((results) => {
      if (!results || results.length === 0) {
        return res.status(404).send({ message: "No orders found" });
      } else {
        return res.status(200).send({ message: results });
      }
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Internal server error." + error });
    });
};

module.exports.getAllOrders = (req, res) => {
  return Order.find({})
    .then((result) => {
      if (!result || result == null) {
        return res.status(404).send({ message: "No orders found" });
      } else {
        return res.status(200).send({ message: result });
      }
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Internal server error." + error });
    });
};
