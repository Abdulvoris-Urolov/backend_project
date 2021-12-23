const express = require("express");
const { upload, requireSignin, adminMiddleware } = require("../../common-middleware");
const router = express.Router(); 
const {createPage, getPage} = require("../../controller/admin/page")

router.post('/page/create', requireSignin, adminMiddleware, upload.fields([
  {name: 'banners'},
  {name: 'products'}
]), createPage);
router.get('/page/:category/:type', getPage);
module.exports = router; 