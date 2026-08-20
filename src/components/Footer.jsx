import { Link } from "react-router-dom";
import { ArrowUp, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="market-footer">
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUp size={15} /> Back to top
    </button>

    <div className="footer-main">
      <div className="container footer-columns">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">Shop<span>Sphere</span></Link>
          <p>Everything you need, from everyday essentials to the latest tech — all in one place.</p>
          <div className="footer-socials">
            <span><Facebook size={16} /></span>
            <span><Instagram size={16} /></span>
            <span><Twitter size={16} /></span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <Link to="/products">About ShopSphere</Link>
          <Link to="/products">Careers</Link>
          <Link to="/products">Press Releases</Link>
          <Link to="/products">Our Story</Link>
        </div>

        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <Link to="/products">Sell on ShopSphere</Link>
          <Link to="/products">Advertise Your Products</Link>
          <Link to="/products">Affiliate Program</Link>
          <Link to="/products">Become a Partner</Link>
        </div>

        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <Link to="/profile">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/cart">Shipping & Delivery</Link>
          <Link to="/products">Returns & Refunds</Link>
          <Link to="/products">Help Center</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <span>support@shopsphere.dev</span>
          <span>Mon–Sat, 9 AM–7 PM</span>
          <span>Secure payments</span>
          <span>Fast delivery across India</span>
        </div>
      </div>
    </div>

    <div className="footer-mid">
      <div className="container footer-mid-inner">
        <Link to="/" className="footer-logo small">Shop<span>Sphere</span></Link>
        <div className="footer-controls"><button>🌐 English</button><button>🇮🇳 India</button></div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="container footer-bottom-links">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Your Ads Privacy Choices</span>
        <span>© {new Date().getFullYear()} ShopSphere</span>
      </div>
    </div>
  </footer>
);

export default Footer;
