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
    // ✅ Giả lập API call
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
                branch: "One Piece",
                category: "Anime Figure",
                description: "Mô hình Luffy Gear 5 cực ngầu",
                status: "available",
                price: 150000,
                salePercent: 10,
                vote: 5,
                tags: ["onepiece", "luffy", "gear5"],
                quantity: 50,
                createdAt: "2025-01-01",
                updatedAt: "2025-01-10",
              },
            },
            {
              id: "of2",
              orderID: "1",
              figureID: "f2",
              userID: "u1",
              quantity: 2,
              price: 75000,
              figure: {
                id: "f2",
                name: "Zoro Enma",
                imgSrc: ["/images/zoro.jpg"],
                branch: "One Piece",
                category: "Anime Figure",
                description: "Zoro với thanh kiếm Enma",
                status: "available",
                price: 75000,
                vote: 4.8,
                tags: ["onepiece", "zoro"],
                quantity: 100,
                createdAt: "2025-02-15",
                updatedAt: "2025-02-20",
              },
            },
          ],
        },
        {
          id: "2",
          userID: "u1",
          voucherID: null,
          status: "completed",
          price: 150000,
          priceDiscounted: 135000,
          phoneNumber: "0909123456",
          address: "456 Lê Lợi, TP.HCM",
          createdAt: "2025-09-20",
          createdBy: "u1",
          updatedAt: "2025-09-22",
          updatedBy: "u1",
          figures: [
            {
              id: "of3",
              orderID: "2",
              figureID: "f3",
              userID: "u1",
              quantity: 1,
              price: 135000,
              figure: {
                id: "f3",
                name: "Naruto Sage Mode",
                imgSrc: ["/images/naruto.jpg"],
                branch: "Naruto",
                category: "Anime Figure",
                description: "Naruto ở trạng thái Hiền nhân",
                status: "available",
                price: 135000,
                vote: 4.9,
                tags: ["naruto", "sage"],
                quantity: 60,
                createdAt: "2025-03-01",
                updatedAt: "2025-03-10",
              },
            },
          ],
        },
        {
          id: "3",
          userID: "u1",
          voucherID: null,
          status: "completed",
          price: 200000,
          priceDiscounted: 180000,
          phoneNumber: "0909123456",
          address: "789 Trần Hưng Đạo, Đà Nẵng",
          createdAt: "2025-09-10",
          createdBy: "u1",
          updatedAt: "2025-09-12",
          updatedBy: "u1",
          figures: [
            {
              id: "of4",
              orderID: "3",
              figureID: "f4",
              userID: "u1",
              quantity: 1,
              price: 180000,
              figure: {
                id: "f4",
                name: "Gojo Satoru",
                imgSrc: ["/images/gojo.jpg"],
                branch: "Jujutsu Kaisen",
                category: "Anime Figure",
                description: "Gojo với đôi mắt sáu",
                status: "available",
                price: 180000,
                vote: 5,
                tags: ["jujutsu", "gojo"],
                quantity: 30,
                createdAt: "2025-04-05",
                updatedAt: "2025-04-15",
              },
            },
          ],
        },
        {
          id: "4",
          userID: "u1",
          voucherID: null,
          status: "completed",
          price: 250000,
          priceDiscounted: 225000,
          phoneNumber: "0909123456",
          address: "12 Nguyễn Huệ, Cần Thơ",
          createdAt: "2025-08-10",
          createdBy: "u1",
          updatedAt: "2025-08-12",
          updatedBy: "u1",
          figures: [
            {
              id: "of5",
              orderID: "4",
              figureID: "f5",
              userID: "u1",
              quantity: 1,
              price: 225000,
              figure: {
                id: "f5",
                name: "Tanjiro Kamado",
                imgSrc: ["/images/tanjiro.jpg"],
                branch: "Kimetsu no Yaiba",
                category: "Anime Figure",
                description: "Tanjiro với thanh kiếm Nichirin",
                status: "available",
                price: 225000,
                vote: 4.7,
                tags: ["demon-slayer", "tanjiro"],
                quantity: 80,
                createdAt: "2025-05-01",
                updatedAt: "2025-05-10",
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
