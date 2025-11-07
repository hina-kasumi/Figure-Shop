import { useCart } from "@/hooks/cart-hook";
import { useBranches, useCategories } from "@/hooks/figure-hook";
import { FigureDetailResponse } from "@/types/figure";
import { nameOfBranch, nameOfCategory } from "@/utils/exact-utils";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import ImageList from "../figure-detail/images-list";
import ColorBox from "./color-box";
import PriceShow from "./price-show";

interface BasicFigureInfoProps {
  className?: string;
  figure: FigureDetailResponse;
  handleAddFigure: (figureID: string, buyNumber: number) => void;
}

export default function BasicFigureInfo({
  figure,
  className,
  handleAddFigure,
}: BasicFigureInfoProps) {
  const [buyNumber, setBuyNumber] = useState(1);
  const { data: branches } = useBranches();
  const { data: categories } = useCategories();
  const { addCartItem } = useCart();

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

  function handleClickAddFigure(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    addCartItem(figure.id, buyNumber)
      .then(() => {
        alert("Đã thêm vào giỏ hàng!");
      })
      .catch((err) => {
        alert("Lỗi khi thêm vào giỏ hàng: " + (err.message || err));
      });
    handleAddFigure(figure.id, buyNumber);
  }

  return (
    <div
      className={`${className} grid grid-cols-1 lg:grid-cols-2 gap-4 md:h-fit md:w-fit z-10 p-4`}
    >
      <div className="flex gap-4 md:justify-center flex-col md:flex-row h-full overflow-auto no-scrollbar">
        {/* Image */}
        <ImageList
          images={figure.imgSrc}
          salePercent={figure.salePercent}
          className=""
        />
      </div>
      <div>
        {/* Information */}
        <div>
          <h1 className="text-2xl font-semibold">{figure.name}</h1>
          <div>
            Thương hiệu:{" "}
            <span className="text-red-500 font-bold">
              {nameOfBranch(branches, figure.branchId)}
            </span>{" "}
            | Loại:{" "}
            <span className="text-red-500 font-bold">
              {nameOfCategory(categories, figure.categoryId)}
            </span>
          </div>
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
              className="text-xl w-fit"
              salePercent={figure.salePercent}
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
              onClick={handleClickAddFigure}
            >
              <p className="font-semibold">THÊM VÀO GIỎ</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
