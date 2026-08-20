import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  UserRound,
  Menu,
  X,
  LogOut,
  Package,
  LayoutDashboard,
  ChevronDown,
  MapPin,
} from "lucide-react";

import SearchBar from "./SearchBar.jsx";
import CategoryNav from "./CategoryNav.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="amazon-header">
      {/* MAIN NAVBAR */}
      <div className="navbar-top">
        <div className="container navbar-main">

          {/* MOBILE MENU */}
          <button
            type="button"
            className="mobile-nav-trigger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="navbar-logo"
            aria-label="ShopSphere home"
          >
            Shop<span>Sphere</span>
          </Link>

          {/* DELIVERY */}
          <Link
            to="/products"
            className="deliver-to hide-mobile"
          >
            <MapPin size={17} />

            <span>
              <small>Deliver to</small>
              <strong>India</strong>
            </span>
          </Link>

          {/* SEARCH */}
          <div className="navbar-search-wrap">
            <SearchBar />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="navbar-actions">

            {/* ACCOUNT */}
            <div
              className="navbar-account"
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                type="button"
                className="nav-action account-action"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
              >
                <UserRound size={21} />

                <span className="nav-action-copy">
                  <small>
                    {isAuthenticated
                      ? `Hello, ${user?.name?.split(" ")[0] || "there"}`
                      : "Hello, sign in"}
                  </small>

                  <strong>
                    Account &amp; Lists
                    <ChevronDown size={12} />
                  </strong>
                </span>
              </button>

              {accountOpen && (
                <div className="navbar-dropdown">

                  <div className="dropdown-heading">
                    {isAuthenticated
                      ? `Hello, ${user?.name || "there"}`
                      : "Welcome to ShopSphere"}
                  </div>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setAccountOpen(false)}
                      >
                        Your Account
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setAccountOpen(false)}
                      >
                        Your Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setAccountOpen(false)}
                        >
                          <LayoutDashboard size={15} />
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="navbar-dropdown-logout"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setAccountOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ORDERS */}
            <Link
              to="/orders"
              className="nav-action orders-action hide-mobile"
            >
              <Package size={21} />

              <span className="nav-action-copy">
                <small>Returns</small>
                <strong>&amp; Orders</strong>
              </span>
            </Link>

            {/* CART */}
            <Link to="/cart" className="nav-cart">
              <span className="cart-icon-wrap">
                <ShoppingCart size={29} />

                {itemCount > 0 && (
                  <b>{itemCount}</b>
                )}
              </span>

              <strong className="hide-mobile">
                Cart
              </strong>
            </Link>
          </div>
        </div>
      </div>

      {/* SECONDARY CATEGORY NAV */}
      <CategoryNav />

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">

            <div className="mobile-welcome">
              <UserRound size={22} />

              <strong>
                {isAuthenticated
                  ? `Hello, ${user?.name || "there"}`
                  : "Hello, sign in"}
              </strong>
            </div>

            <SearchBar />

            <div className="mobile-menu-grid">

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
              >
                All Products
              </Link>

              <Link
                to="/products?sort=discount"
                onClick={() => setMenuOpen(false)}
              >
                Today's Deals
              </Link>

              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
              >
                Your Orders
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
              >
                Cart ({itemCount})
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Your Account
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

              {!isAuthenticated && (
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Account
                </Link>
              )}

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;