import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Rating from "./Rating.jsx";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/* =========================================================
   CATEGORY FALLBACK IMAGES
   ========================================================= */

const CATEGORY_IMAGES = {
  Mobiles:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90",

  Laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=90",

  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=90",

  Fashion:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=90",

  Shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90",

  "Home & Kitchen":
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=90",

  Beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=90",

  Grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=90",

  Books:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=90",

  Sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=90",

  Accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",
};

/* =========================================================
   PRODUCT-SPECIFIC IMAGES

   Title/category is checked first so that:
   "Gaming Laptop" -> gaming laptop image
   "Wireless Earbuds" -> earbuds image
   "Leather Wallet" -> wallet image
   etc.
   ========================================================= */

const PRODUCT_IMAGES = {
  /* ---------------- MOBILE ---------------- */

  mobile:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90",

  smartphone:
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90",

  iphone:
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=90",

  android:
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=90",

  /* ---------------- LAPTOP ---------------- */

  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=90",

  notebook:
    "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=90",

  gamingLaptop:
    "https://images.unsplash.com/photo-1593642702749-b7d2a804f5f8?auto=format&fit=crop&w=900&q=90",

  macbook:
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=90",

  /* ---------------- AUDIO ---------------- */

  earbuds:
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=90",

  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90",

  speaker:
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=90",

  bluetooth:
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=90",

  /* ---------------- COMPUTER ACCESSORIES ---------------- */

  mouse:
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=90",

  keyboard:
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=90",

  monitor:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=90",

  webcam:
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=90",

  /* ---------------- CAMERA ---------------- */

  camera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=90",

  /* ---------------- WATCH ---------------- */

  watch:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",

  smartwatch:
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=90",

  /* ---------------- FASHION ---------------- */

  tshirt:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=90",

  shirt:
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=90",

  jacket:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=90",

  dress:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=90",

  jeans:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=90",

  hoodie:
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=90",

  /* ---------------- SHOES ---------------- */

  shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90",

  sneakers:
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=90",

  running:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=90",

  boots:
    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=90",

  /* ---------------- WALLET / ACCESSORIES ---------------- */

  wallet:
    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=90",

  bag:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=90",

  backpack:
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=90",

  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=90",

  /* ---------------- BEAUTY ---------------- */

  makeup:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=90",

  lipstick:
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=90",

  perfume:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=90",

  skincare:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=90",

  /* ---------------- HOME & KITCHEN ---------------- */

  kitchen:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=90",

  cookware:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=90",

  pan:
    "https://images.unsplash.com/photo-1584990347449-ae5a6b9c8c4d?auto=format&fit=crop&w=900&q=90",

  furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=90",

  lamp:
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=90",

  pillow:
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=90",

  /* ---------------- SPORTS ---------------- */

  football:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=90",

  basketball:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=90",

  cricket:
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=90",

  fitness:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90",

  yoga:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=90",

  /* ---------------- BOOKS ---------------- */

  book:
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=90",

  novel:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=90",
};

/* =========================================================
   UNIQUE IMAGE ASSIGNMENT

   Keep the real backend image when it is unique. If the same
   image is used by another product, assign an unused image from
   the existing image collection instead. This prevents the same
   image from appearing repeatedly while keeping the existing
   product-image data intact.
   ========================================================= */

const ALL_PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1593642702749-b7d2a804f5f8?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1584990347449-ae5a6b9c8c4d?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=90",
];

const PRODUCT_IMAGE_ASSIGNMENTS = new Map();
const USED_PRODUCT_IMAGES = new Set();

const getUniqueProductImage = (product, preferredImage = "") => {
  const productKey = String(
    product?._id || product?.slug || product?.id || product?.title || Math.random()
  );

  if (PRODUCT_IMAGE_ASSIGNMENTS.has(productKey)) {
    return PRODUCT_IMAGE_ASSIGNMENTS.get(productKey);
  }

  // Prefer the image supplied by the backend when it has not already
  // been assigned to another product.
  if (preferredImage && !USED_PRODUCT_IMAGES.has(preferredImage)) {
    USED_PRODUCT_IMAGES.add(preferredImage);
    PRODUCT_IMAGE_ASSIGNMENTS.set(productKey, preferredImage);
    return preferredImage;
  }

  // Otherwise use the first unused image from the existing collection.
  const unusedImage = ALL_PRODUCT_IMAGES.find(
    (image) => !USED_PRODUCT_IMAGES.has(image)
  );

  // If the collection is exhausted, fall back to the preferred image.
  const selectedImage = unusedImage || preferredImage || ALL_PRODUCT_IMAGES[0];

  USED_PRODUCT_IMAGES.add(selectedImage);
  PRODUCT_IMAGE_ASSIGNMENTS.set(productKey, selectedImage);

  return selectedImage;
};

/* =========================================================
   GET PRODUCT IMAGE

   Priority:
   1. Exact product keyword
   2. Product category
   3. Existing backend image
   ========================================================= */

