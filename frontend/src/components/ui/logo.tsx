import Image from "next/image";
import imgSrc from "../../../public/image.png";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, height, width }: LogoProps) {
  const orginalWidth = imgSrc.width;
  const orginalHeight = imgSrc.height;
  if (width && !height) {
    height = (width / orginalWidth) * orginalHeight;
  } else if (!width && height) {
    width = (height / orginalHeight) * orginalWidth;
  } else if (!width && !height) {
    width = orginalWidth;
    height = orginalHeight;
  }
  return (
    <div className={`${className} relative`} style={{ width: 50, height: 50 }}>
      <Image src={imgSrc} alt="Logo" fill objectFit="contain" />
    </div>
  );
}
