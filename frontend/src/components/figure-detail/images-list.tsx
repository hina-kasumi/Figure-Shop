import { useState } from "react";
import DiscountTag from "../ui/discount-tag";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MyImage from "../ui/MyImage";

interface ImageListProps {
  className?: string;
  images: string[];
  salePercent?: number;
}

export default function ImageList({
  images,
  className,
  salePercent,
}: ImageListProps) {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const maxViewable = 6;
  const currImage = images[currIndex];

  function handlePrev() {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
    }
  }

  function handleNext() {
    if (currIndex < images.length - 1) {
      setCurrIndex(currIndex + 1);
    }
  }

  return (
    <div className={`${className} w-full`}>
      <div className="relative w-full aspect-square mx-auto mb-2">
        <MyImage
          src={currImage || "/no-image.png"}
          alt="figure-image"
          fill
          objectFit="contain"
          objectPosition="center"
        />
        <DiscountTag percent={salePercent} className="absolute right-1" />
        <FaAngleLeft
          className="absolute top-1/2 -translate-y-1/2 left-0 border rounded-full cursor-pointer select-none hover:bg-gray-200 transition-all duration-200 ease-in-out"
          onClick={handlePrev}
          size={28}
        />
        <FaAngleRight
          className="absolute top-1/2 -translate-y-1/2 right-0 border rounded-full cursor-pointer select-none hover:bg-gray-200 transition-all duration-200 ease-in-out"
          onClick={handleNext}
          size={28}
        />
      </div>
      <div className="grid grid-cols-6 mx-auto gap-2 overflow-x-hidden">
        {images.map((image, index) => {
          if (index < currIndex + maxViewable && index >= currIndex) {
            return (
              <div
                key={index}
                className={`relative mx-auto aspect-square w-full ${
                  index === currIndex ? "border" : ""
                }`}
              >
                <MyImage
                  src={image || "/no-image.png"}
                  alt="figure-image"
                  fill
                  onClick={() => setCurrIndex(index)}
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
