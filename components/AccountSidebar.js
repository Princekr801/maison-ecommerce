'use client';
import { useStore } from '@/context/StoreContext';

export default function AccountSidebar() {
  const { isAccountOpen, setIsAccountOpen, showToast } = useStore();

  return (
    <div className={`side-overlay ${isAccountOpen ? 'open' : ''}`} onClick={(e) => { if(e.target.classList.contains('side-overlay')) setIsAccountOpen(false) }}>
      <div className="side-panel">
        <div className="side-header">
          <h3>My Account</h3>
          <button className="close-btn" onClick={() => setIsAccountOpen(false)}>×</button>
        </div>
        
        <div className="account-scroll">
          <div className="account-user">
            <div className="account-avatar">JD</div>
            <div className="account-info">
              <div className="account-name">John Doe</div>
              <div className="account-email">john.doe@example.com</div>
            </div>
          </div>

          <div className="account-section">
            <h4>Saved Cards</h4>
            <div className="account-card-item">
              <span>💳 **** **** **** 4242</span>
              <button className="btn-icon" onClick={() => showToast('Card removed')}>🗑</button>
            </div>
            <div className="account-card-item">
              <span>💳 **** **** **** 1234</span>
              <button className="btn-icon" onClick={() => showToast('Card removed')}>🗑</button>
            </div>
          </div>

          <div className="account-section">
            <h4>Order History</h4>
            <div className="account-order">
              <div style={{flex:1}}>
                <div style={{fontSize:'12px',color:'var(--muted)'}}>Order #MSN-8472</div>
                <div style={{fontWeight:500,fontSize:'13px'}}>Artisan Soy Candle</div>
              </div>
              <span style={{fontSize:'11px',background:'var(--accent-light)',color:'var(--accent)',padding:'3px 8px',borderRadius:'4px',fontWeight:600}}>Delivered</span>
            </div>
            <div className="account-order">
              <div style={{flex:1}}>
                <div style={{fontSize:'12px',color:'var(--muted)'}}>Order #MSN-9102</div>
                <div style={{fontWeight:500,fontSize:'13px'}}>Pro Smartphone 15</div>
              </div>
              <span style={{fontSize:'11px',background:'#ffe0e0',color:'var(--danger)',padding:'3px 8px',borderRadius:'4px',fontWeight:600}}>Processing</span>
            </div>
          </div>

          <div className="account-links">
            <button className="account-link-btn" onClick={() => showToast('Passwords managed securely via Auth provider')}>
              <i className="fa fa-key"></i> Saved Passwords
            </button>
            <button className="account-link-btn" onClick={() => showToast('Redirecting to Support Center...')}>
              <i className="fa fa-headset"></i> Support / Help
            </button>
            <button className="account-link-btn" style={{color:'var(--danger)'}} onClick={() => { setIsAccountOpen(false); showToast('Logged out successfully'); }}>
              <i className="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
