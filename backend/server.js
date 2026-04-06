require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(o=> o.trim()).filter(Boolean)
app.use(cors({
  origin: (origin, callback)=>{
    if(!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('CORS blocked'))
  },
  credentials: true
}))
app.use(express.json({ limit: '5mb' }))

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

if(!process.env.JWT_SECRET){
  throw new Error('JWT_SECRET is required in environment variables')
}

if(!MONGO_URI){
  throw new Error('MONGO_URI is required in environment variables')
}

connectDB(MONGO_URI)

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res)=> res.json({ message: 'Reimagine API' }))
app.get('/api/health', (req, res)=> res.json({ status: 'ok', uptime: process.uptime() }))

app.use((err, req, res, next)=>{
  const status = err?.message === 'CORS blocked' ? 403 : 500
  res.status(status).json({ message: status === 403 ? 'Origin not allowed' : 'Server error' })
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
