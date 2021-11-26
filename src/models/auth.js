// const mongoose = require('mongoose');
// const Joi = require('joi');


// module.exports = new mongoose.Schema({
//   firstName:{
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 20
//   },
//   lastName:{
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 20
//   },
//   userName:{
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     index: true,
//     lowercase:true
//   },
//   email:{
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     lowercase: true
//   },
//   password:{
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'admin'
//   },
//   // timestamps: true
// })

// function validateUser(user) {
//   const schema = Joi.object({
//     firstName: Joi.string().min(3).max(20).required(),
//     lastName: Joi.string().min(3).max(20).required(),
//     userName: Joi.string().required(),
//     email: Joi.string().boolean().required().email(),
//     password: Joi.String().required(),
//     role: Joi.string().boolean().required(),
//     // timestamps: Joi.boolean().required()
//   });
//   return schema.validate(user);
// }

// exports.validate = validateUser;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reuired: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().required()
  });

  return userSchema.validate(user);
}
exports.User = User;
exports.validate = validateUser;