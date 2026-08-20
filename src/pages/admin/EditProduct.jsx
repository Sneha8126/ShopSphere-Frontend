import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../../services/api.js";
import { Spinner } from "../../components/Loading.jsx";

const CATEGORIES = [
  "Mobiles", "Laptops", "Electronics", "Fashion", "Shoes",
  "Home & Kitchen", "Beauty", "Grocery", "Books", "Sports", "Accessories",
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await productAPI.getById(id);
        const p = data.product;
        setForm({
          title: p.title,
          description: p.description,
          price: p.price,
          originalPrice: p.originalPrice,
          category: p.category,
          subCategory: p.subCategory || "",
          brand: p.brand,
          images: p.images.join(", "),
          stock: p.stock,
          features: (p.features || []).join(", "),
          seller: p.seller,
          isFeatured: p.isFeatured,
          isBestSeller: p.isBestSeller,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        category: form.category,
        subCategory: form.subCategory,
        brand: form.brand,
        images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        stock: Number(form.stock),
        features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
        seller: form.seller,
        isFeatured: form.isFeatured,
        isBestSeller: form.isBestSeller,
      };
      await productAPI.update(id, payload);
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="Loading product..." />;
  if (!form) return <p className="form-error">{error || "Product not found."}</p>;

  return (
    <div>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Edit Product</h1>

      {error && <p className="form-error mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="card admin-product-form">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea className="form-textarea" rows={3} value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
        </div>

        <div className="admin-form-grid">
          <div className="form-group">
            <label className="form-label">Price (₹) *</label>
            <input type="number" className="form-input" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Original Price (₹) *</label>
            <input type="number" className="form-input" value={form.originalPrice} onChange={(e) => handleChange("originalPrice", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Stock *</label>
            <input type="number" className="form-input" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select className="form-select" value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Sub-category</label>
            <input className="form-input" value={form.subCategory} onChange={(e) => handleChange("subCategory", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Brand *</label>
            <input className="form-input" value={form.brand} onChange={(e) => handleChange("brand", e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URLs * (comma-separated)</label>
          <input className="form-input" value={form.images} onChange={(e) => handleChange("images", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Features (comma-separated)</label>
          <input className="form-input" value={form.features} onChange={(e) => handleChange("features", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Seller</label>
          <input className="form-input" value={form.seller} onChange={(e) => handleChange("seller", e.target.value)} />
        </div>

        <div className="flex gap-4 mb-3">
          <label className="filter-option">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => handleChange("isFeatured", e.target.checked)} /> Featured
          </label>
          <label className="filter-option">
            <input type="checkbox" checked={form.isBestSeller} onChange={(e) => handleChange("isBestSeller", e.target.checked)} /> Best Seller
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
