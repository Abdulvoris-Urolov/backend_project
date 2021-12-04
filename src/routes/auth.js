const express = require("express");
const router = express.Router();
const user = require("../controller/auth");
// const signin = require("../controller/auth");

router.post('/signup', user.signup);
router.post('/signin', user.signin);

module.exports = router;