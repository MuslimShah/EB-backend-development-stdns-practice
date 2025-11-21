const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/authController");

const { authorize, checkAdmin } = require("../middleware/auth");

router.get("/", authorize, checkAdmin, getUsers);

module.exports = router;
