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

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalDocuments = await Products.countDocuments();
    const products = await Products.find().skip(skip).limit(limit);
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({
      products,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalPages: Math.ceil(totalDocuments / limit),
        totalItems: totalDocuments,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get products", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, tags } = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { name, price, description, category, tags },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Products.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
