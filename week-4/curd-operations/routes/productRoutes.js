const express = require("express");
const router = express.Router();
const {
  addProuct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { auth, userIsAdmin } = require("../middleware/auth");

router.use(auth);

router.post("/add-product", userIsAdmin, addProuct);
router.get("/all-products", getAllProducts);
router.put("/update-product/:id", userIsAdmin, updateProduct);
router.delete("/delete-product/:id", userIsAdmin, deleteProduct);

module.exports = router;
