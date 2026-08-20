import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { orderAPI } from "../services/api.js";
import { Spinner } from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const statusBadgeClass = (status) => {
  if (status === "Delivered") return "badge-success";
  if (status === "Cancelled") return "badge-danger";
  if (status === "Shipped" || status === "Out for Delivery") return "badge-teal";
  return "badge-warn";
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await orderAPI.getMine();
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Spinner label="Loading your orders..." />;

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Your Orders</h1>

      {error && <ErrorMessage message={error} onRetry={load} />}

      {orders.length === 0 ? (
        <div className="empty-state">
          <Package size={48} color="var(--color-text-faint)" />
          <h3 className="mt-3">No orders yet</h3>
          <p>Once you place an order, it will show up here.</p>
          <Link to="/products" className="btn btn-primary mt-3">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="card order-card">
              <div className="order-card-header">
                <div>
                  <p className="text-faint" style={{ fontSize: "0.78rem" }}>ORDER ID</p>
                  <p style={{ fontWeight: 700 }}>{order._id}</p>
                </div>
                <div>
                  <p className="text-faint" style={{ fontSize: "0.78rem" }}>PLACED ON</p>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-faint" style={{ fontSize: "0.78rem" }}>TOTAL</p>
                  <p style={{ fontWeight: 700 }}>{formatPrice(order.total)}</p>
                </div>
                <span className={`badge ${statusBadgeClass(order.orderStatus)}`}>{order.orderStatus}</span>
              </div>

              <div className="order-card-items">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="order-item-row">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</p>
                      <p className="text-muted" style={{ fontSize: "0.82rem" }}>
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Payment: {order.paymentMethod} · {order.paymentStatus}
                </span>
                <Link to={`/order-success/${order._id}`} className="btn btn-outline btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
