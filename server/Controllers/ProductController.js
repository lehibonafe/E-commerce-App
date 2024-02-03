const Product = require("../Models/ProductModel");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products.length) {
      return res.status(404).send({ message: "No products found" });
    }

    res.status(200).send({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(req.body.name, "i") },
    });

    if (existingProduct) {
      return res
        .status(403)
        .send({ message: "Duplicated product name found." });
    }

    const { name, description, category, price, imageLink } = req.body;
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      imageLink,
    });

    const savedProduct = await newProduct.save();

    res.status(200).send({ message: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const result = await Product.findById(req.params.productId);

    if (!result) {
      return res.status(404).send({ message: "No products found" });
    }

    return res.status(200).send({ products: result });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: "Product does not exist" });
  }
};
