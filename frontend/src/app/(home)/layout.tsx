"use client";

import CircleBtn from "@/components/ui/circle-btn";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";
import Slider from "@/components/ui/slider";
import { CartProvider } from "@/hooks/cart-hook";
import {
  handleCallClick,
  handleMessengerClick,
  handleScrollToTop,
} from "@/utils/handle-click";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaChevronUp, FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="bg-gray-100">
      <CartProvider>
        <Header />
        <div className="bg-background shadow-md">
          <Navbar className="mx-auto max-w-7xl" />
        </div>
        <div className="mx-auto max-w-7xl">
          <Slider className="pr-4" />
          <div className="max-w-7xl pb-4">{children}</div>
        </div>
        <Footer />
        <div className="fixed bottom-8 right-2 flex flex-col gap-2 text-background">
          <CircleBtn
            onClick={() => handleCallClick()}
            className="bg-red-400 h-12 w-12"
          >
            <FaPhoneAlt />
          </CircleBtn>
          <CircleBtn
            onClick={() => handleMessengerClick()}
            className="bg-blue-400 h-12 w-12"
          >
            <FaFacebookMessenger />
          </CircleBtn>
          <CircleBtn
            onClick={() => handleScrollToTop()}
            className="bg-gray-400 h-12 w-12"
          >
            <FaChevronUp />
          </CircleBtn>
        </div>
      </CartProvider>
    </div>
  );
}
