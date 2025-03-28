import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`border-none rounded-full transition-colors ${
        star <= rating
          ? "text-yellow-500 hover:bg-yellow-200"
          : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-3 h-3 md:w-4 md:h-4 ${
          star <= rating ? "fill-yellow-500" : "fill-gray-500"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
