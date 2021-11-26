const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require('../models/auth');

router.post("/users", async (req, res) => {
 
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
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
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
    // role: Joi.string().boolean().required(),
    // timestamps: Joi.boolean().required()
  });
  return userSchema.validate(user);
}

module.exports = router;