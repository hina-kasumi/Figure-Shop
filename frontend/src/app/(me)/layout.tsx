import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";
import { CartProvider } from "@/hooks/cart-hook";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CartProvider>
        <Header />
        <div className="bg-background shadow-md">
          <Navbar className="mx-auto max-w-7xl" />
        </div>
        <div className="mx-auto max-w-7xl">{children}</div>
      </CartProvider>
    </div>
  );
}
