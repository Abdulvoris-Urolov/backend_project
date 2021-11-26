// const express = require("express");
// const router = express.Router();
// const validate = require('../models/auth')

// router.get("/all", async (req, res) => {
//   try {

//       res.status(200).json(user);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {

//       res.status(200).json(user);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });


// router.put("/:id", async (req, res) => {
//   try {

//       res.status(200).json(user);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {

//       res.status(200).json(user);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// });

// module.exports = router; 
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = require('../models/auth');

// const User = mongoose.model("User", userSchema);

router.post("/api/users", async (req, res) => {
 
  const {error} = validateUser(req.body);
  
  try {
    if(error){
      return res.status(404).send(error.message);
    }
  } catch (error) {
    console.error('1 error')
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) 
      return res.status(400).send("Bu email oldin ro`yxatdan o`tgan");
  } catch (error) {
    console.error(error.message)
  }
  try {
    newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
  } catch (error) {
    console.error(error.message)
  }
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error.message)
  }

});

function validateUser(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().required()
  });

  return userSchema.validate(user);
}

module.exports = router;