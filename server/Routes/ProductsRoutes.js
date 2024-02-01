const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductController");

router.post("/", productController.createProduct);

module.exports = router;
