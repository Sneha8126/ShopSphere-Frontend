import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import HeroBanner from "../components/HeroBanner.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { ProductGridSkeleton } from "../components/Loading.jsx";
import { productAPI } from "../services/api.js";

/* =========================================================
   CATEGORIES
   ========================================================= */

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

/* =========================================================
   CATEGORY IMAGES
   ========================================================= */

const CATEGORY_IMAGES = {
  Mobiles:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=90",

  Laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=90",

  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=90",

  Fashion:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=90",

  Shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=90",

  "Home & Kitchen":
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=90",

  Beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=90",

  Grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=90",

  Books:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=90",

  Sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=90",

  Accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=90",
};

/* =========================================================
   SECTION
   ========================================================= */

const Section = ({
  title,
  subtitle,
  href = "/products",
  children,
  tone = "",
}) => (
  <section className={`home-section ${tone}`}>
    <div className="container">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <Link to={href}>
          See all <ArrowRight size={15} />
        </Link>
      </div>

      {children}
    </div>
  </section>
);

/* =========================================================
   HOME
   ========================================================= */

const Home = () => {
  const [highlights, setHighlights] = useState(null);

  const [allProducts, setAllProducts] = useState([]);

  const [fashionProducts, setFashionProducts] = useState([]);

  const [electronicsProducts, setElectronicsProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     LOAD DATA
     IMPORTANT:
     We DON'T use Promise.all().
     Each API request is handled independently.
     ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      /* ---------------------------------------------------
         1. ALL PRODUCTS
         --------------------------------------------------- */

      try {
        const response = await productAPI.getAll({
          limit: 50,
          sort: "newest",
        });

        if (!mounted) return;

        const products = response?.data?.products || [];

        setAllProducts(products);

        console.log(
          "ShopSphere: products loaded:",
          products.length
        );
      } catch (err) {
        console.error(
          "ShopSphere: products API failed:",
          err
        );

        if (mounted) {
          setError(
            err?.message ||
              "Unable to load products right now."
          );
        }
      }

      /* ---------------------------------------------------
         2. HIGHLIGHTS
         --------------------------------------------------- */

      try {
        const response = await productAPI.getHighlights();

        if (!mounted) return;

        setHighlights(response?.data || null);

        console.log(
          "ShopSphere: highlights loaded"
        );
      } catch (err) {
        console.error(
          "ShopSphere: highlights API failed:",
          err
        );

        /*
          IMPORTANT:
          Highlights fail hone par normal products
          fail nahi honge.
        */

        if (mounted) {
          setHighlights({
            deals: [],
            bestSellers: [],
            featured: [],
          });
        }
      }

      /* ---------------------------------------------------
         3. FASHION
         --------------------------------------------------- */

      try {
        const response = await productAPI.getAll({
          category: "Fashion",
          limit: 8,
          sort: "newest",
        });

        if (!mounted) return;

        setFashionProducts(
          response?.data?.products || []
        );
      } catch (err) {
        console.error(
          "ShopSphere: fashion API failed:",
          err
        );

        if (mounted) {
          setFashionProducts([]);
        }
      }

      /* ---------------------------------------------------
         4. ELECTRONICS
         --------------------------------------------------- */

      try {
        const response = await productAPI.getAll({
          category: "Electronics",
          limit: 8,
          sort: "newest",
        });

        if (!mounted) return;

        setElectronicsProducts(
          response?.data?.products || []
        );
      } catch (err) {
        console.error(
          "ShopSphere: electronics API failed:",
          err
        );

        if (mounted) {
          setElectronicsProducts([]);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     TRENDING
     ======================================================= */

  const trending = useMemo(() => {
    return [...allProducts]
      .sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      )
      .slice(0, 8);
  }, [allProducts]);

  /* =======================================================
     UNDER ₹999
     ======================================================= */

  const under999 = useMemo(() => {
    return allProducts
      .filter(
        (product) =>
          Number(product.price || 0) <= 999
      )
      .slice(0, 8);
  }, [allProducts]);

  /* =======================================================
     FASHION
     ======================================================= */

  const fashion = useMemo(() => {
    if (fashionProducts.length > 0) {
      return fashionProducts.slice(0, 8);
    }

    return allProducts
      .filter((product) => {
        const category = String(
          product?.category || ""
        )
          .trim()
          .toLowerCase();

        return category === "fashion";
      })
      .slice(0, 8);
  }, [fashionProducts, allProducts]);

  /* =======================================================
     ELECTRONICS
     ======================================================= */

  const electronics = useMemo(() => {
    if (electronicsProducts.length > 0) {
      return electronicsProducts.slice(0, 8);
    }

    return allProducts
      .filter((product) => {
        const category = String(
          product?.category || ""
        )
          .trim()
          .toLowerCase();

        return (
          category.includes("electronic") ||
          category.includes("mobile") ||
          category.includes("laptop")
        );
      })
      .slice(0, 8);
  }, [electronicsProducts, allProducts]);

  /* =======================================================
     IMAGE ERROR FALLBACK
     ======================================================= */

  const handleCategoryImageError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement.classList.add(
      "image-failed"
    );
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="home-page">

      {/* ===================================================
          HERO
          =================================================== */}

      <HeroBanner />

      {/* ===================================================
          TRUST STRIP
          =================================================== */}

      <section className="trust-strip">
        <div className="container trust-grid">

          <div>
            <Truck />

            <span>
              <strong>Free Delivery</strong>

              <small>
                On eligible orders over ₹999
              </small>
            </span>
          </div>

          <div>
            <RotateCcw />

            <span>
              <strong>Easy Returns</strong>

              <small>
                Hassle-free 7-day returns
              </small>
            </span>
          </div>

          <div>
            <ShieldCheck />

            <span>
              <strong>Secure Payments</strong>

              <small>
                Your payment data is protected
              </small>
            </span>
          </div>

          <div>
            <Headphones />

            <span>
              <strong>Customer Support</strong>

              <small>
                We're here when you need us
              </small>
            </span>
          </div>

        </div>
      </section>

      {/* ===================================================
          SHOP BY CATEGORY
          =================================================== */}

      <section className="category-shopping">

        <div className="container">

          <div className="section-heading compact-heading">

            <div>
              <h2>Shop by Category</h2>

              <p>
                Explore products across your favorite
                categories
              </p>
            </div>

            <Link to="/products">
              View all <ArrowRight size={15} />
            </Link>

          </div>

          <div className="category-shopping-grid">

            {CATEGORIES.map((category) => (

              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(
                  category
                )}`}
                className="category-shopping-card"
              >

                <div className="category-image">

                  <img
                    src={CATEGORY_IMAGES[category]}
                    alt={`${category} products`}
                    loading="lazy"
                    onError={handleCategoryImageError}
                  />

                </div>

                <strong>{category}</strong>

                <span>
                  Shop now
                  <ArrowRight size={13} />
                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* ===================================================
          API ERROR
          =================================================== */}

      {error && (
        <div className="container api-alert">

          <strong>
            We couldn't load some products.
          </strong>

          <span>{error}</span>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try again
          </button>

        </div>
      )}

      {/* ===================================================
          TODAY'S DEALS
          =================================================== */}

      <Section
        title="Today's Deals"
        subtitle="Limited-time savings on products customers love"
        href="/products?sort=discount"
        tone="section-white"
      >

        {loading ? (
          <ProductGridSkeleton count={5} />
        ) : highlights?.deals?.length > 0 ? (

          <div className="market-product-row">

            {highlights.deals
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : allProducts.length > 0 ? (

          <div className="market-product-row">

            {allProducts
              .filter(
                (product) =>
                  Number(product.discount || 0) > 0
              )
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : (
          <ProductGridSkeleton count={5} />
        )}

      </Section>

      {/* ===================================================
          PROMOTIONAL TILES
          =================================================== */}

      <section className="container promo-row">

        <Link
          to="/products?category=Electronics"
          className="promo-tile large"
        >

          <div>

            <span>TECH DEALS</span>

            <h3>
              Upgrade your everyday.
            </h3>

            <p>
              Phones, laptops and accessories
              at great prices.
            </p>

            <b>
              Shop Electronics
              <ArrowRight size={15} />
            </b>

          </div>

          <img
            src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1000&q=90"
            alt="Electronics collection"
            loading="lazy"
          />

        </Link>

        <Link
          to="/products?category=Fashion"
          className="promo-tile"
        >

          <div>

            <span>NEW SEASON</span>

            <h3>
              Fresh styles.
            </h3>

            <p>
              Fashion and shoes from ₹499.
            </p>

            <b>
              Explore Fashion
              <ArrowRight size={15} />
            </b>

          </div>

          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=90"
            alt="Fashion collection"
            loading="lazy"
          />

        </Link>

        <Link
          to="/products?category=Home%20%26%20Kitchen"
          className="promo-tile"
        >

          <div>

            <span>HOME ESSENTIALS</span>

            <h3>
              Make home better.
            </h3>

            <p>
              Everyday essentials for every room.
            </p>

            <b>
              Shop Home
              <ArrowRight size={15} />
            </b>

          </div>

          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=90"
            alt="Home and kitchen collection"
            loading="lazy"
          />

        </Link>

      </section>

      {/* ===================================================
          BEST SELLERS
          =================================================== */}

      <Section
        title="Best Sellers"
        subtitle="Popular picks shoppers are buying right now"
        href="/products"
      >

        {loading ? (
          <ProductGridSkeleton count={5} />
        ) : highlights?.bestSellers?.length > 0 ? (

          <div className="market-product-row">

            {highlights.bestSellers
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : allProducts.length > 0 ? (

          <div className="market-product-row">

            {allProducts
              .filter(
                (product) =>
                  product.isBestSeller === true
              )
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : (
          <ProductGridSkeleton count={5} />
        )}

      </Section>

      {/* ===================================================
          TRENDING
          =================================================== */}

      <Section
        title="Trending Products"
        subtitle="Highly rated products worth a look"
        href="/products?sort=rating"
        tone="section-white"
      >

        {loading ? (
          <ProductGridSkeleton count={5} />
        ) : trending.length > 0 ? (

          <div className="market-product-row">

            {trending.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : (
          <ProductGridSkeleton count={5} />
        )}

      </Section>

      {/* ===================================================
          ELECTRONICS
          =================================================== */}

      <Section
        title="Popular in Electronics"
        subtitle="Smartphones, laptops, audio and more"
        href="/products?category=Electronics"
      >

        {electronics.length > 0 ? (

          <div className="market-product-row">

            {electronics.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : loading ? (

          <ProductGridSkeleton count={5} />

        ) : (

          <p className="empty-section">
            No electronics products available.
          </p>

        )}

      </Section>

      {/* ===================================================
          FASHION
          =================================================== */}

      <Section
        title="Popular in Fashion"
        subtitle="Refresh your wardrobe for less"
        href="/products?category=Fashion"
        tone="section-white"
      >

        {fashion.length > 0 ? (

          <div className="market-product-row">

            {fashion.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : loading ? (

          <ProductGridSkeleton count={5} />

        ) : (

          <p className="empty-section">
            No fashion products available.
          </p>

        )}

      </Section>

      {/* ===================================================
          SHOPSPHERE SPECIAL
          =================================================== */}

      <section className="container deal-banner">

        <div>

          <span>
            <Sparkles size={15} />
            SHOPSPHERE SPECIAL
          </span>

          <h2>
            Everyday prices. Extra reasons to shop.
          </h2>

          <p>
            Discover thousands of products,
            fast delivery and easy returns.
          </p>

        </div>

        <Link
          to="/products"
          className="hero-cta"
        >
          Start Shopping
          <ArrowRight size={17} />
        </Link>

      </section>

      {/* ===================================================
          UNDER ₹999
          =================================================== */}

      <Section
        title="Deals Under ₹999"
        subtitle="Useful finds without stretching your budget"
        href="/products"
      >

        {under999.length > 0 ? (

          <div className="market-product-row">

            {under999.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        ) : loading ? (

          <ProductGridSkeleton count={5} />

        ) : (

          <p className="empty-section">
            No products under ₹999 found.
          </p>

        )}

      </Section>

      {/* ===================================================
          FEATURED
          =================================================== */}

      <Section
        title="Featured Products"
        subtitle="Hand-picked picks from across ShopSphere"
        href="/products"
        tone="section-white"
      >

        {loading ? (
          <ProductGridSkeleton count={5} />
        ) : highlights?.featured?.length > 0 ? (

          <div className="market-product-row">

            {highlights.featured
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : allProducts.length > 0 ? (

          <div className="market-product-row">

            {allProducts
              .filter(
                (product) =>
                  product.isFeatured === true
              )
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

          </div>

        ) : (
          <p className="empty-section">
            No featured products available.
          </p>
        )}

      </Section>

    </div>
  );
};

export default Home;