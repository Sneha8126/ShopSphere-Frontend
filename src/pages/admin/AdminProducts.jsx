import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { productAPI } from "../../services/api.js";
import { Spinner } from "../../components/Loading.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await productAPI.getAll({ limit: 50 });
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await productAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Spinner label="Loading products..." />;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 style={{ fontSize: "1.4rem" }}>Manage Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {error && <ErrorMessage message={error} onRetry={load} />}

      <table className="admin-table">
        <thead>
          <tr><th>Image</th><th>Title</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.images[0]} alt={p.title} className="admin-table-thumb" /></td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <div className="flex gap-2">
                  <Link to={`/admin/products/${p._id}/edit`} className="btn btn-outline btn-sm"><Pencil size={14} /></Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)} disabled={deletingId === p._id}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
