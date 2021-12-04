const mongoose = require("mongoose");

categorySchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: true,
      trim: true
    },
    slug:{
      type:String,
      required:true,
      trim:true,
      minlength: 3,
      maxlength: 20
    },
    parentId:{
      type:String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true
    },  
  },
  {
    timestamps: { createdAt: "created_at" },
  }
)


const Category = mongoose.model("Category", userSchema);

exports.Category = Category;