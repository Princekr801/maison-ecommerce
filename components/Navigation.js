'use client';
import { useStore } from '@/context/StoreContext';
import { useState } from 'react';

export default function Navigation() {
  const { cartCount, wishlist, setIsCartOpen, setIsWishlistOpen, setIsAccountOpen, searchQuery, setSearchQuery } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      const shopSection = document.getElementById('products');
      if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="ann-bar">
        <span>🚚 Free delivery on orders above ₹999</span>
        <span className="ann-sep">·</span>
        <span>📦 Easy 30-day returns</span>
        <span className="ann-sep">·</span>
        <span>⚡ Same-day dispatch before 2 PM</span>
      </div>

      <nav id="navbar">
        <div className="nav-logo">MAISON</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#deals">Deals</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="nav-right">
          <div className="search-wrap">
            <i className="fa fa-search"></i>
            <input 
              className="nav-search" 
              type="text" 
              placeholder="Search products, brands…" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button className="icon-btn" onClick={() => setIsWishlistOpen(true)} aria-label="Wishlist">
            <i className="fa fa-heart"></i>
            <span className={`badge-dot ${wishlist.size > 0 ? 'visible' : ''}`}></span>
          </button>
          <button className="icon-btn" onClick={() => setIsAccountOpen(true)} aria-label="Account">
            <i className="fa fa-user"></i>
          </button>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Cart">
            <i className="fa fa-shopping-bag"></i> Cart
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <i className="fa fa-bars"></i>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#deals" onClick={() => setMenuOpen(false)}>Deals</a>
        <a href="#products" onClick={() => setMenuOpen(false)}>Shop</a>
        <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
      </div>
    </>
  );
}
