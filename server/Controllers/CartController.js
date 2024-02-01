const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");

module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartResult = await Cart.findOne({ userId: req.user.id });

    if (cartResult) {
      const product = await Product.findById(productId);

      console.log(product);
      if (!product) {
        return res.status(404).send({ message: "Product does not exist." });
      }

      cartResult.cartItems.push({
        productId: productId,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        imageLink: product.imageLink,
        quantity: quantity,
        subtotal: quantity * product.price,
      });

      cartResult.totalPrice = cartResult.cartItems.reduce(
        (total, item) => total + item.subtotal,
        0
      );

      const updatedCart = await cartResult.save();
      res.status(200).send({ message: updatedCart });
    } else {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send({ message: "Product does not exist." });
      }

      const newCart = new Cart({
        userId: req.user.id,
        cartItems: [
          {
            productId: productId,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            imageLink: product.imageLink,
            quantity: quantity,
            subtotal: quantity * product.price,
          },
        ],
        totalPrice: quantity * product.price,
      });

      const savedCart = await newCart.save();
      res.status(200).send({ message: savedCart });
    }
  } catch (error) {
    console.error(error);
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

module.exports.updateCartQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "cartItems.productId": req.body.productId },
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

module.exports.PromiseupdateCartQuantity = async (req, res) => {
  try {
    const result = await Cart.findOneAndUpdate(
      { userId: req.user.id, "cartItems.productId": req.body.productId },
      { $set: { "cartItems.$.quantity": req.body.quantity } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({
        message:
          "The product you're trying to change quantity with is not within the cart.",
      });
    }

    const fetchProductDetails = result.cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error("Product not found.");
      }
      item.price = product.price;
      item.subtotal = item.quantity * item.price;
      return item;
    });

    const updatedCartItems = await Promise.all(fetchProductDetails);
    result.totalPrice = updatedCartItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    const updatedCart = await result.save();

    res.status(200).send({
      message: "Successfully changed quantity to " + req.body.quantity,
      updatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." + error.message });
  }
};
