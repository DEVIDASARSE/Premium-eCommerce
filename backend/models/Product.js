const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String
}, { timestamps: true })

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  images: [String],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  isOnSale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
