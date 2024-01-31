const express = require("express");
const router = express.Router();
const auth = require("../auth");
const { verify } = auth;

const cartController = require("../Controllers/CartController");

router.post("/add-to-cart", verify, cartController.addToCart);
router.get("/all", verify, cartController.getCarts);

module.exports = router;
