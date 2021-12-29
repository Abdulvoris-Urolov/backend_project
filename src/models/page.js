const mongoose = require('mongoose');
const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    unique: true
  },
  banners: [
    {
      img:{type:String},
      navigateTo: { type: String }
    }
  ],
  products: [
    {
      img:{type:String},
      navigateTo: { type: String }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: { createdAt: "created_at" },
});

module.exports = mongoose.model('Page', pageSchema);