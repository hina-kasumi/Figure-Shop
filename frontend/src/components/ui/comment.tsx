"use client";

import { CommentType } from "@/types/figure";
import { FaRegStar, FaStar } from "react-icons/fa";

interface CommentProps extends CommentType {
  className?: string;
}

export default function Comment({
  className,
  content,
  userID,
  vote,
  name,
  createdAt,
}: CommentProps) {
  const date = new Date(createdAt);

  return (
    <div className={`${className} `}>
      <div className="px-4 py-2 bg-gray-200 rounded-md">
        <div className="font-bold text-sm">{name}</div>
        <div>
          {Array.from({ length: 5 }).map((_, index) => {
            const starNumber = index + 1;
            const Icon = starNumber <= vote ? FaStar : FaRegStar;
            return <Icon key={index} className="inline text-yellow-400" />;
          })}
        </div>
        <div>{content}</div>
        <div className="text-xs text-gray-500">
          <span className="mr-4">{date.toLocaleDateString("vi-VN")}</span>
          <span>
            {date.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
