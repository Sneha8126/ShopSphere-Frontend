import { useEffect, useState } from "react";
import { orderAPI } from "../../services/api.js";
import { Spinner } from "../../components/Loading.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const STATUS_OPTIONS = ["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await orderAPI.getAll();
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

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const { data } = await orderAPI.updateStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? data.order : o)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Spinner label="Loading orders..." />;

  return (
    <div>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Manage Orders</h1>

      {error && <ErrorMessage message={error} onRetry={load} />}

      <table className="admin-table">
        <thead>
          <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.name}<br /><span className="text-faint" style={{ fontSize: "0.75rem" }}>{o.user?.email}</span></td>
              <td>{formatPrice(o.total)}</td>
              <td>{o.paymentMethod} ({o.paymentStatus})</td>
              <td>
                <select
                  className="form-select"
                  value={o.orderStatus}
                  disabled={updatingId === o._id}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
