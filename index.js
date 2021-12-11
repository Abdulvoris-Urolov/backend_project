const express = require("express");
const app = express();
const router = require("./src/routes/auth");
const routerAdmin = require("./src/routes/admin/auth");
const routerCategory = require("./src/routes/category");
const routerProduct = require("./src/routes/product");
const routerCart = require("./src/routes/cart");
const path = require("path");
require("./src/database/db")();
require("dotenv").config();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, 'uploads')));
app.use("/api", router);
app.use("/api", routerAdmin);
app.use("/api", routerCategory);
app.use("/api", routerProduct);
app.use("/api", routerCart);

app.get("/", (req, res) => {
  res.send("Backend_Project connected!");
});

console.log("Abdulvoris");
app.listen("2000", () => {
  console.log(`2000-port connected!`);
});