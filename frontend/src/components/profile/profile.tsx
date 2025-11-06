"use client";

import { useToken } from "@/hooks/token";
import { Order } from "@/types/order";
import { Voucher } from "@/types/voucher";
import { useEffect, useState } from "react";
import ProfileHeader from "./profile-header";
import ProfileOrders from "./profile-order";
import { ProfileVouchers } from "./profile-voucher";

export default function ProfilePage() {
  const { token } = useToken();
  const [email, setEmail] = useState<string>("user@example.com");
  const [orders, setOrders] = useState<Order[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useEffect(() => {
    // Giả lập API call
    if (!token) {
      // Lấy thông tin user từ token (thực tế nên decode JWT)
      setEmail("john.doe@gmail.com");

      // Fake orders
      setOrders([
        {
          id: "1",
          userID: "u1",
          voucherID: "v1",
          status: "shipping",
          price: 300000,
          priceDiscounted: 270000,
          phoneNumber: "0909123456",
          address: "123 Nguyễn Trãi, Hà Nội",
          createdAt: "2025-10-20",
          createdBy: "u1",
          updatedAt: "2025-10-22",
          updatedBy: "u1",
          figures: [
            {
              id: "of1",
              orderID: "1",
              figureID: "f1",
              userID: "u1",
              quantity: 1,
              price: 150000,
              figure: {
                id: "f1",
                name: "Luffy Gear 5",
                imgSrc: ["/images/luffy.jpg"],
                branch: {
                  id: "b1",
                  name: "Bandai",
                },
                category: {
                  id: "c1",
                  name: "One Piece",
                },
                description: "Mô hình Luffy Gear 5 cực ngầu",
                price: 150000,
                salePercent: 10,
                vote: 5,
                quantity: 50,
                createdAt: "2025-09-15",
                createdBy: "admin",
                updatedAt: "2025-09-20",
                updatedBy: "admin",
                branchId: "b1",
                categoryId: "c1",
              },
            },
          ],
        },
      ]);

      // Fake vouchers
      setVouchers([
        {
          id: "v1",
          minPriceCanUse: 100000,
          maxPriceCanDiscount: 50000,
          figuresAvalable: null,
          description: "Giảm 20% cho đơn từ 100K",
          quantity: 5,
          isActive: true,
          salePercent: 20,
          usedFrom: "2025-10-01",
          usedTo: "2025-12-01",
          createdAt: "2025-09-01",
          createdBy: "admin",
          updatedAt: "2025-09-15",
          updatedBy: "admin",
        },
      ]);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-theme-50 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileHeader email={email} />
        <ProfileVouchers vouchers={vouchers} />
        <ProfileOrders orders={orders} />
      </div>
    </div>
  );
}
