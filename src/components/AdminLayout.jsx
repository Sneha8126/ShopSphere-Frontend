import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";

// Shared sidebar shell for all /admin/* pages. AdminRoute already guards
// access before this layout renders.
const AdminLayout = () => (
  <div className="container admin-layout">
    <aside className="admin-sidebar">
      <h3 className="mb-3">Admin Panel</h3>
      <nav className="admin-sidebar-nav">
        <NavLink to="/admin" end><LayoutDashboard size={16} /> Dashboard</NavLink>
        <NavLink to="/admin/products"><Package size={16} /> Products</NavLink>
        <NavLink to="/admin/orders"><ShoppingBag size={16} /> Orders</NavLink>
        <NavLink to="/admin/users"><Users size={16} /> Users</NavLink>
      </nav>
    </aside>
    <div className="admin-content">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
