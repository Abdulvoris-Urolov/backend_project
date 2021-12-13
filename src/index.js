const express = require("express");
const app = express();
const router = require("./routes/auth");
const routerAdmin = require("./routes/admin/auth");
const routerCategory = require("./routes/category");
const routerProduct = require("./routes/product");
require("./database/db")();
require("dotenv").config();

app.use(express.json());
app.use("/api", router);
app.use("/api", routerAdmin);
app.use("/api", routerCategory);
app.use("/api", routerProduct);

app.get("/", (req, res) => {
  res.send("Backend_Project connected!");
});

console.log("Abdulvoris");
app.listen("2000", () => {
  console.log(`2000-port connected!`);
});