'use client';
import { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState(new Set());
  const [toastMsg, setToastMsg] = useState('');
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  const addToCart = (id, emoji) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    if (emoji) showToast(`${emoji} Added to cart!`);
  };

  const changeQty = (id, delta) => {
    setCart((prev) => {
      const newCart = { ...prev };
      newCart[id] = Math.max(0, (newCart[id] || 0) + delta);
      if (newCart[id] === 0) delete newCart[id];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const newWish = new Set(prev);
      if (newWish.has(id)) {
        newWish.delete(id);
        showToast('Removed from wishlist');
      } else {
        newWish.add(id);
        showToast('♥ Added to wishlist');
      }
      return newWish;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, changeQty, clearCart, cartCount,
      wishlist, toggleWishlist,
      isCartOpen, setIsCartOpen,
      isWishlistOpen, setIsWishlistOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      isAccountOpen, setIsAccountOpen,
      searchQuery, setSearchQuery,
      toastMsg, showToast
    }}>
      {children}
      <div className={`toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
