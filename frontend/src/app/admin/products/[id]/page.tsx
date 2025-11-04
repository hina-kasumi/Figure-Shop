"use client";

import ProductFormPage from "@/components/admin/products/product-form";
import { useParams } from "next/navigation";

export default function FigureForm() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  return <ProductFormPage id={id} />;
}
