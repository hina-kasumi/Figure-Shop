export function discountedPrice(price: number, salePercent?: number): number {
  if (!salePercent) return price;
  return Math.round(price * (1 - salePercent / 100) * 10) / 10;
}
