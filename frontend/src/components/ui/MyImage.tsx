import Image, { ImageProps } from "next/image";

const PREFIX = "http://localhost:8080";

interface MyImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export default function MyImage({ src, ...props }: MyImageProps) {
  return <Image src={PREFIX + src} {...props} />;
}
