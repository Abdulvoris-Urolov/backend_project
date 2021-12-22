const express = require("express");
const router = express.Router();
const {initialData} = require ('../../controller/admin/initialData'); 
const { requireSignin, adminMiddleware } = require("../../common-middleware")

router.post("/initialdata", requireSignin, adminMiddleware, initialData);

module.exports = router; 