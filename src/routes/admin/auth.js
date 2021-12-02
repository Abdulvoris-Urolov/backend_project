const express = require("express");
const router = express.Router();
const singup = require("../../controller/admin/auth");
const signin = require("../../controller/admin/auth");

router.post("/signup", singup);
router.post("/signin", signin);

module.exports = router;