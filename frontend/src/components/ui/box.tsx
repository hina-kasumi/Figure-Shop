import React from "react";

interface BoxProps {
  title?: string;
  advandedTitle?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function Box({
  title,
  className,
  children,
  advandedTitle,
}: BoxProps) {
  return (
    <div className={`${className} rounded p-4 bg-white shadow-md`}>
      {title && (
        <div className="flex justify-between items-center flex-wrap mb-3.5">
          <div className="font-bold text-xl pl-3 border-l-4">{title.toUpperCase()}</div>
          <div>{advandedTitle}</div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
