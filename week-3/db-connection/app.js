const express = require("express");
const morgan = require("morgan");
const connectDb = require("./config/connectDb");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/error-handler");

//connect to mongodb
// mongoose
//   .connect("mongodb://localhost:27017/test-connection-db")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

app.use((req, res, next) => {
  //global middleware
  console.log("Middleware executed");
  next();
});
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.use(errorHandler);

async function start() {
  try {
    await connectDb();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server Connected on port:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
}

start();
