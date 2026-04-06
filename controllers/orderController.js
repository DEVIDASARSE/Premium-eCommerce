const Order = require('../models/Order')
const Product = require('../models/Product')
const mongoose = require('mongoose')

exports.createOrder = async (req, res)=>{
  try{
    const { products, totalPrice, shippingAddress, paymentStatus='Paid' } = req.body
    if(!products || !Array.isArray(products) || products.length===0) return res.status(400).json({ message: 'No products provided' })

    // Validate product IDs and compute correct prices from DB to avoid tampered client values
    const ids = products.map(p=> p.product).filter(Boolean)
    if(ids.length !== products.length) return res.status(400).json({ message: 'Invalid product entries' })

    // ensure all ids are valid ObjectId
    const invalid = ids.filter(id => !mongoose.Types.ObjectId.isValid(id))
    if(invalid.length) return res.status(400).json({ message: 'Invalid product id(s)', invalid })

    const dbProducts = await Product.find({ _id: { $in: ids } })
    if(dbProducts.length !== ids.length){
      const found = dbProducts.map(p=> p._id.toString())
      const notFound = ids.filter(i=> !found.includes(i))
      return res.status(400).json({ message: 'Some products were not found', notFound })
    }

    // Build canonical products payload (use DB price)
    const items = products.map(p=>{
      const dbp = dbProducts.find(x=> x._id.toString() === p.product)
      return { product: dbp._id, quantity: Math.max(1, Number(p.quantity)||1), price: dbp.price }
    })

    const computedTotal = items.reduce((s,i)=> s + i.price * i.quantity, 0)
    const order = await Order.create({ user: req.user._id, products: items, totalPrice: computedTotal, shippingAddress, paymentStatus })
    const populated = await Order.findById(order._id).populate('products.product').populate('user', '-password')
    res.status(201).json(populated)
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.getMyOrders = async (req, res)=>{
  try{
    const orders = await Order.find({ user: req.user._id }).populate('products.product').sort({ createdAt: -1 })
    res.json(orders)
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getAllOrders = async (req, res)=>{
  try{
    const orders = await Order.find().populate('user').populate('products.product')
    res.json(orders)
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}

exports.updateOrderStatus = async (req, res)=>{
  try{
    const order = await Order.findById(req.params.id)
    if(!order) return res.status(404).json({ message: 'Order not found' })
    order.status = req.body.status || order.status
    await order.save()
    res.json(order)
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}
