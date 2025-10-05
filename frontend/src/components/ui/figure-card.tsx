"use client";

import { FigureCardInformation } from "@/types/figure";
import { discountedPrice } from "@/utils/math";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import CircleBtn from "./circle-btn";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import ColorBox from "./color-box";

interface FigureCardProps {
  className?: string;
  figure: FigureCardInformation;
}

export default function FigureCard({ figure, className }: FigureCardProps) {
  const [preview, setPreview] = useState<boolean>(false);
  const [buyNumber, setBuyNumber] = useState<number>(1);

  function handleClick() {
    setPreview(true);
  }

  useEffect(() => {
    if (preview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setBuyNumber(1);
    return () => {
      document.body.style.overflow = "auto";
      setBuyNumber(1);
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
            src={figure.image}
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
      {preview && FigurePreview(figure, setPreview, buyNumber, setBuyNumber)}
    </>
  );
}

function FigurePreview(
  figure: FigureCardInformation,
  setPreview: (value: boolean) => void,
  buyNumber: number,
  setBuyNumber: (value: number) => void
) {
  function handleIncrease() {
    if (buyNumber < figure.quantity) {
      setBuyNumber(buyNumber + 1);
    }
  }
  function handleDecrease() {
    if (buyNumber > 1) {
      setBuyNumber(buyNumber - 1);
    }
  }

  function handleAddFigure() {
    alert(`Đã thêm ${buyNumber} sản phẩm vào giỏ hàng`);
    setPreview(false);
  }

  return (
    <div className="fixed z-10 left-0 top-0 p-4 w-[100vw] h-[100vh] bg-black/30 flex justify-center items-center transition-opacity duration-300 ease-in-out">
      <div className="relative rounded-xl h-full w-full md:h-fit md:w-fit z-10 bg-white p-4">
        <div className="flex gap-4 md:justify-center flex-col md:flex-row h-full overflow-auto no-scrollbar">
          {/* Image */}
          <div className="relative w-full md:w-96 aspect-square">
            <Image
              src={figure.image}
              alt={figure.name}
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <DiscountTag
              percent={figure.salePercent}
              className="absolute right-1"
            />
          </div>
          {/* Information */}
          <div>
            <div className="text-xl mb-2">{figure.name}</div>
            <div className="mb-4">
              {figure.quantity > 0 ? (
                <ColorBox color="green">Số lượng: {figure.quantity}</ColorBox>
              ) : (
                <ColorBox color="red">Hết hàng</ColorBox>
              )}
            </div>
            <div className="mb-4">
              <PriceShow
                price={figure.price}
                salePercent={figure.salePercent}
                className="justify-start gap-4"
              />
            </div>
            <div className="flex items-center mt-2 border border-gray-300 w-fit mb-4">
              <button onClick={handleDecrease} className="cursor-pointer p-4">
                <FaMinus />
              </button>
              <div className="w-14 text-center">{buyNumber}</div>
              <button onClick={handleIncrease} className="cursor-pointer p-4">
                <FaPlus />
              </button>
            </div>
            <div className="bg-red-600 text-background rounded-md mb-4 hover:bg-red-700">
              <button
                className={`w-full p-3 ${
                  figure.quantity > 0 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={handleAddFigure}
              >
                <p className="font-semibold">THÊM VÀO GIỎ</p>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap mb-4">
              <div>Xem thêm: </div>
              {figure.tags.map((tag, index) => (
                <Link
                  href={`/tags/${tag}`}
                  key={index}
                  className="bg-blue-100 rounded-full px-2"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <Link href="/" className="flex items-center gap-1 underline">
              Xem chi tiết <FaAngleDoubleRight size={12} />
            </Link>
          </div>
        </div>
        {/* Close Preview */}
        <button
          onClick={() => {
            setPreview(false);
          }}
          className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 cursor-pointer"
        >
          <IoMdCloseCircle size={30} className="bg-white rounded-full p-0" />
        </button>
      </div>
    </div>
  );
}

//price after discount
function PriceShow({
  price,
  salePercent,
  className,
}: {
  price: number;
  salePercent?: number;
  className?: string;
}) {
  function originalPrice() {
    if (!salePercent) return <></>;
    if (salePercent > 0)
      return <div className="line-through text-gray-500">{price}đ</div>;
    return <></>;
  }

  return (
    <div className={`${className} flex justify-between items-center gap-2`}>
      <div className=" text-red-600">
        {discountedPrice(price, salePercent)}đ
      </div>
      {originalPrice()}
    </div>
  );
}

// Discount tag component
function DiscountTag({
  percent,
  className,
}: {
  percent?: number;
  className?: string;
}) {
  if (!percent) return <></>;
  return (
    <ColorBox color="red" className={`${className}`}>
      -{percent}%
    </ColorBox>
  );
}
