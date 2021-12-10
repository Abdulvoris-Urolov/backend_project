const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware/index");
const { postcategory, getCategory } = require("../controller/category");
const router = express.Router();
const shortid = require('shortid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads' ))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage });

router.post( "/category/postcategory", requireSignin, adminMiddleware, upload.single('categoryImage'), postcategory );
router.get("/category/getcategory", getCategory);

module.exports = router;