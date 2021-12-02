const express = require("express");
const router = express.Router();
const singup = require("../controller/user");
const signin = require("../controller/auth");

router.post("/singup", singup);
router.post("/signin", signin);

module.exports = router;
