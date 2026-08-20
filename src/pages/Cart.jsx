import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal, totalDiscount, shippingCost, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <ShoppingBag size={48} color="var(--color-text-faint)" />
        <h3 className="mt-3">Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-primary mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Shopping Cart ({itemCount} items)</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item card">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <Link to={`/product/${item.productId}`} className="cart-item-title">{item.title}</Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="price">{formatPrice(item.price)}</span>
                  {item.originalPrice > item.price && (
                    <span className="price-strike">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>
                <p className="text-faint mt-2" style={{ fontSize: "0.8rem" }}>
                  {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="qty-selector">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="btn-icon-danger" onClick={() => removeFromCart(item.productId)} aria-label="Remove item">
                    <Trash2 size={17} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary card">
          <h3 className="mb-3">Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal + totalDiscount)}</span></div>
          {totalDiscount > 0 && (
            <div className="summary-row" style={{ color: "var(--color-success)" }}>
              <span>Discount</span><span>-{formatPrice(totalDiscount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
          </div>
          {shippingCost > 0 && (
            <p className="text-faint" style={{ fontSize: "0.78rem" }}>
              Add {formatPrice(999 - subtotal)} more for free delivery
            </p>
          )}
          <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <button className="btn btn-primary btn-block mt-3" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
