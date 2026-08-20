import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    eyebrow: "BIG ELECTRONICS SALE",
    title: "Upgrade Your Everyday Tech.",
    text: "Discover phones, laptops, headphones and accessories with deals up to 50% off.",
    cta: "Shop Electronics",
    href: "/products?category=Electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1900&q=88",
  },
  {
    eyebrow: "STYLE FOR LESS",
    title: "Refresh Your Wardrobe.",
    text: "New-season fashion, shoes and accessories starting from ₹499.",
    cta: "Shop Fashion",
    href: "/products?category=Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1900&q=88",
  },
  {
    eyebrow: "SMARTPHONES YOU'LL LOVE",
    title: "Your Next Phone Is Here.",
    text: "Latest smartphones, accessories and everyday essentials at prices you'll love.",
    cta: "Shop Mobiles",
    href: "/products?category=Mobiles",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1900&q=88",
  },
  {
    eyebrow: "POWER UP YOUR WORKSPACE",
    title: "Build a Better Setup.",
    text: "Laptops, monitors, keyboards and accessories to make every workday better.",
    cta: "Explore Laptops",
    href: "/products?category=Laptops",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1900&q=88",
  },
  {
    eyebrow: "HOME ESSENTIALS",
    title: "Make Home Feel Better.",
    text: "Upgrade your kitchen, living spaces and everyday essentials with great value.",
    cta: "Shop Home & Kitchen",
    href: "/products?category=Home%20%26%20Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1900&q=88",
  },
  {
    eyebrow: "BEAUTY & WELLNESS",
    title: "Feel Good. Look Great.",
    text: "Explore beauty, personal care and wellness favorites for your daily routine.",
    cta: "Explore Beauty",
    href: "/products?category=Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1900&q=88",
  },
];

const HeroBanner = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (index) => {
    setActive((index + slides.length) % slides.length);
  };

  const currentSlide = slides[active];

  return (
    <section
      className="hero-marketplace"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="ShopSphere promotional offers"
    >
      <div
        key={active}
        className="hero-slide hero-slide-animated"
        style={{
          backgroundImage: `url("${currentSlide.image}")`,
        }}
      >
        <div className="hero-overlay" />

        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              {currentSlide.eyebrow}
            </span>

            <h1>{currentSlide.title}</h1>

            <p>{currentSlide.text}</p>

            <Link to={currentSlide.href} className="hero-cta">
              {currentSlide.cta}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow-left"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        type="button"
        className="hero-arrow hero-arrow-right"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="hero-dots" aria-label="Choose promotion">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.eyebrow}
            className={index === active ? "active" : ""}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;