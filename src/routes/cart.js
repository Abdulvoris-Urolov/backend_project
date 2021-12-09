const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const { addItemToCart } = require("../controller/cart");
const router = express.Router();

router.post( "/user/cart/postcart", requireSignin, userMiddleware, addItemToCart );

module.exports = router;