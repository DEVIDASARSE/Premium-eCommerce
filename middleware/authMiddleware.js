const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET

if(!JWT_SECRET){
  throw new Error('JWT_SECRET is required in environment variables')
}

exports.protect = async (req, res, next)=>{
  let token = null
  const auth = req.headers.authorization
  if(auth && auth.startsWith('Bearer ')) token = auth.split(' ')[1]
  if(!token) return res.status(401).json({ message: 'Not authorized, token missing' })

  try{
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if(!user) return res.status(401).json({ message: 'User not found' })
    req.user = user
    next()
  }catch(err){
    return res.status(401).json({ message: 'Token invalid' })
  }
}

exports.admin = (req, res, next)=>{
  if(req.user && req.user.role === 'admin') return next()
  return res.status(403).json({ message: 'Admin access required' })
}

