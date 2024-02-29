const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/OrderController");
const auth = require("../auth");
const { verify } = auth;

router.get("/my-orders", verify, orderController.getAllOrders);
router.post("/checkout", verify, orderController.userCheckout);

module.exports = router;
