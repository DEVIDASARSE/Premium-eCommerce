const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

if(!JWT_SECRET){
  throw new Error('JWT_SECRET is required in environment variables')
}

const generateToken = (user)=> jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

exports.register = async (req, res)=>{
  const { name, email, password } = req.body
  if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  try{
    const exists = await User.findOne({ email })
    if(exists) return res.status(400).json({ message: 'Email already registered' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hash })
    const token = generateToken(user)
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res)=>{
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ message: 'Missing fields' })
  try{
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(400).json({ message: 'Invalid credentials' })
    const token = generateToken(user)
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}

exports.me = async (req, res)=>{
  if(!req.user) return res.status(401).json({ message: 'Not authorized' })
  res.json({ user: req.user })
}

exports.seedAdmin = async (req, res)=>{
  const secret = req.body?.secret || req.headers['x-admin-secret']
  if(!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) return res.status(403).json({ message: 'Forbidden' })
  try{
    const { name, email, password } = req.body
    if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
    const exists = await User.findOne({ email })
    if(exists) return res.status(400).json({ message: 'Admin already exists' })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hash, role: 'admin' })
    const token = generateToken(user)
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}
