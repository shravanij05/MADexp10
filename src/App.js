import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, X, Plus, Minus, Trash2, ChevronRight, Star, ArrowRight, Filter
} from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const GlobalStyles = () => (
  <style>{`
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg: #fdfdfd;
      --text-main: #111827;
      --text-muted: #6b7280;
      --border: #f3f4f6;
      --white: #ffffff;
      --black: #000000;
      --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      overflow-x: hidden;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      height: 64px;
      display: flex;
      align-items: center;
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 800;
      font-size: 1.25rem;
      text-decoration: none;
      color: var(--text-main);
    }
    .logo-icon {
      background: var(--primary);
      color: white;
      padding: 6px;
      border-radius: 8px;
      display: flex;
    }
    .nav-links {
      display: none;
      gap: 2rem;
    }
    @media (min-width: 768px) { .nav-links { display: flex; } }
    .nav-link {
      background: none;
      border: none;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted);
      cursor: pointer;
      transition: var(--transition);
    }
    .nav-link.active { color: var(--primary); }
    .nav-actions { display: flex; align-items: center; gap: 1rem; }
    .icon-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      position: relative;
      transition: var(--transition);
    }
    .icon-btn:hover { background: var(--border); color: var(--text-main); }
    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--primary);
      color: white;
      font-size: 10px;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero {
      background: #030712;
      color: white;
      padding: 80px 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero-blob {
      position: absolute;
      width: 40%;
      height: 60%;
      background: var(--primary);
      filter: blur(120px);
      opacity: 0.2;
      border-radius: 50%;
    }
    .hero-tag {
      background: rgba(79, 70, 229, 0.1);
      color: #818cf8;
      padding: 6px 16px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 24px;
      display: inline-block;
    }
    .hero h1 {
      font-size: clamp(2.5rem, 8vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 32px;
    }
    .hero .gradient-text {
      background: linear-gradient(to right, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      max-width: 600px;
      margin: 0 auto 40px;
      color: #9ca3af;
      font-size: 1.125rem;
      line-height: 1.6;
    }
    .btn {
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary { background: white; color: var(--black); }
    .btn-secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.1); }
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 48px 0 32px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 32px;
    }
    .card {
      background: white;
      border-radius: 20px;
      transition: var(--transition);
      position: relative;
    }
    .card:hover { transform: translateY(-8px); }
    .card-img-wrapper {
      position: relative;
      aspect-ratio: 1;
      border-radius: 16px;
      overflow: hidden;
      background: var(--border);
      width: 100%;
      height: auto;
      max-width: 100%;
    }
    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card:hover .card-img { transform: scale(1.1); }
    .add-btn {
      position: absolute;
      bottom: 16px;
      right: 16px;
      background: var(--primary);
      color: white;
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(10px);
      transition: var(--transition);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
    }
    .card:hover .add-btn { opacity: 1; transform: translateY(0); }
    
    /* Sidebar */
    .sidebar-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 2000;
    }
    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 400px;
      background: white;
      z-index: 2001;
      display: flex;
      flex-direction: column;
      box-shadow: -10px 0 30px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    
    .sidebar-header {
      padding: 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sidebar-content { flex: 1; overflow-y: auto; padding: 24px; }
    .sidebar-footer { padding: 24px; background: #f9fafb; border-top: 1px solid var(--border); }

    .cart-item { display: flex; gap: 16px; margin-bottom: 24px; }
    .cart-item-img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; }
    .qty-controls { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 4px; }
    .qty-btn { background: none; border: none; padding: 4px; cursor: pointer; }

    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {
      .container { padding-left: 1rem; padding-right: 1rem; }
      .card-img-wrapper { max-width: 90%; margin: 0 auto; }
      .card-img { width: 100%; height: auto; }
      .hero { padding: 40px 1rem; }
      .btn { padding: 12px 24px; font-size: 0.9rem; }
    }

    @media (max-width: 480px) {
      .container { padding-left: 0.75rem; padding-right: 0.75rem; }
      .card-img-wrapper { max-width: 100%; }
      .hero h1 { font-size: clamp(1.8rem, 10vw, 3rem); }
      .hero p { font-size: 1rem; }
      .btn { padding: 10px 20px; font-size: 0.85rem; }
    }
  `}</style>
);

