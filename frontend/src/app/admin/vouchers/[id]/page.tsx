"use client";

import VoucherFormPage from "@/components/admin/vouchers/voucher-form";
import { useParams } from "next/navigation";

export default function VoucherDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  
  return <VoucherFormPage id={id} />;
}
