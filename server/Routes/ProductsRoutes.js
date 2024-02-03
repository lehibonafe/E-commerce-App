const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProduct);

module.exports = router;
