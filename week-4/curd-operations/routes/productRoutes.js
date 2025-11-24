const express = require("express");
const router = express.Router();
const { addProuct } = require("../controllers/productController");

router.post("/", addProuct);

module.exports = router;
