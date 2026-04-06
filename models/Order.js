const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Processing','Shipped','Delivered'], default: 'Processing' },
  shippingAddress: {
    line1: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentStatus: { type: String, enum: ['Pending','Paid','Failed'], default: 'Pending' }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
