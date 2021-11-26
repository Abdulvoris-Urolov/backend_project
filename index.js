const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
require("./src/database/db")();
require('./src/models/auth');
const route = require('./src/routes/auth');
app.use('/', route );

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     reuired: true,
//     minlength: 4,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });
// const User = mongoose.model("User", userSchema);

app.use(express.json());

// app.post("/api/users", async (req, res) => {
//   const {error} = validateUser(req.body);
//   try {
//     if(error){
//       return res.status(404).send(error.message);
//     }
//   } catch (error) {
//     console.error('1 error')
//   }

//   try {
//     let user = await User.findOne({ email: req.body.email });
//     if (user) 
//       return res.status(400).send("Bu email oldin ro`yxatdan o`tgan");
  
//   } catch (error) {
//     console.error('2 error')
//   }
//   try {
//     newUser = new User({
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email
//     });
//   } catch (error) {
//     console.error('3 error')
//   }
//   try {
//     await newUser.save();
//     res.send(newUser);
//   } catch (error) {
//     console.error('4 error')
//   }

// });

// function validateUser(user) {
//   const userSchema = Joi.object({
//     name: Joi.string().required(),
//     password: Joi.string().min(4).required(),
//     email: Joi.string().required()
//   });

//   return userSchema.validate(user);
// }

app.get('/', (req, res) =>{
  res.send('Backend_Project connected!');
});

console.log('Abdulvoris');
app.listen("2000", () => {
  console.log(`2000-port connected!`);
});