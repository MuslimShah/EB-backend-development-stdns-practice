const express = require("express");
const router = express.Router();
const {
  addProuct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/add-product", addProuct);
router.get("/all-products", getAllProducts);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
