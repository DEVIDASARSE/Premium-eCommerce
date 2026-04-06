const express = require('express')
const router = express.Router()
const pc = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')

router.get('/', pc.getProducts)
router.get('/meta/categories', pc.getProductCategories)
router.get('/:id', pc.getProduct)
router.post('/', protect, admin, pc.createProduct)
router.put('/:id', protect, admin, pc.updateProduct)
router.delete('/:id', protect, admin, pc.deleteProduct)

module.exports = router
