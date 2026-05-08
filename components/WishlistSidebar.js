'use client';
import { useStore } from '@/context/StoreContext';

export default function WishlistSidebar({ products }) {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, addToCart, toggleWishlist } = useStore();

  const wishKeys = Array.from(wishlist);

  return (
    <div className={`side-overlay ${isWishlistOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('side-overlay')) setIsWishlistOpen(false) }}>
      <div className="side-panel">
        <div className="side-header">
          <h3>Wishlist ♡</h3>
          <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>×</button>
        </div>
        
        <div>
          {wishKeys.length === 0 ? (
            <div style={{textAlign:'center',padding:'40px',color:'var(--muted)'}}>
              <div style={{fontSize:'48px',opacity:0.3}}>♡</div>
              <p>Your wishlist is empty</p>
            </div>
          ) : (
            wishKeys.map(id => {
              const p = products.find(x => x.id === parseInt(id));
              if (!p) return null;
              return (
                <div className="wish-item" key={id}>
                  <img src={p.image} className="wish-emoji" alt={p.name} style={{ objectFit: 'cover', padding: 0 }} />
                  <div className="wish-info">
                    <div className="wish-name">{p.name}</div>
                    <div className="wish-price">₹{p.price.toLocaleString('en-IN')}</div>
                    <button className="wish-add" onClick={() => {
                        addToCart(p.id, p.name);
                        toggleWishlist(p.id); 
                    }}>Move to Cart</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
