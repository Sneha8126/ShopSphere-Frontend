import ProductCard from "./ProductCard.jsx";
import { ProductGridSkeleton } from "./Loading.jsx";

// Reusable grid wrapper: handles loading / empty / populated states for any
// list of products so pages don't have to repeat this logic.
const ProductGrid = ({ products, loading, emptyTitle = "No products found", emptyMessage = "Try adjusting your filters or search for something else.", skeletonCount = 8 }) => {
  if (loading) return <ProductGridSkeleton count={skeletonCount} />;

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
