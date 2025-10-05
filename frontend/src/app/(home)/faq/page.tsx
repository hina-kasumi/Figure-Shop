"use client";

import Image from "next/image";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Hàng đặt trước (Pre-Order/Order) là gì?",
      answer: (
        <>
          <strong className="text-red-600 font-semibold">JH Figure</strong> nhận
          đặt hàng mọi sản phẩm anime chính hãng từ các nguồn Nhật/Trung/Mỹ.
          <br />- <strong>PRE-ORDER</strong> là đặt trước sản phẩm{" "}
          <strong>chưa ra mắt</strong>. Sau khi thời gian đặt hàng kết thúc, nhà
          sản xuất sẽ sản xuất theo số lượng đặt và giao cho khách đã đặt trước.{" "}
          <br />- <strong>ORDER</strong> là đặt mua sản phẩm{" "}
          <strong>đang lưu hành</strong> nhưng không sẵn kho. Giao sau 10–14
          ngày. Giá hàng Order có thể thay đổi, nên hãy inbox để được tư vấn.
        </>
      ),
    },
    {
      question: "Có cần cọc khi đặt hàng?",
      answer: (
        <>
          Khi đặt hàng Pre-Order/Order bạn cần cọc tối thiểu 30% giá trị đơn
          hàng (chuyển khoản hoặc COD trong trường hợp đặc biệt).
          <br />
          <u>LƯU Ý:</u>
          <br />– Hủy đơn sẽ bị mất cọc, một số mặt hàng có thể chuyển cọc thành
          voucher mua hàng (chỉ áp dụng hàng có sẵn).
          <br />– Nếu shop không thể giao hàng do lỗi từ NSX, NPP hoặc shop nước
          ngoài, bạn được hoàn cọc + voucher 10% giá trị đã cọc.
        </>
      ),
    },
    {
      question: "Thời gian giao hàng? Thời gian 'keep' hàng?",
      answer: (
        <>
          – <strong>Thời gian giao hàng:</strong>{" "}
          <strong className="text-red-600 font-semibold">JH Figure</strong> giao
          hỏa tốc 2h nội thành TP.HCM, xử lý đơn trong 24h. Pre-Order/Order về
          VN sau 10–14 ngày, giao nội địa 1–3 ngày. <br />–{" "}
          <strong>Thời gian keep hàng:</strong> Giữ tối đa 30 ngày kể từ khi
          hàng về kho. Liên hệ fanpage nếu cần thêm thời gian. Hàng keep không
          hỗ trợ bảo hành.
        </>
      ),
    },
    {
      question: "Các hình thức thanh toán?",
      answer: (
        <>
          <strong className="text-red-600 font-semibold">JH Figure</strong> hỗ
          trợ:
          <ul className="list-disc pl-5">
            <li>COD khi nhận hàng (đơn &gt; 1tr có thêm phí thu hộ).</li>
            <li>Ví MOMO.</li>
            <li>Chuyển khoản ngân hàng.</li>
            <li>PayOn (thẻ quốc tế debit / credit).</li>
            <li>Paypal (dành cho khách ở nước ngoài).</li>
          </ul>
        </>
      ),
    },
    {
      question: "Quy định bảo hành đổi trả. Bảo hành 1:1 nghĩa là gì?",
      answer: (
        <>
          <strong className="text-red-600 font-semibold">JH Figure</strong> hỗ
          trợ bảo hành 1:1 đổi mới sản phẩm lỗi nhà sản xuất.
          <br />
          Chi tiết xem tại mục{" "}
          <a
            href="https://jhfigure.com/pages/chinh-sach-doi-tra"
            className="text-blue-600 underline"
          >
            chính sách đổi trả & bảo hành
          </a>
          .
        </>
      ),
    },
    {
      question: "Shop có đảm bảo hàng box đẹp hay không?",
      answer: (
        <>
          – <strong className="text-red-600 font-semibold">JH Figure</strong>{" "}
          cam kết box đẹp cho sản phẩm có sẵn hoặc Pre-Order/Order nguồn
          Nhật/Mỹ.
          <br />– Hàng Order nguồn Trung: shop không đảm bảo box đẹp do vận
          chuyển, nhưng sản phẩm luôn đảm bảo chất lượng.
        </>
      ),
    },
    {
      question: "Tôi có thể đến mua trực tiếp hay không?",
      answer: (
        <>
          <strong className="text-red-600 font-semibold">JH Figure</strong>{" "}
          không có cửa hàng trưng bày.
          <br />
          Khách có thể liên hệ trước nếu muốn xem hoặc nhận hàng tại kho.
        </>
      ),
    },
    {
      question: "Shop có ship nước ngoài không?",
      answer: (
        <>
          Xem chi tiết dịch vụ ship quốc tế của{" "}
          <strong className="text-red-600 font-semibold">JH Figure</strong>{" "}
          <a
            href="https://jhfigure.com/pages/ship-quoc-te"
            className="text-blue-600 underline"
          >
            tại đây
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="bg-white px-4 py-8">
      <div className="heading-page mb-6 text-center">
        <h1 className="text-2xl font-bold">Các câu hỏi thường gặp (FAQ)</h1>
      </div>

      {/* Hình minh họa */}
      <div className="relative h-[150vh] flex justify-center mb-8">
        <Image
          src="/order_process.png"
          alt="Order process"
          className="rounded-lg shadow-md"
          objectFit="contain"
          fill
        />
      </div>

      {/* Accordion FAQ */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full text-left p-4 font-semibold flex justify-between items-center ${
                openIndex === index
                  ? "bg-theme-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>

            <div
              className={`px-4 text-gray-700 bg-white border-t overflow-hidden transition-all duration-300 ease-in ${
                openIndex === index
                  ? "opacity-100 translate-y-0 py-4"
                  : "opacity-0 max-h-0 p-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
