import { Star, StarHalf } from "lucide-react";

const Rating = ({ value = 0, numReviews, size = 14, showCount = true }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<Star key={i} size={size} fill="#FFB100" color="#FFB100" />);
    } else if (value >= i - 0.5) {
      stars.push(<StarHalf key={i} size={size} fill="#FFB100" color="#FFB100" />);
    } else {
      stars.push(<Star key={i} size={size} color="#D6D9DE" />);
    }
  }

  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <div className="flex" style={{ gap: 1 }}>
        {stars}
      </div>
      {showCount && numReviews !== undefined && (
        <span className="text-faint" style={{ fontSize: "0.78rem" }}>
          ({numReviews.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default Rating;
