import { NextResponse } from 'next/server';

const recs = [
  {name:'Artisan Soy Candle',price:'₹569',orig:'₹949',image:'/image_candle.png'},
  {name:'Pro Smartphone 15',price:'₹74,999',orig:'₹84,999',image:'/image_phone.png'},
  {name:'Active Smartwatch',price:'₹18,499',orig:'₹22,999',image:'/image_watch.png'},
  {name:'Noise Cancelling Headphones',price:'₹24,999',orig:'₹29,999',image:'/image_headphone.png'},
  {name:'Bamboo Hand Cream',price:'₹799',orig:'₹999',image:'/image_cream.png'},
  {name:'Brass Ring Set',price:'₹2,124',orig:'₹2,499',image:'/image_ring.png'},
];

const recentData = [
  {name:'True Wireless Earbuds',price:'₹9,999',image:'/image_earbud.png'},
  {name:'Ceramic Mugs',price:'₹1,399',image:'/image_mug.png'},
  {name:'Cotton Tote',price:'₹487',image:'/image_tote.png'},
  {name:'Linen Pillow',price:'₹1,299',image:'/image_pillow.png'},
  {name:'Smartwatch',price:'₹18,499',image:'/image_watch.png'},
];

export async function GET() {
  return NextResponse.json({ recs, recentData });
}
