import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
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

const SearchBar = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* -----------------------------------------
     Update search text from URL
  ----------------------------------------- */
  useEffect(() => {
    setQuery(params.get("q") || "");
  }, [params]);

  /* -----------------------------------------
     Close dropdown when clicking outside
  ----------------------------------------- */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* -----------------------------------------
     Select category
  ----------------------------------------- */
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setDropdownOpen(false);
  };

  /* -----------------------------------------
     Search
  ----------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = query.trim();

    // Category selected
    if (category !== "All") {
      const searchPart = trimmed
        ? `&q=${encodeURIComponent(trimmed)}`
        : "";

      navigate(
        `/products?category=${encodeURIComponent(
          category
        )}${searchPart}`
      );

      return;
    }

    // Normal search
    if (trimmed) {
      navigate(
        `/search?q=${encodeURIComponent(trimmed)}`
      );
    } else {
      navigate("/products");
    }
  };

  return (
    /*
      OUTER WRAPPER

      Important:
      We intentionally DO NOT use the old "search-bar"
      class here because its CSS was causing the white
      corner/overflow problem.
    */
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        width: "100%",
        height: "50px",
        minWidth: 0,
        zIndex: 10000,
        boxSizing: "border-box",
      }}
    >
      {/* =================================================
          SEARCH AREA
          This is the actual white/orange search box.
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        role="search"
        style={{
          position: "relative",

          display: "flex",
          alignItems: "stretch",

          width: "100%",
          height: "50px",

          margin: 0,
          padding: 0,

          background: "#ffffff",

          border: "none",
          borderRadius: "8px",

          overflow: "hidden",

          boxSizing: "border-box",
        }}
      >
        {/* =================================================
            CATEGORY
        ================================================= */}

        <div
          style={{
            position: "relative",

            width: "145px",
            minWidth: "145px",
            height: "50px",

            background: "#ffffff",

            border: "none",
            borderRight: "1px solid #d5d9d9",

            borderRadius: "8px 0 0 8px",

            boxSizing: "border-box",

            zIndex: 20,
          }}
        >
          <button
            type="button"
            onClick={() =>
              setDropdownOpen((prev) => !prev)
            }
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            style={{
              width: "100%",
              height: "50px",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              margin: 0,
              padding: "0 16px",

              border: "none",
              outline: "none",

              background: "#ffffff",
              color: "#111111",

              borderRadius: "8px 0 0 8px",

              fontSize: "15px",
              fontWeight: "500",

              cursor: "pointer",

              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category}
            </span>

            <ChevronDown
              size={17}
              strokeWidth={2.5}
              style={{
                flexShrink: 0,
                color: "#111111",

                transform: dropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",

                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

        {/* =================================================
            SEARCH INPUT
        ================================================= */}

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search ShopSphere"
          aria-label="Search products"
          style={{
            flex: "1",
            minWidth: 0,

            width: "100%",
            height: "50px",

            margin: 0,

            border: "none",
            outline: "none",

            background: "#ffffff",
            color: "#111111",

            padding: "0 75px 0 15px",

            fontSize: "16px",

            boxSizing: "border-box",
          }}
        />

        {/* =================================================
            SEARCH BUTTON

            It is now INSIDE the clipped white search area,
            so no white corner can appear underneath it.
        ================================================= */}

        <button
          type="submit"
          aria-label="Search"
          style={{
            position: "absolute",

            top: 0,
            right: 0,

            width: "68px",
            height: "50px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            margin: 0,
            padding: 0,

            border: "none",

            background: "#ff5a1f",
            color: "#ffffff",

            borderRadius: "0 8px 8px 0",

            cursor: "pointer",

            boxSizing: "border-box",

            zIndex: 10,
          }}
        >
          <Search
            size={25}
            strokeWidth={2.5}
            style={{
              display: "block",
              width: "25px",
              height: "25px",
              margin: 0,
              padding: 0,
            }}
          />
        </button>
      </form>

      {/* =================================================
          CUSTOM DROPDOWN

          This is OUTSIDE the clipped search form,
          so it won't get cut off.
      ================================================= */}

      {dropdownOpen && (
        <div
          role="listbox"
          style={{
            position: "absolute",

            top: "52px",
            left: 0,

            width: "230px",
            maxHeight: "420px",

            overflowY: "auto",

            background: "#ffffff",

            border: "1px solid #b7b7b7",
            borderRadius: "0 0 5px 5px",

            boxShadow:
              "0 4px 12px rgba(0,0,0,0.25)",

            padding: "5px 0",

            zIndex: 999999,

            boxSizing: "border-box",
          }}
        >
          {CATEGORIES.map((cat) => {
            const selected = category === cat;

            return (
              <button
                key={cat}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() =>
                  handleCategorySelect(cat)
                }
                style={{
                  width: "100%",
                  minHeight: "42px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  margin: 0,
                  padding: "9px 15px",

                  border: "none",
                  outline: "none",

                  background: selected
                    ? "#f1f1f1"
                    : "#ffffff",

                  color: "#111111",

                  fontSize: "15px",
                  fontWeight: selected
                    ? "600"
                    : "400",

                  textAlign: "left",

                  cursor: "pointer",

                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "#eeeeee";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    selected
                      ? "#f1f1f1"
                      : "#ffffff";
                }}
              >
                <span>{cat}</span>

                {selected && (
                  <span
                    style={{
                      color: "#ff5a1f",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;