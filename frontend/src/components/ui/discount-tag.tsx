import ColorBox from "./color-box";

// Discount tag component
export default function DiscountTag({
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
