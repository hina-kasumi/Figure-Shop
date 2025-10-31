import { discountedPrice } from "@/utils/math";

//price after discount
export default function PriceShow({
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