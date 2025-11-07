"use client";

import { useToken } from "@/hooks/token";
import { useVouchers } from "@/hooks/voucher-hook";
import ProfileHeader from "./profile-header";
import ProfileOrders from "./profile-order";
import { ProfileVouchers } from "./profile-voucher";

export default function ProfilePage() {
  const {email} = useToken();
  const { data: vouchers } = useVouchers();

  return (
    <div className="min-h-screen bg-theme-50 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader email={email} />
        <ProfileVouchers vouchers={vouchers} />
        <ProfileOrders />
      </div>
    </div>
  );
}
