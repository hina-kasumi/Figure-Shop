"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";

interface TickerBoxProps {
  title: string;
  className?: string;
  height?: string | number;
  items: Item[];
  curValue: string | number;
  handleChange: (value: string) => void;
}

interface Item {
  id: string | number;
  name: string;
}

export default function TickerBox({
  title,
  className = "",
  items,
  curValue,
  height = 200,
  handleChange,
}: TickerBoxProps) {
  const [isMinimal, setIsMinimal] = useState<boolean>(false);

  return (
    <div className={`${className} rounded bg-white px-4 py-2.5`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsMinimal(!isMinimal)}
      >
        <div>{title}</div>
        <div>{isMinimal ? <GoPlus /> : <HiMinusSmall />}</div>
      </div>
      <div
        className={`${
          isMinimal ? "h-0" : "h-0.5"
        } bg-gray-200 my-0.5 transition-all duration-300`}
      ></div>
      <div
        className={`${
          isMinimal ? "overflow-hidden" : "overflow-y-auto"
        } transition-all duration-300`}
        style={{ height: isMinimal ? 0 : height }}
      >
        <div className="flex flex-col space-y-2 mt-2">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={title}
                checked={curValue == item.id}
                value={item.id}
                onClick={() => handleChange(item.id.toString())}
                onChange={() => {}}
              />
              <div>{item.name}</div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
