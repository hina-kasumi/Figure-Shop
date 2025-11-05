"use client";

import CollectionsPage from "@/components/collections/collections";
import { useSearchParams } from "next/navigation";

export default function Collections() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const sortBy =
    (searchParams.get("sortBy") as
      | "hot_desc"
      | "price_asc"
      | "price_desc"
      | null) || undefined;
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const branchId = searchParams.get("branchId") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;

  return (
    <CollectionsPage
      keyword={keyword}
      sortBy={sortBy}
      minPrice={minPrice}
      maxPrice={maxPrice}
      branchId={branchId}
      categoryId={categoryId}
    />
  );
}
