const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");

// Import necessary modules and models

module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartResult = await Cart.findOne({ userId: req.user.id });

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }
    const cartItem = {
      productId: productId,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      imageLink: product.imageLink,
      quantity: quantity,
      subtotal: quantity * product.price,
    };

    if (cartResult) {
      cartResult.cartItems.push(cartItem);
      cartResult.totalPrice = cartResult.cartItems.reduce(
        (total, item) => total + item.subtotal,
        0
      );

      const updatedCart = await cartResult.save();
      res.status(200).send({ message: updatedCart });
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        cartItems: [cartItem],
        totalPrice: cartItem.subtotal,
      });

      const savedCart = await newCart.save();
      res.status(200).send({ message: savedCart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." + error.message });
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

module.exports.updateCartQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "cartItems._id": req.body.productId },
      { $set: { "cartItems.$.quantity": req.body.quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).send({
        message:
          "The product you're trying to change quantity with is not within the cart.",
      });
    }

    const fetchProductDetails = cart.cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      item.price = product.price;
      item.subtotal = item.quantity * item.price;
      return item;
    });

    const updatedCartItems = await Promise.all(fetchProductDetails);
    cart.totalPrice = updatedCartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
    await cart.save();

    res.status(200).send({
      message: "Successfully changed quantity to " + req.body.quantity,
      updatedCart: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." + error.message });
  }
};

module.exports.removeProduct = (req, res) => {
  Cart.findOne({ userId: req.user.id })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: "No cart found." });
      }

      // Check if the product exists in the cart
      const productIndex = result.cartItems.findIndex(
        (item) => item.productId === req.params.productId
      );

      if (productIndex !== -1) {
        // Product found, remove it from the cart
        result.cartItems.splice(productIndex, 1);

        // Update the totalPrice
        result.totalPrice = result.cartItems.reduce(
          (total, item) => total + item.subtotal,
          0
        );

        // Save the updated cart
        result
          .save()
          .then((updatedCart) =>
            res.status(200).send({
              message:
                "Successfully removed product with productId " +
                req.params.productId,
              updatedCart,
            })
          )
          .catch((error) =>
            res.status(500).send({ message: "Failed to update cart: " + error })
          );
      } else {
        // Product not found in the cart
        return res.status(404).send({
          message:
            "Product with productId " +
            req.params.productId +
            " is not in the cart.",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Internal server error." + error });
    });
};
