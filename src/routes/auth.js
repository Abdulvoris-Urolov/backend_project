const express = require("express");
const router = express.Router();
const validate = require('../models/auth')

router.get("/all", async (req, res) => {
  try {

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router; 

