const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
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
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'admin'
  // },
  // timestamps: true
})

const User = mongoose.model("User", userSchema);

exports.User = User;
