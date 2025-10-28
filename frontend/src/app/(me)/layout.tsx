import Header from "@/components/ui/header";
import Navbar from "@/components/ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="bg-background shadow-md">
        <Navbar className="mx-auto max-w-7xl" />
      </div>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
