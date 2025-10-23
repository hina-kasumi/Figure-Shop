import { CommentType, FigureCardInformation } from "@/types/figure";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle, FaGlobe, FaTruck } from "react-icons/fa";
import BasicFigureInfo from "../ui/basic-figure-info";
import InfoBox from "./info-box";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Comment from "../ui/comment";
import CommentInput from "../ui/comment-input";

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

const figureDetail: FigureCardInformation = {
  id: "1",
  name: "Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure",
  branch: "Apex Innovation",
  category: "Figure",
  images: [
    "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_3_7028f60006c8487b88e8885ed61fdc25_grande.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_4_960e7d3ed8ff44a2b4533bc8d3b42c5c_grande.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_5_e0ea2a741ea241608d1fb299e484162f_grande.jpg",
    "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_3_7028f60006c8487b88e8885ed61fdc25_grande.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_4_960e7d3ed8ff44a2b4533bc8d3b42c5c_grande.jpg",
    "https://product.hstatic.net/200000462939/product/gsc20878_5_e0ea2a741ea241608d1fb299e484162f_grande.jpg",
    "https://cdn.hstatic.net/products/200000462939/i__character_hobby_shop__chocopuni_plushie_tv_anime_the_apothecary_dia_fec592dbbb56413e80f175d9f64f8a59_master.jpg",
  ],
  status: "In Stock",
  description: `# Violet Evergarden 1/7 - Violet Evergarden | Apex Innovation Figure`,
  price: 29.99,
  salePercent: 2,
  rating: 4.5,
  tags: ["anime", "manga"],
  quantity: 10,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-02T00:00:00Z",
};

const comments: CommentType[] = [
  {
    userID: "u1",
    name: "Nguyễn Minh",
    vote: 5,
    content: "Mô hình cực kỳ chi tiết và đẹp! Đáng tiền.",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    userID: "u2",
    name: "Lê Hồng",
    vote: 4,
    content: "Chất lượng tốt, giao hàng nhanh, nhưng hộp hơi móp.",
    createdAt: "2024-01-16T12:30:00Z",
  },
  {
    userID: "u2",
    name: "Trần Thảo",
    vote: 3,
    content: "Ổn, nhưng mong có thêm phụ kiện đi kèm.",
    createdAt: "2024-01-17T14:45:00Z",
  },
];

export default function FigureDetailPage({ figureID }: FigureDetailPageProps) {
  const [figure, setFigure] = useState(figureDetail);
  const [figureComments, setFigureComments] = useState(comments);

  function handleAddFigure(figureID: string, buyNumber: number) {
    console.log("Add figure:", figureID, "Number:", buyNumber);
  }

  function handleSubmitComment(content: string) {
    console.log("Submit comment:", content);
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
        {figureComments.map((comment, index) => (
          <Comment
            className="mt-2"
            key={index}
            userID={comment.userID}
            content={comment.content}
            name={comment.name}
            vote={comment.vote}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