const PRODUCTS = [
  { id: 1, name: 'Minimalist Leather Watch', price: 15999, category: 'Accessories', rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: 2, name: 'Cloud Comfort Sneakers', price: 8499, category: 'Footwear', rating: 4.9, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
  { id: 3, name: 'Noise-Cancelling Headphones', price: 24999, category: 'Electronics', rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
  { id: 4, name: 'Premium Cotton Hoodie', price: 4299, category: 'Apparel', rating: 4.6, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
];

const CATEGORIES = ['All', 'Accessories', 'Footwear', 'Electronics', 'Apparel'];

const Navbar = ({ cartCount, onOpenCart, activeCategory, setActiveCategory }) => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo">
        <div className="logo-icon"><ShoppingBag size={20} /></div>
        <span>ZENVY</span>
      </div>
      <div className="nav-links">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`nav-link ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="nav-actions">
        <button className="icon-btn"><Search size={20} /></button>
        <button onClick={onOpenCart} className="icon-btn">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  </nav>
);

const ProductCard = ({ product, onAddToCart }) => (
  <div className="card">
    <div className="card-img-wrapper">
      <img src={product.image} alt={product.name} className="card-img" />
      <button className="add-btn" onClick={() => onAddToCart(product)}>
        <Plus size={24} />
      </button>
    </div>
    <div style={{ padding: '16px 8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700' }}>{product.name}</h3>
        <span style={{ fontWeight: '800' }}>
          {currencyFormatter.format(product.price)}
        </span>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        {product.category}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
        <Star size={14} fill="#fbbf24" color="#fbbf24" />
        <span style={{ fontSize: '12px', fontWeight: '600' }}>{product.rating}</span>
      </div>
    </div>
  </div>
);

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) => {
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  if (!isOpen) return null;
  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Your Cart ({cartItems.length})</h2>
          <button className="icon-btn" onClick={onClose}><X size={24} /></button>
        </div>
        <div className="sidebar-content">
          {cartItems.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '48px' }}>
              Your cart is empty.
            </p>
          )}
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} className="cart-item-img" alt={item.name} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4>{item.name}</h4>
                  <span>{currencyFormatter.format(item.price * item.quantity)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={12} />
                    </button>
                    <span style={{ width: '24px', textAlign: 'center' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <button className="icon-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: '800' }}>
            <span>Subtotal</span>
            <span>{currencyFormatter.format(subtotal)}</span>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', background: 'var(--primary)', color: 'white', justifyContent: 'center' }}
          >
            Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default function App() {
  // ✅ All state declarations — this was the missing piece
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    return activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Add to cart — increments quantity if already in cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update quantity — removes item if quantity drops to 0
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-root">
      <GlobalStyles />
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main>
        <section className="hero">
          <div className="hero-blob" style={{ top: '-10%', left: '-10%' }} />
          <div className="hero-blob" style={{ bottom: '-10%', right: '-10%', background: '#a855f7' }} />
          <div className="container" style={{ position: 'relative' }}>
            <span className="hero-tag">Summer Drops 2026</span>
            <h1>
              Essential Goods for <br />
              <span className="gradient-text">Modern Living.</span>
            </h1>
            <p>Carefully curated essentials designed for quality, comfort, and aesthetics.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <button className="btn btn-primary">
                Shop Now <ChevronRight size={18} />
              </button>
              <button className="btn btn-secondary">View Lookbook</button>
            </div>
          </div>
        </section>

        <section className="container" style={{ padding: '64px 0' }}>
          <div className="section-title">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Featured Products</h2>
            <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filter
            </button>
          </div>
          <div className="grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <footer style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '80px 0 40px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
            <p>© 2026 Zenvy Studio. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}