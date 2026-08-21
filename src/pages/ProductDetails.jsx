import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Minus, Plus } from "lucide-react";
import Rating from "../components/Rating.jsx";
import { Spinner } from "../components/Loading.jsx";
import { productAPI, reviewAPI } from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const ReviewForm = ({ productId, onSubmitted }) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <p className="text-muted mt-3">
        <Link to="/login" style={{ color: "var(--color-accent)", fontWeight: 600 }}>Sign in</Link> to write a review.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await reviewAPI.create(productId, { rating, comment });
      setComment("");
      setRating(5);
      onSubmitted();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: 480 }}>
      <div className="form-group">
        <label className="form-label">Your Rating</label>
        <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Your Review</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  const loadReviews = async (productId) => {
    try {
      const { data } = await reviewAPI.getForProduct(productId);
      setReviews(data.reviews);
    } catch (err) {
      // Non-fatal
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      setActiveImage(0);
      setQuantity(1);
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data.product);
        loadReviews(data.product._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Spinner label="Loading product..." />;

  if (error || !product) {
    return (
      <div className="empty-state">
        <h3>Product not found</h3>
        <p>{error || "This product may have been removed."}</p>
        <Link to="/products" className="btn btn-primary mt-3">Browse Products</Link>
      </div>
    );
  }

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(`${quantity} item(s) added to cart.`);
    setTimeout(() => setAddedMessage(""), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      <div className="product-details-grid">
        <div>
          <div className="product-gallery-main">
            <img src={galleryImages[activeImage]} alt={product.title} />
          </div>
          <div className="product-gallery-thumbs">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className={`product-gallery-thumb ${i === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt={`${product.title} view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-faint" style={{ textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.04em" }}>
            {product.brand}
          </p>
          <h1 style={{ fontSize: "1.6rem" }}>{product.title}</h1>
          <div className="mt-2">
            <Rating value={product.rating} numReviews={product.numReviews} size={16} />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="price" style={{ fontSize: "1.9rem" }}>{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="price-strike" style={{ fontSize: "1.1rem" }}>{formatPrice(product.originalPrice)}</span>
                <span className="badge badge-discount">{product.discount}% off</span>
              </>
            )}
          </div>

          <p className="text-muted mt-3">{product.description}</p>

          {product.features?.length > 0 && (
            <ul className="mt-3" style={{ paddingLeft: 18, listStyle: "disc" }}>
              {product.features.map((f, i) => <li key={i} className="text-muted" style={{ marginBottom: 4 }}>{f}</li>)}
            </ul>
          )}

          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="badge badge-success">In Stock ({product.stock} available)</span>
            ) : (
              <span className="badge badge-danger">Out of Stock</span>
            )}
          </div>

          <div className="delivery-info mt-3">
            <div className="flex items-center gap-2"><Truck size={16} /> Free delivery on orders over ₹999</div>
            <div className="flex items-center gap-2"><RotateCcw size={16} /> 7-day easy returns</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure checkout, sold by {product.seller}</div>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-3 mt-4">
              <div className="qty-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button className="btn btn-outline" disabled={product.stock === 0} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-primary" disabled={product.stock === 0} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          {addedMessage && <p className="badge badge-success mt-3">{addedMessage}</p>}
        </div>
      </div>

      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="mt-4" style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: "1.2rem" }} className="mb-3">Specifications</h2>
          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: "1.2rem" }} className="mb-3">Customer Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to share your thoughts.</p>
        ) : (
          <div className="review-list">
            {reviews.map((r) => (
              <div key={r._id} className="review-item">
                <div className="flex items-center justify-between">
                  <strong>{r.name}</strong>
                  <span className="text-faint" style={{ fontSize: "0.78rem" }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Rating value={r.rating} showCount={false} size={13} />
                <p className="text-muted mt-2">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
        <ReviewForm productId={product._id} onSubmitted={() => loadReviews(product._id)} />
      </section>
    </div>
  );
};

export default ProductDetails;