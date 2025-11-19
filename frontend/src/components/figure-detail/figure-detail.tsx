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
        <Link href="/payment-and-policy" className="font-medium text-indigo-600 hover:underline">
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
  const { data: comments = [], postComment } = useComments(figureID);

  function handleAddFigure(figureID: string, buyNumber: number) {
    console.log("Add figure:", figureID, "Number:", buyNumber);
  }

  function handleSubmitComment(content: string, rating: number) {
    postComment(content, rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Main Content: Hình ảnh + Thông tin + Mua hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Hình ảnh + Mua hàng */}
        <div className="lg:col-span-2 space-y-8">
          <BasicFigureInfo figure={figure} handleAddFigure={handleAddFigure} />
        </div>

        {/* Right Sidebar: Cam kết + Lưu ý */}
        <aside className="space-y-6">
          <InfoBox
            title="Cam kết bán hàng"
            items={commitments}
            type="commit"
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
          />
          <InfoBox
            title="Lưu ý khi mua hàng"
            items={notices}
            type="notice"
            className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
          />
        </aside>
      </div>

      {/* Mô tả sản phẩm */}
      <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-5">
          <h2 className="text-2xl font-bold text-white">Thông tin chi tiết</h2>
        </div>
        <div className="p-8 lg:p-12 prose prose-lg max-w-none font-medium text-gray-700 leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm]}>
            {figure?.description || "*Đang cập nhật mô tả sản phẩm...*"}
          </Markdown>
        </div>
      </section>

      {/* Bình luận */}
      <section className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-5">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            Đánh giá từ khách hàng
            <span className="text-sm font-normal bg-white/30 px-3 py-1 rounded-full">
              {comments.length} bình luận
            </span>
          </h2>
        </div>

        <div className="p-6 lg:p-8 space-y-6">
          <CommentInput
            className="border-2 border-dashed border-pink-200 rounded-2xl bg-pink-50/50"
            handleSubmit={handleSubmitComment}
          />

          <div className="space-y-5">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Comment
                    id={comment.id}
                    content={comment.content}
                    user={comment.user}
                    vote={comment.vote}
                    createdAt={comment.createdAt}
                    className="bg-gradient-to-r from-gray-50 to-pink-50/30 rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Chưa có đánh giá nào</p>
                <p className="text-sm mt-2">Hãy là người đầu tiên để lại nhận xét!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}