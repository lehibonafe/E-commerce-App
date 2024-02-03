const express = require("express");
const router = express.Router();
const auth = require("../auth");
const { verify } = auth;

const cartController = require("../Controllers/CartController");

router.post("/add-to-cart", verify, cartController.addToCart);
router.get("/all", verify, cartController.getCarts);
router.patch(
  "/update-cart-quantity",
  verify,
  cartController.updateCartQuantity
);
router.delete(
  "/:productId/remove-from-cart",
  verify,
  cartController.removeProduct
);

module.exports = router;
