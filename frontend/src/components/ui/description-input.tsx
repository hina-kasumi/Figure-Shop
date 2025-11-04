"use client";

import dynamic from "next/dynamic";

// Import MDEditor bằng dynamic import để tránh SSR
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface DescriptionInputProps {
  value: string;
  handleChange: (value: string) => void;
}

export default function DescriptionInput({
  value,
  handleChange,
}: DescriptionInputProps) {
  return (
    <div data-color-mode="light" className="w-full">
      <div className="border rounded overflow-hidden">
        <MDEditor
          value={value}
          onChange={(value) => handleChange(value || "")}
          height={300}
          preview="edit" // chỉ hiển thị chế độ soạn thảo (có thể đổi sang "live" để vừa viết vừa xem)
        />
      </div>
    </div>
  );
}
