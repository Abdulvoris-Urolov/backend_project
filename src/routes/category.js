const express = require('express');
const category = require('../controller/category');
const router = express.Router();

router.post('/category', category);

module.exports = router;
