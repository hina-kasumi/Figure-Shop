"use client";

import FigureDetailPage from "@/components/figure-detail/figure-detail";
import { useParams } from "next/navigation";

export default function FigureDetail() {
  const figureID = useParams<{ "figure-id": string }>();

  return <FigureDetailPage figureID={figureID["figure-id"]} />;
}
