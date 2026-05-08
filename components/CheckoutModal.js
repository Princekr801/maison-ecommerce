'use client';
import { useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, clearCart, showToast } = useStore();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment Method, 3: Payment Details, 4: Success
  const [payMethod, setPayMethod] = useState(''); // 'card', 'upi', 'cod'

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => { setStep(1); setPayMethod(''); }, 300); // Reset after close animation
  };

  const submitAddress = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPaymentMethod = (e) => {
    e.preventDefault();
    if (payMethod === 'cod') {
      completeOrder();
    } else {
      setStep(3);
    }
  };

  const completeOrder = (e) => {
    if (e) e.preventDefault();
    setStep(4);
    clearCart();
    showToast('🎉 Order placed successfully!');
  };

  return (
    <div className="modal-wrap open" onClick={(e) => { if (e.target.classList.contains('modal-wrap') && step !== 4) handleClose(); }}>
      <div className="modal checkout-modal">
        {step !== 4 && <button className="modal-close" onClick={handleClose}>×</button>}
        
        {step === 1 && (
          <div className="modal-body">
            <h3 style={{fontFamily:'var(--ff-serif)',fontSize:'24px',marginBottom:'16px'}}>Delivery Address</h3>
            <form onSubmit={submitAddress} className="checkout-form">
              <input required type="text" placeholder="Full Name" />
              <input required type="text" placeholder="Phone Number" />
              <input required type="text" placeholder="Street Address" />
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                <input required type="text" placeholder="City" />
                <input required type="text" placeholder="PIN Code" />
              </div>
              <button type="submit" className="btn-primary" style={{width:'100%',marginTop:'16px'}}>Continue to Payment</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="modal-body">
            <h3 style={{fontFamily:'var(--ff-serif)',fontSize:'24px',marginBottom:'16px'}}>Payment Method</h3>
            <form onSubmit={submitPaymentMethod} className="checkout-form">
              <label className={`pay-option ${payMethod === 'card' ? 'selected' : ''}`}>
                <input required type="radio" name="payment" value="card" onChange={(e) => setPayMethod(e.target.value)} />
                💳 Credit / Debit Card
              </label>
              <label className={`pay-option ${payMethod === 'upi' ? 'selected' : ''}`}>
                <input required type="radio" name="payment" value="upi" onChange={(e) => setPayMethod(e.target.value)} />
                📱 UPI / GPay
              </label>
              <label className={`pay-option ${payMethod === 'cod' ? 'selected' : ''}`}>
                <input required type="radio" name="payment" value="cod" onChange={(e) => setPayMethod(e.target.value)} />
                💵 Cash on Delivery
              </label>
              <div style={{display:'flex',gap:'10px',marginTop:'16px'}}>
                <button type="button" className="btn-ghost" onClick={() => setStep(1)} style={{color:'var(--ink)',borderColor:'#e0d8d0'}}>Back</button>
                <button type="submit" className="btn-primary" style={{flex:1}}>Continue</button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="modal-body">
            <h3 style={{fontFamily:'var(--ff-serif)',fontSize:'24px',marginBottom:'16px'}}>Payment Details</h3>
            <form onSubmit={completeOrder} className="checkout-form">
              {payMethod === 'card' && (
                <>
                  <input required type="text" placeholder="Card Number (0000 0000 0000 0000)" maxLength="19" />
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                    <input required type="text" placeholder="MM/YY" maxLength="5" />
                    <input required type="password" placeholder="CVV" maxLength="3" />
                  </div>
                  <input required type="text" placeholder="Name on Card" />
                </>
              )}
              {payMethod === 'upi' && (
                <input required type="text" placeholder="Enter UPI ID (e.g. name@bank)" />
              )}
              <div style={{display:'flex',gap:'10px',marginTop:'16px'}}>
                <button type="button" className="btn-ghost" onClick={() => setStep(2)} style={{color:'var(--ink)',borderColor:'#e0d8d0'}}>Back</button>
                <button type="submit" className="btn-primary" style={{flex:1}}>Pay & Place Order</button>
              </div>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="modal-body" style={{textAlign:'center',padding:'40px 20px'}}>
            <div style={{fontSize:'64px',marginBottom:'16px'}}>✅</div>
            <h3 style={{fontFamily:'var(--ff-serif)',fontSize:'28px',marginBottom:'10px',color:'var(--accent)'}}>Order Confirmed!</h3>
            <p style={{color:'var(--muted)',marginBottom:'24px'}}>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
            <button className="btn-primary" onClick={handleClose}>Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}
