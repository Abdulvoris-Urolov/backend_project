const express = require("express");
const router = express.Router();
const user = require("../controller/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, user.signup);
router.post("/signin", validateSigninRequest, isRequestValidated, user.signin);

module.exports = router;
