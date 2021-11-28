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
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase:true
  },
  email:{
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password:{
    type: String,
    minlength: 4,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'admin'
  }},
  {
    timestamps: { createdAt: 'created_at' }
  }
  
);


const User = mongoose.model("User", userSchema);

exports.User = User;