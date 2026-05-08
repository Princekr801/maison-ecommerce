'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CartSidebar from '@/components/CartSidebar';
import WishlistSidebar from '@/components/WishlistSidebar';
import CheckoutModal from '@/components/CheckoutModal';
import AccountSidebar from '@/components/AccountSidebar';
import { useStore } from '@/context/StoreContext';

export default function HomeClient() {
  const { addToCart, toggleWishlist, wishlist, searchQuery, setIsAccountOpen, setIsWishlistOpen, showToast } = useStore();

  const [products, setProducts] = useState([]);
  const [recs, setRecs] = useState([]);
  const [recentData, setRecentData] = useState([]);

  const [userReviews, setUserReviews] = useState([
    { stars: 5, text: "Absolutely love the artisan candle! The scent fills the entire room within minutes. Highly recommend for a cozy evening.", author: "Sarah J." },
    { stars: 5, text: "The Pro Smartphone arrived exactly on time. The packaging felt extremely premium, and the phone works flawlessly.", author: "Michael T." },
    { stars: 4, text: "The ceramic mugs are beautiful and feel great to hold. Only giving 4 stars because I wish there were more color options.", author: "Emily R." }
  ]);

  // Filter & Sort State
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('default');

  // Modal State
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Timer State
  const [timerSecs, setTimerSecs] = useState(13642);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
    fetch('/api/recommendations').then(r => r.json()).then(data => {
      setRecs(data.recs);
      setRecentData(data.recentData);
    });

    const t = setInterval(() => setTimerSecs(s => Math.max(0, s - 1)), 1000);
    const st = setInterval(() => setCurrentSlide(s => (s + 1) % 3), 4000);
    return () => { clearInterval(t); clearInterval(st); };
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const h = Math.floor(timerSecs / 3600);
  const m = Math.floor((timerSecs % 3600) / 60);
  const s = timerSecs % 60;

  const getSortedFiltered = () => {
    let list = activeFilter === 'all' ? [...products] : products.filter(p => p.cat === activeFilter || p.badges.includes(activeFilter));
    
    // Apply Global Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
    }

    if (currentSort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (currentSort === 'rating') list.sort((a, b) => b.stars - a.stars);
    else if (currentSort === 'newest') list.sort((a, b) => b.id - a.id);
    return list;
  };

  const displayProducts = getSortedFiltered();

  return (
    <>
      <Navigation />

      {/* FLASH SALE BAR */}
      <div className="flash-bar">
        <span className="flash-label">⚡ FLASH SALE</span>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div className="flash-ticker">
            <span className="flash-item">📱 Pro Smartphone 15 <span className="flash-off">10% OFF</span></span>
            <span className="flash-item">🕯️ Soy Wax Candle <span className="flash-off">40% OFF</span></span>
            <span className="flash-item">☕ Ceramic Mug Set <span className="flash-off">30% OFF</span></span>
            <span className="flash-item">🌿 Bamboo Hand Cream <span className="flash-off">20% OFF</span></span>
            <span className="flash-item">💍 Brass Ring Set <span className="flash-off">15% OFF</span></span>
            <span className="flash-item">🎧 Noise Cancelling Headphones <span className="flash-off">15% OFF</span></span>
          </div>
        </div>
        <span className="flash-timer">{pad(h)}:{pad(m)}:{pad(s)}</span>
      </div>

      {/* HERO CAROUSEL */}
      <section className="hero" id="heroSection">
        <button className="hero-arrow prev" onClick={() => setCurrentSlide(s => (s + 2) % 3)}>‹</button>
        <button className="hero-arrow next" onClick={() => setCurrentSlide(s => (s + 1) % 3)}>›</button>

        <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
          <div className="hero-text">
            <span className="hero-badge">Summer Collection 2026</span>
            <h1>Crafted for the <em>Discerning</em> Eye</h1>
            <p>Thoughtfully sourced goods blending timeless design with modern tech and sensibility.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => document.getElementById('products').scrollIntoView()}>Shop Now</button>
              <button className="btn-ghost">View Lookbook ▶</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/image_phone.png" className="hero-img slide-img-1" style={{ gridRow: 'span 2' }} alt="Phone" />
            <img src="/image_watch.png" className="hero-img slide-img-2" alt="Watch" />
            <img src="/image_headphone.png" className="hero-img slide-img-3" alt="Headphone" />
          </div>
        </div>

        <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <div className="hero-text">
            <span className="hero-badge">Tech Arrivals</span>
            <h1>Upgrade Your <em>Digital</em> Life</h1>
            <p>Premium electronics designed to keep you connected and productive in style.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => { setActiveFilter('tech'); document.getElementById('products').scrollIntoView(); }}>Explore Tech</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/image_phone.png" className="hero-img slide-img-4" style={{ gridRow: 'span 2' }} alt="Phone" />
            <img src="/image_earbud.png" className="hero-img slide-img-2" alt="Earbud" />
            <img src="/image_watch.png" className="hero-img slide-img-3" alt="Watch" />
          </div>
        </div>

        <div className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`}>
          <div className="hero-text">
            <span className="hero-badge">New Arrivals</span>
            <h1>The <em>Artisan</em> Kitchen Edit</h1>
            <p>Handcrafted ceramics and accessories that turn cooking into ritual.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => { setActiveFilter('kitchen'); document.getElementById('products').scrollIntoView(); }}>Explore Now</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/image_mug.png" className="hero-img slide-img-3" style={{ gridRow: 'span 2' }} alt="Mug" />
            <img src="/image_candle.png" className="hero-img slide-img-1" alt="Candle" />
            <img src="/image_tote.png" className="hero-img slide-img-2" alt="Tote" />
          </div>
        </div>

        <div className="hero-dots">
          <button className={`hero-dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => setCurrentSlide(0)}></button>
          <button className={`hero-dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => setCurrentSlide(1)}></button>
          <button className={`hero-dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => setCurrentSlide(2)}></button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <span className="see-all">See all →</span>
        </div>
        <div className="cat-scroll">
          <div className={`cat-card ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
            <div className="cat-icon">🏪</div><div className="cat-name">All</div><div className="cat-count">500+</div>
          </div>
          <div className={`cat-card ${activeFilter === 'tech' ? 'active' : ''}`} onClick={() => setActiveFilter('tech')}>
            <div className="cat-icon">📱</div><div className="cat-name">Tech</div><div className="cat-count">124</div>
          </div>
          <div className={`cat-card ${activeFilter === 'home' ? 'active' : ''}`} onClick={() => setActiveFilter('home')}>
            <div className="cat-icon">🏠</div><div className="cat-name">Home</div><div className="cat-count">142</div>
          </div>
          <div className={`cat-card ${activeFilter === 'wellness' ? 'active' : ''}`} onClick={() => setActiveFilter('wellness')}>
            <div className="cat-icon">🌿</div><div className="cat-name">Wellness</div><div className="cat-count">89</div>
          </div>
          <div className={`cat-card ${activeFilter === 'accessories' ? 'active' : ''}`} onClick={() => setActiveFilter('accessories')}>
            <div className="cat-icon">💎</div><div className="cat-name">Accessories</div><div className="cat-count">217</div>
          </div>
        </div>
      </section>

      {/* DEAL OF THE DAY */}
      <section className="deal-section" id="deals">
        <div className="section-header">
          <h2>Deal of the Day</h2>
          <span className="see-all">All deals →</span>
        </div>
        <div className="deal-grid">
          <div className="deal-main">
            <div>
              <img src="/image_phone.png" alt="Phone" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
              <div className="off-tag">10% OFF</div>
              <h3>Pro Smartphone 15</h3>
              <div className="deal-price-row">
                <span className="price-big">₹74,999</span>
                <span className="price-orig">₹84,999</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>Ends in:</div>
              <div className="deal-timer-box">
                <div className="timer-block"><span>{pad(h)}</span><small>hrs</small></div>
                <div className="timer-block"><span>{pad(m)}</span><small>min</small></div>
                <div className="timer-block"><span>{pad(s)}</span><small>sec</small></div>
              </div>
              <button className="btn-primary deal-cta" onClick={() => addToCart(7, 'Phone')}>Add to Cart</button>
            </div>
          </div>
          <div className="deal-small">
            <div className="deal-mini" onClick={() => setModalProduct(products.find(x => x.id === 8))}>
              <img src="/image_watch.png" className="deal-mini-emoji" alt="Watch" />
              <div className="deal-mini-info">
                <div className="deal-mini-name">Active Smartwatch</div>
                <div><span className="deal-mini-price">₹18,499</span> <span className="deal-mini-off">20% OFF</span></div>
                <div className="deal-mini-prog"><div className="deal-mini-prog-fill" style={{ width: '72%' }}></div></div>
                <div className="deal-sold">72 sold today</div>
              </div>
            </div>
            <div className="deal-mini" onClick={() => setModalProduct(products.find(x => x.id === 9))}>
              <img src="/image_headphone.png" className="deal-mini-emoji" alt="Headphones" />
              <div className="deal-mini-info">
                <div className="deal-mini-name">Noise Cancelling Head…</div>
                <div><span className="deal-mini-price">₹24,999</span> <span className="deal-mini-off">15% OFF</span></div>
                <div className="deal-mini-prog"><div className="deal-mini-prog-fill" style={{ width: '45%' }}></div></div>
                <div className="deal-sold">45 sold today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products" id="products">
        <div className="section-header">
          <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}</h2>
          {!searchQuery && <span className="see-all">See all 500+ →</span>}
        </div>
        <div className="filter-row">
          {['all', 'tech', 'bestseller', 'new', 'sale', 'home', 'wellness'].map(f => (
            <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <select className="sort-select" value={currentSort} onChange={e => setCurrentSort(e.target.value)}>
            <option value="default">Sort: Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <div className="prod-grid">
          {displayProducts.length === 0 ? (
             <div style={{gridColumn:'1 / -1',textAlign:'center',padding:'60px 20px',color:'var(--muted)'}}>
                <i className="fa fa-search" style={{fontSize:'48px',opacity:0.3,marginBottom:'16px'}}></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
             </div>
          ) : (
            displayProducts.map(p => {
              const disc = p.orig ? Math.round((1 - p.price / p.orig) * 100) : 0;
              const wActive = wishlist.has(p.id) ? 'active' : '';
              return (
                <div className="prod-card" key={p.id} onClick={() => setModalProduct(p)}>
                  <div className="prod-img">
                    <img src={p.image} alt={p.name} />
                    <div className="prod-badges">
                      {p.badges.map(b => (
                        <span key={b} className={`pbadge ${b}`}>
                          {b === 'best' ? 'Best Seller' : b.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <button className={`prod-wish ${wActive}`} onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }} aria-label="Wishlist">
                      {wishlist.has(p.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="prod-info">
                    <div className="prod-tag">{p.tag}</div>
                    <div className="prod-name">{p.name}</div>
                    <div className="prod-stars">{'★'.repeat(p.stars)}{'☆'.repeat(5 - p.stars)}</div>
                    <div className="prod-review-count">{p.reviews.toLocaleString('en-IN')} reviews</div>
                    <div className="prod-price-row">
                      <span className="prod-price">₹{p.price.toLocaleString('en-IN')}</span>
                      {p.orig && <><span className="prod-orig">₹{p.orig.toLocaleString('en-IN')}</span><span className="prod-off">{disc}% off</span></>}
                    </div>
                    {p.emi && <div className="emi-tag">No-cost EMI from ₹{Math.round(p.price / 6).toLocaleString('en-IN')}/mo</div>}
                    <div className="prod-foot">
                      <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); }}>Add to Cart</button>
                      <button className="buy-btn" onClick={(e) => { e.stopPropagation(); addToCart(p.id, p.name); document.getElementById('cartOverlay')?.classList.add('open'); }}>Buy Now</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* OFFERS */}
      <section className="offers-section">
        <div className="section-header">
          <h2>Bank Offers & EMI</h2>
          <span className="see-all">All offers →</span>
        </div>
        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-bank">🏦</div><div className="offer-title">SBI Credit Card</div><div className="offer-desc">10% instant discount up to ₹500</div><span className="offer-badge">Min. ₹2,000</span>
          </div>
          <div className="offer-card">
            <div className="offer-bank">💳</div><div className="offer-title">HDFC Bank</div><div className="offer-desc">5% cashback on all orders</div><span className="offer-badge">No min. order</span>
          </div>
          <div className="offer-card">
            <div className="offer-bank">📱</div><div className="offer-title">UPI Cashback</div><div className="offer-desc">Flat ₹50 off on UPI payments</div><span className="offer-badge">First UPI order</span>
          </div>
          <div className="offer-card">
            <div className="offer-bank">💰</div><div className="offer-title">No-Cost EMI</div><div className="offer-desc">0% EMI on orders above ₹3,000</div><span className="offer-badge">3 / 6 / 12 months</span>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="reviews-section" id="reviews">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
        </div>
        <div className="reviews-grid">
          {userReviews.map((rev, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-stars">{'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}</div>
              <p className="review-text">"{rev.text}"</p>
              <div className="review-author">— {rev.author}</div>
            </div>
          ))}
        </div>
        
        <div className="feedback-container">
          <h3>Leave Your Feedback</h3>
          <p>We're always looking to improve. Share your thoughts with us!</p>
          <form className="feedback-form" onSubmit={(e) => { 
            e.preventDefault(); 
            const name = e.target.elements.name.value;
            const text = e.target.elements.feedback.value;
            setUserReviews([{ stars: 5, text, author: name }, ...userReviews]);
            showToast('Thank you! Your feedback has been published.'); 
            e.target.reset(); 
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input name="name" type="text" placeholder="Your Name" required />
              <input name="email" type="email" placeholder="Your Email" required />
            </div>
            <textarea name="feedback" placeholder="Write your feedback here..." rows="4" required></textarea>
            <button type="submit" className="btn-primary">Submit Feedback</button>
          </form>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <h2>The MAISON Philosophy</h2>
            <p>
              Founded on the principles of timeless design and enduring quality, MAISON curates a collection of premium goods spanning home, wellness, and cutting-edge technology.
            </p>
            <p>
              We believe that the objects we surround ourselves with should elevate our daily rituals. Every product on our platform is rigorously vetted for craftsmanship, sustainability, and aesthetic brilliance. Welcome to a better way of living.
            </p>
            <button className="btn-primary" style={{marginTop:'16px'}}>Read Our Story</button>
          </div>
          <div className="about-image">
            <img src="/image_candle.png" alt="About Maison" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">MAISON</span>
            <p>Premium goods curated with intention. Every product chosen for beauty, craft, and enduring quality.</p>
          </div>
          <div><h4>Shop</h4>
            <ul>
              <li onClick={() => { setActiveFilter('tech'); document.getElementById('products').scrollIntoView({behavior: 'smooth'}); }}>Tech Hub</li>
              <li onClick={() => { setActiveFilter('home'); document.getElementById('products').scrollIntoView({behavior: 'smooth'}); }}>Home & Living</li>
              <li onClick={() => { setActiveFilter('wellness'); document.getElementById('products').scrollIntoView({behavior: 'smooth'}); }}>Wellness</li>
            </ul>
          </div>
          <div><h4>Account</h4>
            <ul>
              <li onClick={() => setIsAccountOpen(true)}>My Orders</li>
              <li onClick={() => setIsWishlistOpen(true)}>Wishlist</li>
              <li onClick={() => setIsAccountOpen(true)}>Profile</li>
            </ul>
          </div>
          <div><h4>Support</h4>
            <ul>
              <li onClick={() => showToast('Tracking details have been sent to your registered email.')}>Track Order</li>
              <li onClick={() => setIsAccountOpen(true)}>Returns & Refunds</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 MAISON. All rights reserved.</div>
          <div className="payment-icons">
            {['VISA', 'MC', 'UPI', 'GPay', 'EMI'].map(pay => <span key={pay} className="pay-icon">{pay}</span>)}
          </div>
        </div>
      </footer>

      {/* MODALS & SIDEBARS */}
      <CartSidebar products={products} />
      <WishlistSidebar products={products} />
      <AccountSidebar />
      <CheckoutModal />

      {/* PRODUCT MODAL */}
      <div className={`modal-wrap ${modalProduct ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('modal-wrap')) setModalProduct(null) }}>
        {modalProduct && (
          <div className="modal">
            <button className="modal-close" onClick={() => setModalProduct(null)}>×</button>
            <div className="modal-img-container">
              <img src={modalProduct.image} alt={modalProduct.name} className="modal-img-real" />
            </div>
            <div className="modal-body">
              <div className="modal-tag">{modalProduct.tag}</div>
              <div className="modal-name">{modalProduct.name}</div>
              <div className="modal-stars">{'★'.repeat(modalProduct.stars)}{'☆'.repeat(5 - modalProduct.stars)} <span style={{fontSize:'12px',color:'var(--muted)'}}>({modalProduct.reviews} reviews)</span></div>
              <div className="modal-price-row">
                <span className="modal-price">₹{modalProduct.price.toLocaleString('en-IN')}</span>
                {modalProduct.orig && <><span className="modal-orig">₹{modalProduct.orig.toLocaleString('en-IN')}</span><span className="modal-off">{Math.round((1 - modalProduct.price / modalProduct.orig) * 100)}% OFF</span></>}
              </div>
              <div className="modal-desc">{modalProduct.desc}</div>
              <div style={{fontSize:'12px',fontWeight:600,marginBottom:'8px',color:'var(--muted)'}}>SELECT OPTIONS</div>
              <div className="modal-sizes">
                {['Standard', 'Pro'].map(s => (
                  <button key={s} className={`size-btn ${selectedSize === s ? 'active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
              <div className="modal-actions">
                <button className="modal-add" onClick={() => addToCart(modalProduct.id, modalProduct.name)}>Add to Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
