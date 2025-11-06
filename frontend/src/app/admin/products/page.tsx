"use client";

import ProductPage from "@/components/admin/products/products-page";
import { Suspense } from "react";

export default function Product() {
  return (
    <Suspense fallback={<div>Đang tải trang sản phẩm...</div>}>
      <ProductPage />
    </Suspense>
  );
}
