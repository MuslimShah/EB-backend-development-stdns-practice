const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
//import db connection
const connectDb = require("./config/connectDb");

//importing routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

//error hanler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "something went wrong", error: err.message });
});

// Start the server
async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
