import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Users, IndianRupee } from "lucide-react";
import { productAPI, orderAPI, userAPI } from "../../services/api.js";
import { Spinner } from "../../components/Loading.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          productAPI.getAll({ limit: 1 }),
          orderAPI.getAll(),
          userAPI.getAll(),
        ]);

        const orders = ordersRes.data.orders;
        const revenue = orders.reduce((sum, o) => sum + o.total, 0);

        setStats({
          productCount: productsRes.data.total,
          orderCount: orders.length,
          userCount: usersRes.data.users.length,
          revenue,
          recentOrders: orders.slice(0, 5),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner label="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Admin Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="card admin-stat-card">
          <Package size={22} color="var(--color-accent)" />
          <div><p className="text-muted">Products</p><strong>{stats.productCount}</strong></div>
        </div>
        <div className="card admin-stat-card">
          <ShoppingBag size={22} color="var(--color-teal)" />
          <div><p className="text-muted">Orders</p><strong>{stats.orderCount}</strong></div>
        </div>
        <div className="card admin-stat-card">
          <Users size={22} color="var(--color-warn)" />
          <div><p className="text-muted">Users</p><strong>{stats.userCount}</strong></div>
        </div>
        <div className="card admin-stat-card">
          <IndianRupee size={22} color="var(--color-success)" />
          <div><p className="text-muted">Revenue</p><strong>{formatPrice(stats.revenue)}</strong></div>
        </div>
      </div>

      <div className="admin-quick-links mt-4">
        <Link to="/admin/products" className="btn btn-outline">Manage Products</Link>
        <Link to="/admin/orders" className="btn btn-outline">Manage Orders</Link>
        <Link to="/admin/users" className="btn btn-outline">Manage Users</Link>
      </div>

      <section className="mt-4">
        <h3 className="mb-3">Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p className="text-muted">No orders yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id}</td>
                  <td>{o.user?.name}</td>
                  <td>{formatPrice(o.total)}</td>
                  <td><span className="badge badge-warn">{o.orderStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
