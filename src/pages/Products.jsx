import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { ProductGridSkeleton } from "../components/Loading.jsx";
import { productAPI } from "../services/api.js";

const CATEGORIES = [
  "Mobiles", "Laptops", "Electronics", "Fashion", "Shoes",
  "Home & Kitchen", "Beauty", "Grocery", "Books", "Sports", "Accessories",
];

const RATINGS = [4, 3, 2, 1];

const FilterPanel = ({ filters, setFilters, onClose }) => (
  <div className="filter-panel">
    <div className="flex items-center justify-between hide-desktop mb-3">
      <h3>Filters</h3>
      <button className="btn btn-outline btn-sm" onClick={onClose}><X size={16} /></button>
    </div>

    <div className="filter-group">
      <h4>Category</h4>
      {CATEGORIES.map((cat) => (
        <label key={cat} className="filter-option">
          <input
            type="radio"
            name="category"
            checked={filters.category === cat}
            onChange={() => setFilters((f) => ({ ...f, category: cat, page: 1 }))}
          />
          {cat}
        </label>
      ))}
      {filters.category && (
        <button className="filter-clear" onClick={() => setFilters((f) => ({ ...f, category: "", page: 1 }))}>
          Clear category
        </button>
      )}
    </div>

    <div className="filter-group">
      <h4>Price Range</h4>
      <div className="flex gap-2">
        <input
          type="number"
          className="form-input"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value, page: 1 }))}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value, page: 1 }))}
        />
      </div>
    </div>

    <div className="filter-group">
      <h4>Customer Rating</h4>
      {RATINGS.map((r) => (
        <label key={r} className="filter-option">
          <input
            type="radio"
            name="rating"
            checked={String(filters.minRating) === String(r)}
            onChange={() => setFilters((f) => ({ ...f, minRating: r, page: 1 }))}
          />
          {r}★ & above
        </label>
      ))}
      {filters.minRating && (
        <button className="filter-clear" onClick={() => setFilters((f) => ({ ...f, minRating: "", page: 1 }))}>
          Clear rating
        </button>
      )}
    </div>
  </div>
);

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: params.get("category") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    minRating: params.get("minRating") || "",
    sort: params.get("sort") || "",
    page: Number(params.get("page")) || 1,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = {
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        minRating: filters.minRating || undefined,
        sort: filters.sort || undefined,
        page: filters.page,
        limit: 12,
      };
      const { data } = await productAPI.getAll(query);
      setProducts(data.products);
      setMeta({ page: data.page, pages: data.pages, total: data.total });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
    const next = {};
    Object.entries(filters).forEach(([k, v]) => {
      if (v) next[k] = v;
    });
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "1.4rem" }}>
            {filters.category ? filters.category : "All Products"}
          </h1>
          <p className="text-muted mt-2">{meta.total} results</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline btn-sm hide-desktop" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal size={15} /> Filters
          </button>
          <select
            className="form-select"
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value, page: 1 }))}
            style={{ width: 190 }}
          >
            <option value="">Sort: Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Rating</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      <div className="products-layout">
        <aside className="hide-mobile">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>

        {mobileFiltersOpen && (
          <div className="filter-drawer-overlay" onClick={() => setMobileFiltersOpen(false)}>
            <div className="filter-drawer" onClick={(e) => e.stopPropagation()}>
              <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setMobileFiltersOpen(false)} />
            </div>
          </div>
        )}

        <div>
          {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

          {loading ? (
            <ProductGridSkeleton count={9} />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search for something else.</p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>

              {meta.pages > 1 && (
                <div className="pagination">
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={meta.page <= 1}
                    onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                  >
                    Previous
                  </button>
                  <span className="text-muted">Page {meta.page} of {meta.pages}</span>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={meta.page >= meta.pages}
                    onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
