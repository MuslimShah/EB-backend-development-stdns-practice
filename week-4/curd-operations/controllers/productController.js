const Products = require("../models/productModel");

//create or add a new product in db;
exports.addProuct = async (req, res) => {
  try {
    const { name, price, description, category, tags } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price are required fields" });
    }

    const newProduct = await Products.create({
      name,
      price,
      description,
      category,
      tags,
    });
    return res
      .status(201)
      .json({ message: "Prouct added successfully", product: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};
