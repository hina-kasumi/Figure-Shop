interface ColorBoxProps {
  className?: string;
  children?: React.ReactNode;
  color: "red" | "green" | "blue";
}

export default function ColorBox({
  children,
  className = "",
  color,
}: ColorBoxProps) {
  const colorMap: Record<ColorBoxProps["color"], string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  const classNameColor = colorMap[color];

  return (
    <div
      className={`${classNameColor} ${className} text-white py-1 px-2 text-xs w-fit rounded-md`}
    >
      {children}
    </div>
  );
}
