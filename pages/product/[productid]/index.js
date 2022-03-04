import React from "react";
import { useRouter } from "next/router";

// http://localhost:3000/product/[:productid]

const ProductDetail = () => {
  const router = useRouter();
  const { productid } = router.query;
  return <div>ProductDetail {productid}</div>;
};

export default ProductDetail;
