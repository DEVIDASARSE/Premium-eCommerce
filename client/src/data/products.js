const categories = ['Men','Women','Accessories','Footwear','Outerwear','New Arrivals']

// custom product provided by user — added first to dataset
const customProduct = {
  id: 'p_custom_1',
  name: 'Minimal Black Hoodie',
  category: 'Men',
  subCategory: 'Hoodies',
  price: 24.99,
  discount: 20,
  rating: 4.5,
  reviews: 124,
  stock: 20,
  isNew: true,
  isTrending: true,
  isBestSeller: false,
  isOnSale: true,
  colors: ['Black','Gray'],
  sizes: ['S','M','L','XL'],
  description: 'Premium cotton oversized hoodie...',
  images: [
    'https://images.unsplash.com/photo-1520975916090-3105956dac38',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d'
  ],
  tags: ['Limited','Sale']
}

const products = Array.from({length:120}).map((_,i)=>{
  const id = `p${i+1}`
  const category = categories[i % categories.length]
  const price = (Math.round((20 + Math.random()*180)*100))/100
  const onSale = Math.random() > 0.7
  const oldPrice = onSale ? Math.round((price + (10 + Math.random()*80))*100)/100 : null
  const imgSig = i + 10
  const image = `https://source.unsplash.com/collection/190727/1200x800?sig=${imgSig}`
  const name = `${category} Essential ${i+1}`
  const rating = (Math.round((3.8 + Math.random()*1.4)*10))/10
  const sizes = ['S','M','L','XL']
  const colors = ['Black','White','Blue','Beige']
  const tags = []
  if(onSale) tags.push('Sale')
  if(i%10===0) tags.push('Limited')
  if(i%7===0) tags.push('New')
  return {
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    rating,
    description: `Premium ${name} crafted with attention to detail.`,
    sizes,
    colors,
    tags
  }
})

// ensure custom product appears first
products.unshift(customProduct)

export const categoriesList = categories
export default products