const getRelevantImageQuery = (product) => {
  const title = String(product?.title || "").toLowerCase();
  const description = String(product?.description || "").toLowerCase();
  const category = String(product?.category || "").toLowerCase();
  const subCategory = String(product?.subCategory || "").toLowerCase();
  const text = `${title} ${description} ${category} ${subCategory}`;

  const rules = [
    [/gaming.*laptop|gaming.*notebook|gaming.*pc/, "gaming laptop computer"],
    [/macbook|mac book/, "macbook laptop"],
    [/laptop|notebook/, "laptop computer"],
    [/earbud|airpod|tws/, "wireless earbuds"],
    [/headphone|headset|over-ear|over ear/, "over ear headphones"],
    [/speaker|soundbar/, "bluetooth speaker"],
    [/mouse/, "computer mouse"],
    [/keyboard|keypad/, "mechanical keyboard"],
    [/monitor|display/, "computer monitor"],
    [/webcam|web cam/, "webcam"],
    [/camera|dslr|mirrorless/, "digital camera"],
    [/smartwatch|smart watch/, "smartwatch"],
    [/watch|timepiece/, "wrist watch"],
    [/iphone/, "iphone smartphone"],
    [/smartphone|phone|mobile/, "smartphone mobile"],
    [/wallet|bifold|card holder/, "leather wallet"],
    [/backpack|rucksack/, "backpack"],
    [/handbag|crossbody bag|tote|bag/, "fashion handbag"],
    [/sunglass|eyewear/, "sunglasses"],
    [/sneaker|trainer/, "sneakers shoes"],
    [/running shoe|running shoes/, "running shoes"],
    [/boot/, "boots shoes"],
    [/shoe|footwear/, "shoes footwear"],
    [/t-shirt|tshirt|tee/, "cotton t shirt"],
    [/shirt/, "shirt clothing"],
    [/jacket|coat/, "jacket clothing"],
    [/dress|gown/, "women dress"],
    [/jeans|denim/, "denim jeans"],
    [/hoodie|sweatshirt/, "hoodie sweatshirt"],
    [/lipstick|lip color|lip colour/, "lipstick makeup"],
    [/perfume|fragrance|cologne/, "perfume bottle"],
    [/skincare|skin care|moisturizer|serum/, "skincare cosmetics"],
    [/makeup|cosmetic/, "makeup cosmetics"],
    [/cookware|baking|tray/, "kitchen cookware"],
    [/frying pan|skillet|pan/, "frying pan kitchen"],
    [/coffee maker/, "coffee maker"],
    [/vacuum/, "robot vacuum cleaner"],
    [/pillow|cushion/, "memory foam pillow"],
    [/lamp|lighting/, "table lamp"],
    [/sofa|chair|furniture/, "home furniture"],
    [/football/, "football"],
    [/basketball/, "basketball"],
    [/cricket/, "cricket bat"],
    [/yoga/, "yoga mat"],
    [/dumbbell|fitness|gym/, "fitness dumbbells"],
    [/book|novel/, "book"],
    [/olive oil/, "olive oil grocery"],
    [/dry fruits|nuts/, "dry fruits"],
    [/pasta/, "pasta food"],
    [/coffee/, "coffee beans"],
  ];

  const matched = rules.find(([pattern]) => pattern.test(text));
  if (matched) return matched[1];

  const categoryQueries = {
    mobiles: "smartphone mobile",
    laptops: "laptop computer",
    electronics: "consumer electronics",
    fashion: "fashion clothing",
    shoes: "shoes footwear",
    "home & kitchen": "home kitchen",
    beauty: "beauty cosmetics",
    grocery: "grocery food",
    books: "books",
    sports: "sports equipment",
    accessories: "fashion accessories",
  };

  return categoryQueries[category] || "ecommerce product";
};

const hashProduct = (product) => {
  const key = String(
    product?._id ||
    product?.slug ||
    product?.id ||
    product?.title ||
    "product"
  );

  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const getGeneratedProductImage = (product, index = 0) => {
  const query = getRelevantImageQuery(product);
  const seed = hashProduct(product) + index;

  return `https://loremflickr.com/900/900/${encodeURIComponent(
    query
  )}?lock=${seed}`;
};

const getProductImage = (product) => {
  // Use a deterministic, product-specific relevant image first.
  // The same product therefore keeps the same image everywhere,
  // while different products get different lock values.
  return getGeneratedProductImage(product, 0);
};

/* =========================================================
   PRODUCT CARD
   ========================================================= */

const ProductCard = ({ product, compact = false }) => {
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
  to={`/product/${product._id}`}
  className="market-product-link"
>

        {/* =================================================
            PRODUCT IMAGE
            ================================================= */}

        <div className="market-product-image">

          <img
            src={productImage}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              const backendImage = Array.isArray(product?.images)
                ? product.images[0]
                : "";

              const fallbackImage =
                backendImage ||
                getUniqueProductImage(
                  product,
                  CATEGORY_IMAGES[product?.category] || CATEGORY_IMAGES.Electronics
                );

              if (e.currentTarget.src !== fallbackImage) {
                e.currentTarget.src = fallbackImage;
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

        {/* =================================================
            PRODUCT INFORMATION
            ================================================= */}

        <div className="market-product-info">

          {product.brand && (
            <span className="product-brand">
              {product.brand}
            </span>
          )}

          <h3>
            {product.title}
          </h3>

          <Rating
            value={product.rating}
            numReviews={product.numReviews}
          />

          {/* PRICE */}

          <div className="market-price-row">

            <span className="market-price">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice > product.price && (
              <span className="market-mrp">
                {formatPrice(product.originalPrice)}
              </span>
            )}

          </div>

          {/* SAVINGS */}

          {product.originalPrice > product.price && (
            <span className="market-saving">
              Save{" "}
              {formatPrice(
                product.originalPrice -
                  product.price
              )}
            </span>
          )}

          {/* DELIVERY */}

          <p className="delivery-copy">
            <strong>FREE Delivery</strong>{" "}
            on orders over ₹999
          </p>

          {/* STOCK */}

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

      {/* ADD TO CART */}

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