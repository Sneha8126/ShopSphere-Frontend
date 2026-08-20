import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { orderAPI } from "../services/api.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

const STEPS = ["Shipping Address", "Payment Method", "Review & Place Order"];

const Checkout = () => {
  const { items, subtotal, totalDiscount, shippingCost, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(
    user.addresses?.find((a) => a.isDefault)?._id || user.addresses?.[0]?._id || ""
  );
  const [manualAddress, setManualAddress] = useState(emptyAddress);
  const [useManualAddress, setUseManualAddress] = useState(!user.addresses || user.addresses.length === 0);
  const [addressErrors, setAddressErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState("");

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const getShippingAddress = () => {
    if (useManualAddress) return manualAddress;
    const addr = user.addresses.find((a) => a._id === selectedAddressId);
    return addr
      ? {
          fullName: addr.fullName,
          phone: addr.phone,
          addressLine1: addr.addressLine1,
          addressLine2: addr.addressLine2,
          city: addr.city,
          state: addr.state,
          postalCode: addr.postalCode,
          country: addr.country,
        }
      : emptyAddress;
  };

  const validateAddressStep = () => {
    if (!useManualAddress) return true;
    const errs = {};
    ["fullName", "phone", "addressLine1", "city", "state", "postalCode"].forEach((f) => {
      if (!manualAddress[f].trim()) errs[f] = "Required";
    });
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateAddressStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handlePlaceOrder = async () => {
    setPlaceError("");
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ product: i.productId, quantity: i.quantity }));
      const { data } = await orderAPI.create({
        orderItems,
        shippingAddress: getShippingAddress(),
        paymentMethod,
      });
      clearCart();
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      setPlaceError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Checkout</h1>

      <div className="checkout-steps mb-4">
        {STEPS.map((label, i) => (
          <div key={label} className={`checkout-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <span className="checkout-step-num">{i + 1}</span>
            {label}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="card" style={{ padding: 24 }}>
          {step === 0 && (
            <div>
              <h3 className="mb-3">Shipping Address</h3>

              {user.addresses?.length > 0 && (
                <div className="mb-3">
                  {user.addresses.map((addr) => (
                    <label key={addr._id} className="address-radio">
                      <input
                        type="radio"
                        name="savedAddress"
                        checked={!useManualAddress && selectedAddressId === addr._id}
                        onChange={() => {
                          setUseManualAddress(false);
                          setSelectedAddressId(addr._id);
                        }}
                      />
                      <div>
                        <strong>{addr.label} — {addr.fullName}</strong>
                        <p className="text-muted">{addr.addressLine1}, {addr.city}, {addr.state} {addr.postalCode}</p>
                      </div>
                    </label>
                  ))}
                  <button className="btn btn-outline btn-sm mt-2" onClick={() => setUseManualAddress(true)}>
                    Use a different address
                  </button>
                </div>
              )}

              {useManualAddress && (
                <div className="address-form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={manualAddress.fullName} onChange={(e) => setManualAddress((f) => ({ ...f, fullName: e.target.value }))} />
                    {addressErrors.fullName && <p className="form-error">{addressErrors.fullName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={manualAddress.phone} onChange={(e) => setManualAddress((f) => ({ ...f, phone: e.target.value }))} />
                    {addressErrors.phone && <p className="form-error">{addressErrors.phone}</p>}
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Address Line 1</label>
                    <input className="form-input" value={manualAddress.addressLine1} onChange={(e) => setManualAddress((f) => ({ ...f, addressLine1: e.target.value }))} />
                    {addressErrors.addressLine1 && <p className="form-error">{addressErrors.addressLine1}</p>}
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Address Line 2 (optional)</label>
                    <input className="form-input" value={manualAddress.addressLine2} onChange={(e) => setManualAddress((f) => ({ ...f, addressLine2: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input className="form-input" value={manualAddress.city} onChange={(e) => setManualAddress((f) => ({ ...f, city: e.target.value }))} />
                    {addressErrors.city && <p className="form-error">{addressErrors.city}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input className="form-input" value={manualAddress.state} onChange={(e) => setManualAddress((f) => ({ ...f, state: e.target.value }))} />
                    {addressErrors.state && <p className="form-error">{addressErrors.state}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input className="form-input" value={manualAddress.postalCode} onChange={(e) => setManualAddress((f) => ({ ...f, postalCode: e.target.value }))} />
                    {addressErrors.postalCode && <p className="form-error">{addressErrors.postalCode}</p>}
                  </div>
                </div>
              )}

              <button className="btn btn-primary mt-3" onClick={handleNext}>Continue to Payment</button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="mb-3">Payment Method</h3>
              <label className="payment-option">
                <input type="radio" name="payment" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} />
                <div>
                  <strong>Cash on Delivery</strong>
                  <p className="text-muted">Pay with cash when your order arrives.</p>
                </div>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" checked={paymentMethod === "Test Card"} onChange={() => setPaymentMethod("Test Card")} />
                <div>
                  <strong>Test Card (Mock Payment)</strong>
                  <p className="text-muted">Simulates a card payment for demo purposes. No real charge is made.</p>
                </div>
              </label>
              <div className="flex gap-3 mt-3">
                <button className="btn btn-outline" onClick={() => setStep(0)}>Back</button>
                <button className="btn btn-primary" onClick={handleNext}>Review Order</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="mb-3">Review Your Order</h3>

              <div className="mb-3">
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Shipping to:</p>
                <p className="text-muted">
                  {getShippingAddress().fullName}, {getShippingAddress().addressLine1}, {getShippingAddress().city},{" "}
                  {getShippingAddress().state} {getShippingAddress().postalCode} · {getShippingAddress().phone}
                </p>
              </div>

              <div className="mb-3">
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Payment method:</p>
                <p className="text-muted">{paymentMethod}</p>
              </div>

              <div className="mb-3">
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Items ({items.length}):</p>
                {items.map((item) => (
                  <div key={item.productId} className="order-item-row mb-2">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</p>
                      <p className="text-muted" style={{ fontSize: "0.82rem" }}>Qty: {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {placeError && <p className="form-error mb-3">{placeError}</p>}

              <div className="flex gap-3">
                <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="cart-summary card">
          <h3 className="mb-3">Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal + totalDiscount)}</span></div>
          {totalDiscount > 0 && (
            <div className="summary-row" style={{ color: "var(--color-success)" }}>
              <span>Discount</span><span>-{formatPrice(totalDiscount)}</span>
            </div>
          )}
          <div className="summary-row"><span>Delivery</span><span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
