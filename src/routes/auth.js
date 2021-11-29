const express = require("express");
const router = express.Router();
const singup = require("../controller/auth");
const signin = require("../controller/user");

router.post("/signup", singup);
router.post("/signin", signin);

module.exports = router;