const express = require("express");
const router = express.Router();
const userSchema = require('../models/auth');
const Joi = require('joi');

router.post("/register", async (req, res) => {
  try {

    

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router; 

