import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { orderAPI } from "../services/api.js";
import { Spinner } from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await orderAPI.getById(id);
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Spinner label="Loading order..." />;

  if (error || !order) {
    return (
      <div className="container" style={{ paddingTop: 24 }}>
        <ErrorMessage message={error || "Order not found."} onRetry={load} />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 720 }}>
      <div className="text-center mb-4">
        <CheckCircle2 size={56} color="var(--color-success)" />
        <h1 style={{ fontSize: "1.5rem" }} className="mt-3">Order Placed Successfully!</h1>
        <p className="text-muted mt-2">Thank you for shopping with ShopSphere. A confirmation has been recorded for your order.</p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-faint" style={{ fontSize: "0.78rem" }}>ORDER ID</p>
            <p style={{ fontWeight: 700 }}>{order._id}</p>
          </div>
          <span className="badge badge-warn">{order.orderStatus}</span>
        </div>

        <div className="order-card-items mb-3">
          {order.orderItems.map((item, i) => (
            <div key={i} className="order-item-row">
              <img src={item.image} alt={item.title} />
              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</p>
                <p className="text-muted" style={{ fontSize: "0.82rem" }}>Qty: {item.quantity} × {formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-row"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
        <div className="summary-row"><span>Delivery</span><span>{order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}</span></div>
        <div className="summary-row summary-total"><span>Total</span><span>{formatPrice(order.total)}</span></div>

        <div className="delivery-info mt-3">
          <p style={{ fontWeight: 600, marginBottom: 4 }}>Delivery Address</p>
          <p>
            {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </p>
          <p>Payment: {order.paymentMethod} · {order.paymentStatus}</p>
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-4">
        <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
        <Link to="/orders" className="btn btn-primary">View All Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
