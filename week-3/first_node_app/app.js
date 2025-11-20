//1 import express;
const express = require("express");
//2 create app
const app = express(); //http,createServer();
//3 decide port
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("home route");
});
app.get("/user/profile", (req, res) => {
  res.send("user route");
});
app.get("/user/:id", (req, res) => {
  res.send("user with id route");
});

app.post("/register", (req, res) => {
  res.status(201).send("register route");
});

//dynamic route
app.put("/update/:id", (req, res) => {
  const param = req.params.id;
  console.log(param);
  res.send("update route");
});

app.get("/products", (req, res) => {
  const query = req.query;
  console.log(query.category, req.query.cheap);
  res.send("products route");
});

//run app on the port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server connected on port: ${PORT}`);
});
