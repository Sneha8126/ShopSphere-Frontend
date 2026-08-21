import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Rating from "./Rating.jsx";
import { useCart } from "../context/CartContext.jsx";
import { getProductImage } from "../utils/productImages.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const ProductCard = ({
  product,
  compact = false,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
  };

  const productImage = getProductImage(product);

  return (
    <article
      className={`market-product-card ${
        compact ? "compact" : ""
      }`}
    >
      <Link
        to={`/product/${product.slug || product._id}`}
        className="market-product-link"
      >
        <div className="market-product-image">
          <img
            src={productImage}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              const fallback =
                getProductImage(product, 1);

              if (
                e.currentTarget.src !== fallback
              ) {
                e.currentTarget.src = fallback;
              }
            }}
          />

          {product.discount > 0 && (
            <span className="deal-badge">
              {product.discount}% off
            </span>
          )}

          {product.isBestSeller && (
            <span className="best-seller-badge">
              #1 Best Seller
            </span>
          )}
        </div>

        <div className="market-product-info">
          {product.brand && (
            <span className="product-brand">
              {product.brand}
            </span>
          )}

          <h3>{product.title}</h3>

          <Rating
            value={product.rating}
            numReviews={product.numReviews}
          />

          <div className="market-price-row">
            <span className="market-price">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice >
              product.price && (
              <span className="market-mrp">
                {formatPrice(
                  product.originalPrice
                )}
              </span>
            )}
          </div>

          {product.originalPrice >
            product.price && (
            <span className="market-saving">
              Save{" "}
              {formatPrice(
                product.originalPrice -
                  product.price
              )}
            </span>
          )}

          <p className="delivery-copy">
            <strong>FREE Delivery</strong> on orders
            over ₹999
          </p>

          {product.stock > 0 ? (
            <p className="stock-copy">
              {product.stock <= 5
                ? `Only ${product.stock} left in stock`
                : "In Stock"}
            </p>
          ) : (
            <p className="stock-copy out">
              Currently unavailable
            </p>
          )}
        </div>
      </Link>

      <button
        className="market-add-cart"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        type="button"
      >
        <ShoppingCart size={16} />

        {product.stock === 0
          ? "Unavailable"
          : "Add to Cart"}
      </button>
    </article>
  );
};

export default ProductCard;