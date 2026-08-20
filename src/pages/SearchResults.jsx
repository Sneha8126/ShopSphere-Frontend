import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { ProductGridSkeleton } from "../components/Loading.jsx";
import { productAPI } from "../services/api.js";

const SearchResults = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [q]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await productAPI.search({ q, sort: sort || undefined, page, limit: 12 });
        setProducts(data.products);
        setMeta({ page: data.page, pages: data.pages, total: data.total });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (q) load();
    else {
      setProducts([]);
      setLoading(false);
    }
  }, [q, sort, page]);

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 style={{ fontSize: "1.3rem" }}>Search results for "{q}"</h1>
          <p className="text-muted mt-2">{meta.total} results</p>
        </div>
        <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 190 }}>
          <option value="">Sort: Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Avg. Customer Rating</option>
        </select>
      </div>

      {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : !q ? (
        <div className="empty-state"><h3>Search for something</h3><p>Use the search bar above to find products.</p></div>
      ) : products.length === 0 ? (
        <div className="empty-state"><h3>No results for "{q}"</h3><p>Try a different keyword or browse categories instead.</p></div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          {meta.pages > 1 && (
            <div className="pagination">
              <button className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
              <span className="text-muted">Page {meta.page} of {meta.pages}</span>
              <button className="btn btn-outline btn-sm" disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
