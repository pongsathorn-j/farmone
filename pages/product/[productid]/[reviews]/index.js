import React from "react";
import { useRouter } from "next/router";

const Review = () => {
  const router = useRouter();
  const { productid, reviews } = router.query;
  return (
    <div>
      product detail {productid} Review {reviews}
    </div>
  );
};

export default Review;
