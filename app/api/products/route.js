import { NextResponse } from 'next/server';

const products = [
  {id:1,name:'Artisan Soy Candle',tag:'Home & Living',price:569,orig:949,image:'/image_candle.png',badges:['best','sale'],cat:'home',stars:5,reviews:248,desc:'Hand-poured soy wax candle with calming lavender and sandalwood fragrance. Burns for 50+ hours.',emi:true},
  {id:2,name:'Bamboo Hand Cream',tag:'Wellness',price:799,orig:999,image:'/image_cream.png',badges:['sale'],cat:'wellness',stars:4,reviews:167,desc:'Rich moisturising hand cream with bamboo extract and shea butter. Fragrance-free and vegan.',emi:false},
  {id:3,name:'Brass Ring Set',tag:'Accessories',price:2124,orig:2499,image:'/image_ring.png',badges:['new','limited'],cat:'accessories',stars:5,reviews:89,desc:'Set of 4 handcrafted brass rings with an antique finish. One size fits most.',emi:true},
  {id:4,name:'Ceramic Mug Set',tag:'Kitchen',price:1399,orig:1999,image:'/image_mug.png',badges:['sale'],cat:'kitchen',stars:4,reviews:312,desc:'Set of 2 hand-thrown ceramic mugs. Dishwasher safe, holds 300ml. Available in 3 colours.',emi:false},
  {id:5,name:'Cotton Tote Bag',tag:'Accessories',price:487,orig:649,image:'/image_tote.png',badges:[],cat:'accessories',stars:4,reviews:203,desc:'100% organic cotton tote with reinforced handles. Holds up to 10kg. Perfect for groceries or beach.',emi:false},
  {id:6,name:'Linen Throw Pillow',tag:'Home & Living',price:1299,orig:null,image:'/image_pillow.png',badges:['best'],cat:'home',stars:5,reviews:145,desc:'Soft linen cover pillow insert included. 45×45cm. Spot clean only. Adds warmth to any sofa.',emi:false},
  
  // Tech Products
  {id:7,name:'Pro Smartphone 15',tag:'Electronics',price:74999,orig:84999,image:'/image_phone.png',badges:['new','sale'],cat:'tech',stars:5,reviews:1024,desc:'Latest flagship smartphone with stunning OLED display, pro-grade camera system, and all-day battery life.',emi:true},
  {id:8,name:'Active Smartwatch Series 6',tag:'Electronics',price:18499,orig:22999,image:'/image_watch.png',badges:['best'],cat:'tech',stars:4,reviews:543,desc:'Track your fitness, monitor your heart rate, and stay connected with this premium smartwatch.',emi:true},
  {id:9,name:'Noise Cancelling Headphones',tag:'Audio',price:24999,orig:29999,image:'/image_headphone.png',badges:['sale'],cat:'tech',stars:5,reviews:876,desc:'Industry-leading active noise cancellation with up to 30 hours of wireless playback.',emi:true},
  {id:10,name:'True Wireless Earbuds',tag:'Audio',price:9999,orig:12999,image:'/image_earbud.png',badges:[],cat:'tech',stars:4,reviews:432,desc:'Compact earbuds with deep bass, clear highs, and water resistance for your workouts.',emi:false},
];

export async function GET() {
  return NextResponse.json(products);
}
