const express = require("express");
const router = express.Router();
const admin = require("../../controller/admin/auth");

router.post("/admin/signup", admin.signup);
router.post("/admin/signin", admin.signin);

module.exports = router;