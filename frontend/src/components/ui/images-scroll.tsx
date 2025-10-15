"use client";

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ImagesScrollProps {
  className?: string;
  images: string[];
}

export default function ImagesScroll({ className, images }: ImagesScrollProps) {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [images]);

  function handlePrev() {
    const newIndex = (currIndex - 1 + images.length) % images.length;
    handleChangeIndex(newIndex);
  }
  function handleNext() {
    const newIndex = (currIndex + 1) % images.length;
    handleChangeIndex(newIndex);
  }

  function handleChangeIndex(newIndex: number) {
    setFade(false);

    setTimeout(() => {
      setCurrIndex(newIndex);
      setFade(true);
    }, 500);
  }

  return (
    <div className={`${className} relative overflow-x-hidden group`}>
      {images && images[currIndex] && (
        <img
          src={images[currIndex]}
          alt="Banner"
          className={`transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`rounded-full border border-white p-1 ${
              index == currIndex ? "bg-white" : ""
            }`}
            onClick={() => handleChangeIndex(index)}
          ></div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity hover:text-black text-white"
      >
        <MdKeyboardArrowLeft size={30} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity hover:text-black text-white"
      >
        <MdKeyboardArrowRight size={30} />
      </button>
    </div>
  );
}
