import Image from "next/image";
import imgSrc from "../../../public/jhfigure_logo.png";

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
    <div className={`${className} relative`} style={{ width, height }}>
      <Image src={imgSrc} alt="Logo" fill objectFit="contain" />
    </div>
  );
}
