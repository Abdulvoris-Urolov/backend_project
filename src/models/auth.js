const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  userName:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase:true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'admin'
  },
  // timestamps: true
})

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    userName: Joi.string().required(),
    email: Joi.string().boolean().required().email(),
    password: Joi.String().required(),
    role: Joi.string().boolean().required(),
    // timestamps: Joi.boolean().required()
  });

  return schema.validate(user);
}

module.exports = User;

