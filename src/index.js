const express = require("express");
const app = express();
const router = require("./routes/auth");
const routerAdmin = require("./routes/admin/auth");
const routerCategory = require("./routes/category");
const routerProduct = require("./routes/product");
const routerCart = require("./routes/cart");
const path = require("path");
require("./database/db")();
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