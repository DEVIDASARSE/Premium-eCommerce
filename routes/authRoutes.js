const express = require('express')
const router = express.Router()
const { register, login, me } = require('../controllers/authController')
const { seedAdmin } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/seed-admin', seedAdmin)
router.get('/me', protect, me)

module.exports = router
