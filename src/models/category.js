const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categoryImage: { 
      type: String 
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
// initialdata bunda nimaga iwlamadi?
// const Category = mongoose.model("Category", categorySchema);
// exports.Category = Category;

// initialdata bunda nimaga iwladi?
module.exports = mongoose.model("Category", categorySchema);