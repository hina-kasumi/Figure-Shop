import { useState } from "react";

interface CommentInputProps {
  className?: string;
  handleSubmit: (content: string) => void;
}

export default function CommentInput({
  className,
  handleSubmit,
}: CommentInputProps) {
  const [commentContent, setCommentContent] = useState<string>("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const content = commentContent.trim();
      if (content) {
        handleSubmit(content);
        setCommentContent("");
      }
    }
  }

  function handleClick() {
    const content = commentContent.trim();
    if (content) {
      handleSubmit(content);
      setCommentContent("");
    }
  }

  return (
    <div>
      <textarea
        className={`${className} w-full p-2 border border-gray-300 rounded-md`}
        placeholder="Viết bình luận của bạn..."
        rows={4}
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
        onKeyDown={handleKeyDown}
      ></textarea>
      <div className="flex justify-end">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleClick}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
