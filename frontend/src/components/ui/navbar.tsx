import Link from "next/link";
import { CiGrid41 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { MdOutlineLocalPolice } from "react-icons/md";
import { SlCalculator } from "react-icons/sl";

interface NavbarProps {
  className?: string;
}
const size = 24;
const navItems = [
  {
    icon: <MdOutlineLocalPolice size={size} />,
    name: "Giao hàng & Bảo hành",
    link: "/payment-and-policy",
  },
  {
    icon: <IoIosSearch size={size} />,
    name: "Tra cứu đơn hàng",
    link: "/",
  },
  {
    icon: <SlCalculator size={size} />,
    name: "Tính giá gom hàng",
    link: "/",
  },
  {
    icon: <LuMessageCircleQuestion size={size} />,
    name: "FAQ",
    link: "/faq",
  },
  {
    icon: <IoNewspaperOutline size={size} />,
    name: "Tin tức",
    link: "/",
  },
];

export default function Navbar({ className }: NavbarProps) {
  return (
    <div className={`${className} flex items-center gap-3 bg-theme-200 text-black flex-wrap`}>
      <div className="flex items-center gap-1 p-2 hover:bg-theme-200 bg-black text-background w-[20vw] min-w-16">
        <div>
          <CiGrid41 size={size} />
        </div>
        <div>MENU</div>
      </div>
      {navItems.map((item) => (
        <Link
          href={item.link}
          key={item.name}
          className="flex items-center gap-1 p-2 hover:bg-theme-200 cursor-pointer hover:text-theme-400 transition-all"
        >
          <div>{item.icon}</div>
          <div>{item.name}</div>
        </Link>
      ))}
    </div>
  );
}
