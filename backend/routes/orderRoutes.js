const express = require('express')
const router = express.Router()
const oc = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

router.post('/', protect, oc.createOrder)
router.get('/my', protect, oc.getMyOrders)
router.get('/', protect, admin, oc.getAllOrders)
router.put('/:id/status', protect, admin, oc.updateOrderStatus)

module.exports = router
