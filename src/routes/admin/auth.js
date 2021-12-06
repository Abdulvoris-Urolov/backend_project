const express = require("express");
const router = express.Router();
const admin = require("../../controller/admin/auth");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, admin.signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, admin.signin);

module.exports = router;