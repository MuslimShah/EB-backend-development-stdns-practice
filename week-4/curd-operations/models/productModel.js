const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: { type: Number, required: [true, "Product price is required"] },
  description: { type: String, required: false },
  category: { type: String, required: false },
  inStock: { type: Boolean, default: true },
  tags: [String],//["electronics", "home-appliance"]
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
