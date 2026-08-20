export const Spinner = ({ label = "Loading..." }) => (
  <div className="flex items-center justify-center gap-2" style={{ padding: "48px 0" }}>
    <span className="spinner" />
    <span className="text-muted">{label}</span>
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="card" style={{ padding: 14 }}>
    <div className="skeleton" style={{ width: "100%", aspectRatio: "1 / 1", marginBottom: 12 }} />
    <div className="skeleton" style={{ width: "80%", height: 14, marginBottom: 8 }} />
    <div className="skeleton" style={{ width: "50%", height: 14, marginBottom: 8 }} />
    <div className="skeleton" style={{ width: "40%", height: 18 }} />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
