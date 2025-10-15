"use client";

interface CircleBtnProps {
  className?: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CircleBtn({
  children,
  className,
  onClick,
}: CircleBtnProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  }
  return (
    <button
      onClick={handleClick}
      className={`${className} flex justify-center items-center rounded-full w-10 h-10 text-2xl cursor-pointer`}
    >
      {children}
    </button>
  );
}
