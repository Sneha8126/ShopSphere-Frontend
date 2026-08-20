import { Link } from "react-router-dom";
import { Menu, Tag, Headphones, Gift, Store } from "lucide-react";

const CATEGORIES = [
  "Mobiles", "Laptops", "Electronics", "Fashion", "Shoes",
  "Home & Kitchen", "Beauty", "Grocery", "Books", "Sports", "Accessories",
];

const CategoryNav = () => (
  <nav className="category-nav">
    <div className="container category-nav-inner">
      <Link to="/products" className="category-nav-all"><Menu size={17} /> All</Link>
      <Link to="/products?sort=discount" className="category-nav-special"><Tag size={15} /> Today's Deals</Link>
      <Link to="/products">Customer Service</Link>
      <Link to="/products">Gift Cards</Link>
      <Link to="/products">Sell on ShopSphere</Link>
      <span className="category-divider" />
      {CATEGORIES.map((cat) => (
        <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}>
          {cat}
        </Link>
      ))}
    </div>
  </nav>
);

export default CategoryNav;
