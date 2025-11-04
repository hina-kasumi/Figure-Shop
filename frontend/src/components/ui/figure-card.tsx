"use client";

import { FigureCardInformation } from "@/types/figure";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import BasicFigureInfo from "./basic-figure-info";
import CircleBtn from "./circle-btn";
import ColorBox from "./color-box";
import DiscountTag from "./discount-tag";
import PriceShow from "./price-show";
import { IoMdCloseCircle } from "react-icons/io";

interface FigureCardProps {
  className?: string;
  figure: FigureCardInformation;
}

export default function FigureCard({ figure, className }: FigureCardProps) {
  const [preview, setPreview] = useState<boolean>(false);
  const image = figure.imgSrc[0];

  function handleClick() {
    setPreview(true);
  }

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [preview]);

  return (
    <>
      <Link
        href={`/figures/${figure.id}`}
        className={`${className} group text-sm border border-gray-200 p-1.5 pb-2.5`}
        title={figure.name}
      >
        <div className="relative w-full aspect-[1/1] mb-2 overflow-hidden">
          <Image
            src={image}
            alt={figure.name}
            fill
            objectFit="cover"
            objectPosition="center"
          />
          <CircleBtn
            className="bg-white group-hover:h-10 h-0 group-hover:w-10 w-0 group-hover:opacity-100 opacity-0 transition-all duration-300 ease-linear absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={handleClick}
          >
            <IoSearch />
          </CircleBtn>
          <DiscountTag
            percent={figure.salePercent}
            className="absolute right-1"
          />
        </div>
        <div>
          <div className="line-clamp-2 my-2">{figure.name}</div>
          <div>
            {figure.quantity <= 0 ? (
              <ColorBox color="red">Hết hàng</ColorBox>
            ) : (
              <PriceShow
                price={figure.price}
                salePercent={figure.salePercent}
              />
            )}
          </div>
        </div>
      </Link>
      {preview && FigurePreview(figure, setPreview)}
    </>
  );
}

function FigurePreview(
  figure: FigureCardInformation,
  setPreview: (value: boolean) => void
) {
  function handleAddFigure(figureID: string, buyNumber: number) {
    alert(`Đã thêm ${buyNumber} sản phẩm vào giỏ hàng`);
    setPreview(false);
  }

  function handleClose() {
    setPreview(false);
  }

  return (
    <div
      className="fixed z-10 left-0 top-0 p-4 w-[100vw] h-[100vh] bg-black/30 flex justify-center items-center transition-opacity duration-300 ease-in-out"
      onClick={handleClose}
    >
      <div className="relative w-4xl bg-white" onClick={(e) => e.stopPropagation()}>
        <BasicFigureInfo figure={figure} handleAddFigure={handleAddFigure} />
        <CircleBtn
          onClick={handleClose}
          className="absolute top-0 right-0 -translate-y-4 translate-x-4"
        >
          <IoMdCloseCircle className="bg-white rounded-full" />
        </CircleBtn>
      </div>
    </div>
  );
}
