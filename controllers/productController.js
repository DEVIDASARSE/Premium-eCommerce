const Product = require('../models/Product')

const normalizeSort = (sort)=>{
  switch ((sort || '').toLowerCase()) {
    case 'low':
    case 'price_asc':
    case 'priceasc':
      return { price: 1, _id: -1 }
    case 'high':
    case 'price_desc':
    case 'pricedesc':
      return { price: -1, _id: -1 }
    case 'newest':
      return { createdAt: -1, _id: -1 }
    case 'oldest':
      return { createdAt: 1, _id: 1 }
    case 'rating':
    case 'rating_desc':
    case 'toprated':
      return { rating: -1, _id: -1 }
    case 'name_asc':
      return { name: 1, _id: -1 }
    case 'name_desc':
      return { name: -1, _id: -1 }
    default:
      return { createdAt: -1, _id: -1 }
  }
}

exports.getProducts = async (req, res)=>{
  try{
    // query params: category, keyword|q, minPrice, maxPrice, sort, pageNumber, limit
    const {
      category,
      keyword,
      q,
      minPrice,
      maxPrice,
      sort,
      pageNumber = 1,
      limit = 20
    } = req.query
    const filter = {}
    const searchKeyword = (keyword || q || '').trim()
    const normalizedCategory = (category || '').trim()

    if(normalizedCategory && normalizedCategory.toLowerCase() !== 'all'){
      filter.category = { $regex: `^${normalizedCategory}$`, $options: 'i' }
    }
    if(searchKeyword) filter.name = { $regex: searchKeyword, $options: 'i' }

    if((minPrice !== undefined && minPrice !== '') || (maxPrice !== undefined && maxPrice !== '')){
      filter.price = {}
      if(minPrice !== undefined && minPrice !== '' && !Number.isNaN(Number(minPrice))) filter.price.$gte = Number(minPrice)
      if(maxPrice !== undefined && maxPrice !== '' && !Number.isNaN(Number(maxPrice))) filter.price.$lte = Number(maxPrice)
      if(Object.keys(filter.price).length === 0) delete filter.price
    }

    const page = Math.max(1, Number(pageNumber) || 1)
    const perPage = Math.max(1, Math.min(100, Number(limit) || 20))
    const skip = (page - 1) * perPage
    const sortBy = normalizeSort(sort)

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortBy).skip(skip).limit(perPage)
    ])

    const pages = Math.ceil(total / perPage)
    res.json({ data: products, total, page, pages, limit: perPage })
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.getProductCategories = async (req, res)=>{
  try{
    const categories = await Product.distinct('category')
    const normalized = categories
      .filter(Boolean)
      .map(c=> String(c).trim())
      .filter(Boolean)
      .sort((a, b)=> a.localeCompare(b))

    res.json({ data: normalized })
  }catch(err){
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.getProduct = async (req, res)=>{
  try{
    const p = await Product.findById(req.params.id)
    if(!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}

exports.createProduct = async (req, res)=>{
  try{
    // Accept single `image` field for compatibility and normalize to `images` array
    const payload = { ...req.body }
    if(payload.image && (!payload.images || payload.images.length===0)) payload.images = [payload.image]
    const p = await Product.create(payload)
    res.status(201).json(p)
  }catch(err){
    console.error(err)
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
}

exports.updateProduct = async (req, res)=>{
  try{
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!p) return res.status(404).json({ message: 'Product not found' })
    res.json(p)
  }catch(err){
    res.status(400).json({ message: 'Invalid data' })
  }
}

exports.deleteProduct = async (req, res)=>{
  try{
    const p = await Product.findByIdAndDelete(req.params.id)
    if(!p) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Deleted' })
  }catch(err){
    res.status(500).json({ message: 'Server error' })
  }
}
