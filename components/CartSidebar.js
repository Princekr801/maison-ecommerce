'use client';
import { useStore } from '@/context/StoreContext';
import { useState } from 'react';

export default function CartSidebar({ products }) {
  const { cart, changeQty, isCartOpen, setIsCartOpen, setIsCheckoutOpen, showToast } = useStore();
  const [couponCode, setCouponCode] = useState('');

  const cartKeys = Object.keys(cart).filter(k => cart[k] > 0);
  
  let subtotal = 0;
  const cartItems = cartKeys.map(k => {
    const p = products.find(x => x.id === parseInt(k));
    if (!p) return null;
    subtotal += p.price * cart[k];
    return (
      <div className="cart-item" key={k}>
        <img src={p.image} className="cart-emoji" alt={p.name} style={{ objectFit: 'cover', padding: 0 }} />
        <div className="cart-info">
          <div className="cart-name">{p.name}</div>
          <div className="cart-price">₹{(p.price * cart[k]).toLocaleString('en-IN')}</div>
          <div className="cart-qty">
            <button className="qty-btn" onClick={() => changeQty(k, -1)}>−</button>
            <span className="qty-val">{cart[k]}</span>
            <button className="qty-btn" onClick={() => changeQty(k, 1)}>+</button>
            <button onClick={() => changeQty(k, -cart[k])} style={{background:'none',border:'none',cursor:'pointer',color:'var(--danger)',fontSize:'15px',marginLeft:'4px'}} aria-label="Remove">🗑</button>
          </div>
        </div>
      </div>
    );
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === 'MAISON20') {
      setAppliedDiscount(subtotal * 0.2);
      showToast('🎉 MAISON20 applied! 20% off');
    } else if (code === 'TECH10') {
      setAppliedDiscount(subtotal * 0.1);
      showToast('🎉 TECH10 applied! 10% off');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(1); // specific flag or flat discount
      showToast('🎉 Free shipping applied!');
    } else {
      showToast('Invalid coupon code');
    }
  };

  const setAndApplyCoupon = (code) => {
    setCouponCode(code);
  };

  const baseDisc = Math.min(subtotal * 0.1, 200); 
  const actualDiscount = appliedDiscount > 0 ? appliedDiscount : baseDisc;
  
  const delivery = subtotal >= 999 || couponCode.toUpperCase().trim() === 'FREESHIP' ? 0 : 99;
  const total = subtotal > 0 ? subtotal - actualDiscount + delivery : 0;

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('cart-overlay')) setIsCartOpen(false) }}>
      <div className="cart-panel">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartKeys.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : cartItems}
        </div>

        {cartKeys.length > 0 && (
          <div className="cart-footer">
            
            <div className="available-coupons">
              <div style={{fontSize:'11px',fontWeight:600,color:'var(--muted)',marginBottom:'6px'}}>AVAILABLE COUPONS:</div>
              <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'10px'}}>
                <span className="mini-coupon" onClick={() => setAndApplyCoupon('MAISON20')}>MAISON20 (20% Off)</span>
                <span className="mini-coupon" onClick={() => setAndApplyCoupon('TECH10')}>TECH10 (10% Off)</span>
                <span className="mini-coupon" onClick={() => setAndApplyCoupon('FREESHIP')}>FREESHIP</span>
              </div>
            </div>

            <div className="cart-coupon">
              <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <button onClick={applyCoupon}>Apply</button>
            </div>
            
            <div className="cart-summary">
              <div className="cart-summary-row"><span>Subtotal ({cartKeys.length} items)</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="cart-summary-row save"><span>Discount</span><span>−₹{Math.round(actualDiscount).toLocaleString('en-IN')}</span></div>
              <div className="cart-summary-row"><span>Delivery</span><span>{delivery === 0 ? <span style={{color:'var(--accent)'}}>FREE</span> : `₹${delivery}`}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>₹{Math.round(total).toLocaleString('en-IN')}</span></div>
            </div>
            
            <button className="checkout-btn" onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
