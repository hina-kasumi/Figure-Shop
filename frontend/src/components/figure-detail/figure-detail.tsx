import { useComments, useFigureDetail } from "@/hooks/figure-hook";
import Link from "next/link";
import { FaCheckCircle, FaGlobe, FaTruck } from "react-icons/fa";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BasicFigureInfo from "../ui/basic-figure-info";
import Comment from "../ui/comment";
import CommentInput from "../ui/comment-input";
import InfoBox from "./info-box";

const commitments = [
  { icon: FaCheckCircle, text: "Bảo Đảm Giá Đặt Trước" },
  { icon: FaCheckCircle, text: "Hàng chính hãng, bảo hành lỗi NSX" },
  { icon: FaTruck, text: "FREE SHIPPING toàn quốc đơn hàng trên 400K" },
  { icon: FaGlobe, text: "International Shipping now available!" },
];

const notices = [
  { text: "Khách đọc kỹ ngày phát hành (dự kiến) của sản phẩm" },
  {
    text: "Hàng đặt trước giá có thể thay đổi, khách hãy inbox để xác nhận giá trước khi đặt mua",
  },
  {
    text: (
      <>
        Mỗi nguồn hàng có chính sách bảo hành khác nhau. Vui lòng xem chi tiết
        tại{" "}
        <Link href={"/payment-and-policy"} className="text-blue-600">
          Đây
        </Link>
      </>
    ),
  },
];

interface FigureDetailPageProps {
  figureID: string;
}

export default function FigureDetailPage({ figureID }: FigureDetailPageProps) {
  const { data: figure } = useFigureDetail(figureID);
  const { data: comments, postComment } = useComments(figureID);

  function handleAddFigure(figureID: string, buyNumber: number) {
    console.log("Add figure:", figureID, "Number:", buyNumber);
  }

  function handleSubmitComment(content: string, rating: number) {
    postComment(content, rating);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 ">
      <div className="bg-white h-full rounded">
        <BasicFigureInfo figure={figure} handleAddFigure={handleAddFigure} />
      </div>
      <div className="space-y-6 bg-white h-full p-4 rounded">
        <InfoBox title="Cam kết bán hàng" items={commitments} type="commit" />
        <InfoBox title="Lưu ý khi mua hàng" items={notices} type="notice" />
      </div>

      <div className="bg-white h-full w-full md:col-span-2 p-4 rounded ">
        <div className="prose font-sans">
          <Markdown remarkPlugins={[remarkGfm]}>{figure.description}</Markdown>
        </div>
      </div>
      <div className="md:col-span-2 bg-white rounded p-4">
        <CommentInput className="" handleSubmit={handleSubmitComment} />
        {comments.map((comment, index) => (
          <Comment
            className="mt-2"
            key={index}
            id={comment.id}
            content={comment.content}
            user={comment.user}
            vote={comment.vote}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
