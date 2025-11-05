import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface CommentInputProps {
  className?: string;
  handleSubmit: (content: string, rating: number) => void;
}

export default function CommentInput({
  className,
  handleSubmit,
}: CommentInputProps) {
  const [commentContent, setCommentContent] = useState<string>("");
  const [rating, setRating] = useState(0);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const content = commentContent.trim();
      if (content) {
        handleSubmit(content, rating);
        setCommentContent("");
        setRating(0);
      }
    }
  }

  function handleClick() {
    const content = commentContent.trim();
    if (content) {
      handleSubmit(content, rating);
      setCommentContent("");
      setRating(0);
    }
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            className={`cursor-pointer transition ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
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
