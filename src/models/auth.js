const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    userName: {
      type: String,
      lowercase: true,
      required: false,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      minlength: 4,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

userSchema.virtual('password').set(
  (password) => {
    this.hash_password = bcrypt.hashSync(password, 10);
  }
)


userSchema.methods = {
  authentification:  async function(password){
  return await bcrypt.compareSync(password, this.hash_password)
}}   


const User = mongoose.model("User", userSchema);

exports.User = User;
