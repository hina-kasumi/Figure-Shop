"use client";

import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 text-sm">
      {/* Đăng ký nhận tin */}
      <div className="border-b border-neutral-700 py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="uppercase font-semibold">Đăng kí nhận tin</h3>
        <div className="flex w-full md:w-1/2">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 bg-neutral-800 text-white px-3 py-2 outline-none"
          />
          <button className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 uppercase text-sm font-medium">
            Đăng ký
          </button>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 px-6">
        {/* Cột 1 - Thông tin doanh nghiệp */}
        <div>
          <h4 className="font-bold mb-3">JH Figure</h4>
          <p className="text-neutral-300 text-xs leading-5">
            <strong>HỘ KINH DOANH JH FIGURE</strong>
            <br />
            GPKD số 41N8156818 cấp ngày 28/08/2024 tại Sở KH & ĐT TP Hồ Chí
            Minh.
          </p>
          <p className="mt-2 text-xs text-neutral-400">Mở cửa 09:00 - 20:00</p>

          <ul className="mt-2 space-y-1 text-xs text-neutral-400">
            <li>📍 32 Đông Xoài, Phường Tân Bình, TP Hồ Chí Minh</li>
            <li>📞 0396 686 826</li>
            <li>✉️ contact@jhfigure.com</li>
          </ul>

          <img
            src="/bo-cong-thuong.png"
            alt="Bộ Công Thương"
            className="mt-3 w-32"
          />
        </div>

        {/* Cột 2 - Chính sách */}
        <div>
          <h4 className="font-semibold mb-3 uppercase">Chính sách</h4>
          <ul className="space-y-1 text-neutral-400 text-sm">
            <li>• Tìm kiếm</li>
            <li>• Giới thiệu</li>
            <li>• Chính sách bảo mật</li>
            <li>• Chính sách vận chuyển</li>
            <li>• Chính sách đổi trả và bảo hành</li>
            <li>• Chính sách kiểm hàng</li>
            <li>• Chính sách thanh toán</li>
            <li>• Liên hệ</li>
          </ul>
        </div>

        {/* Cột 3 - Hướng dẫn */}
        <div>
          <h4 className="font-semibold mb-3 uppercase">Hướng dẫn</h4>
          <ul className="space-y-1 text-neutral-400 text-sm">
            <li>• Vận chuyển quốc tế</li>
            <li>• Cách bảo quản và vệ sinh mô hình PVC</li>
          </ul>
        </div>

        {/* Cột 4 - Hỗ trợ */}
        <div>
          <h4 className="font-semibold mb-3 uppercase">Hotline hỗ trợ</h4>
          <ul className="space-y-1 text-sm">
            <li>
              Gọi mua hàng:{" "}
              <a href="tel:0396686826" className="text-sky-400 hover:underline">
                0396686826
              </a>
            </li>
            <li>
              Gọi bảo hành:{" "}
              <a href="tel:0396686826" className="text-sky-400 hover:underline">
                0396686826
              </a>
            </li>
            <li>
              Hợp tác kinh doanh:{" "}
              <a href="tel:0399200830" className="text-sky-400 hover:underline">
                0399200830
              </a>
            </li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2 uppercase">
            Phương thức thanh toán
          </h4>
          <img
            src="/footer_trustbadge.png"
            alt="Payment methods"
            className="w-40"
          />

          {/* Icon mạng xã hội */}
          <div className="flex items-center gap-3 mt-4 text-lg">
            <a href="#" className="hover:text-sky-400">
              <SiZalo />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTiktok />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
