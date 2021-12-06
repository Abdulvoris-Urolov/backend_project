const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware/index");
const { postcategory, getCategory } = require("../controller/category");
const router = express.Router();

router.post("/category/postcategory", requireSignin, adminMiddleware, postcategory);
router.get("/category/getcategory", getCategory);

module.exports = router;
