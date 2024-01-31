const Cart = require("../Models/CartModel");

module.exports.addToCart = async (req, res) => {
  try {
    const { quantity, productId, productPrice } = req.body;
    const cartResult = await Cart.findOne({ userId: req.user.id });

    if (cartResult) {
      cartResult.cartItems.push({
        productId: productId,
        quantity: quantity,
        subtotal: quantity * productPrice,
        price: productPrice,
      });

      cartResult.totalPrice = cartResult.cartItems.reduce(
        (total, item) => total + item.subtotal,
        0
      );

      const updatedCart = await cartResult.save();
      res.status(200).send({ message: updatedCart });
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        cartItems: [
          {
            productId: productId,
            quantity: quantity,
            subtotal: quantity * productPrice,
            price: productPrice,
          },
        ],
        totalPrice: quantity * productPrice,
      });

      const savedCart = await newCart.save();
      res.status(200).send({ message: savedCart });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error." + error });
  }
};

module.exports.getCarts = async (req, res) => {
  try {
    // Assuming you have a Cart model and a user ID in your request object
    const cartResult = await Cart.findOne({ userId: req.user.id });

    // Send the cartResult as a response
    res.json(cartResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
