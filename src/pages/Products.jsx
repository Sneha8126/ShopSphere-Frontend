import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { ProductGridSkeleton } from "../components/Loading.jsx";
import { productAPI } from "../services/api.js";

const CATEGORIES = [
  "Mobiles",
  "Laptops",
  "Electronics",
  "Fashion",
  "Shoes",
  "Home & Kitchen",
  "Beauty",
  "Grocery",
  "Books",
  "Sports",
  "Accessories",
];

const RATINGS = [4, 3, 2, 1];

const getFilters = (params) => ({
  category: params.get("category") || "",
  minPrice: params.get("minPrice") || "",
  maxPrice: params.get("maxPrice") || "",
  minRating: params.get("minRating") || "",
  sort: params.get("sort") || "",
  page: Number(params.get("page")) || 1,
});

const FilterPanel = ({ filters, updateFilter, onClose }) => (
  <div className="filter-panel">
    <div className="flex items-center justify-between hide-desktop mb-3">
      <h3>Filters</h3>

      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </div>

    <div className="filter-group">
      <h4>Category</h4>

      {CATEGORIES.map((cat) => (
        <label key={cat} className="filter-option">
          <input
            type="radio"
            name="category"
            checked={filters.category === cat}
            onChange={() => updateFilter("category", cat)}
          />
          {cat}
        </label>
      ))}

      {filters.category && (
        <button
          type="button"
          className="filter-clear"
          onClick={() => updateFilter("category", "")}
        >
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
          onChange={(e) =>
            updateFilter("minPrice", e.target.value)
          }
        />

        <input
          type="number"
          className="form-input"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) =>
            updateFilter("maxPrice", e.target.value)
          }
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
            onChange={() => updateFilter("minRating", r)}
          />
          {r}★ & above
        </label>
      ))}

      {filters.minRating && (
        <button
          type="button"
          className="filter-clear"
          onClick={() => updateFilter("minRating", "")}
        >
          Clear rating
        </button>
      )}
    </div>
  </div>
);

const Products = () => {
  const [params, setParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /*
   * URL IS THE SINGLE SOURCE OF TRUTH.
   *
   * Example:
   * /products?category=Fashion
   * /products?category=Mobiles
   *
   * Whenever URL changes, this value changes automatically.
   */
  const filters = getFilters(params);

  /*
   * Update URL directly.
   * No filters state.
   * No URL <-> state synchronization loop.
   */
  const updateFilter = (key, value) => {
    const next = new URLSearchParams(params);

    if (value === "" || value === undefined || value === null) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    /*
     * Any filter change starts from page 1.
     */
    if (key !== "page") {
      next.set("page", "1");
    }

    /*
     * Keep URL clean.
     */
    if (next.get("page") === "1") {
      next.delete("page");
    }

    setParams(next);
  };

  /*
   * FETCH PRODUCTS
   *
   * This runs whenever the URL/search parameters change.
   *
   * So clicking:
   * Fashion -> Mobiles
   *
   * changes the URL and automatically fetches Mobiles.
   */
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
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

        if (cancelled) return;

        setProducts(data.products || []);

        setMeta({
          page: data.page || 1,
          pages: data.pages || 1,
          total: data.total || 0,
        });
      } catch (err) {
        if (cancelled) return;

        setProducts([]);
        setError(
          err?.message ||
            "Unable to load products right now."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <div
      className="container"
      style={{
        paddingTop: 24,
        paddingBottom: 60,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "1.4rem" }}>
            {filters.category || "All Products"}
          </h1>

          <p className="text-muted mt-2">
            {meta.total} results
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-outline btn-sm hide-desktop"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <select
            className="form-select"
            value={filters.sort}
            onChange={(e) =>
              updateFilter("sort", e.target.value)
            }
            style={{ width: 190 }}
          >
            <option value="">Sort: Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">
              Price: Low to High
            </option>
            <option value="price_desc">
              Price: High to Low
            </option>
            <option value="rating">
              Avg. Customer Rating
            </option>
            <option value="discount">
              Highest Discount
            </option>
          </select>
        </div>
      </div>

      <div className="products-layout">
        {/* DESKTOP FILTERS */}
        <aside className="hide-mobile">
          <FilterPanel
            filters={filters}
            updateFilter={updateFilter}
          />
        </aside>

        {/* MOBILE FILTERS */}
        {mobileFiltersOpen && (
          <div
            className="filter-drawer-overlay"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <div
              className="filter-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                onClose={() =>
                  setMobileFiltersOpen(false)
                }
              />
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div>
          {error && (
            <p
              style={{
                color: "var(--color-danger)",
              }}
            >
              {error}
            </p>
          )}

          {loading ? (
            <ProductGridSkeleton count={9} />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>

              <p>
                Try adjusting your filters or search
                for something else.
              </p>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>

              {meta.pages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    disabled={meta.page <= 1}
                    onClick={() =>
                      updateFilter(
                        "page",
                        meta.page - 1
                      )
                    }
                  >
                    Previous
                  </button>

                  <span className="text-muted">
                    Page {meta.page} of {meta.pages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    disabled={
                      meta.page >= meta.pages
                    }
                    onClick={() =>
                      updateFilter(
                        "page",
                        meta.page + 1
                      )
                    }
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