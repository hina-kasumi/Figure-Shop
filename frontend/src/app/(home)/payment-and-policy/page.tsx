"use client";

export default function PaymentAndPolicy() {
  return (
    <div className="bg-white px-4 py-8">
      <div className="heading-page clearfix mb-6">
        <h1 className="text-2xl font-bold">Chính sách đổi trả và bảo hành</h1>
      </div>

      <div className="page-content content-entry add-height-img space-y-4 text-neutral-800">
        <p>
          Xem thêm Chính sách kiểm hàng&nbsp;
          <a
            href="https://jhfigure.com/pages/chinh-sach-kiem-hang"
            className="text-blue-600 hover:underline"
          >
            tại đây
          </a>
        </p>

        <h3 className="text-lg font-semibold mt-4">
          1) Điều kiện đổi trả &amp; phạm vi bảo hành cho hàng mua tại JH Figure
        </h3>
        <p>
          Quý Khách hàng vui lòng kiểm tra tình trạng hàng hóa và có thể yêu cầu{" "}
          <strong>đổi/trả ngay tại thời điểm giao – nhận</strong> trong các
          trường hợp sau:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Hàng <strong>không đúng chủng loại, mẫu mã</strong> như đã đặt hoặc
            như hiển thị trên website tại thời điểm đặt hàng.
          </li>
          <li>
            Hàng <strong>không đủ số lượng, không đủ bộ</strong> theo đơn hàng.
          </li>
          <li>
            <strong>Tình trạng bên ngoài</strong> bị ảnh hưởng (rách bao bì,
            bong tróc, bể vỡ…) mà <strong>không được thông báo trước</strong>.
          </li>
          <li>
            Hàng <strong>bị lỗi từ nhà sản xuất</strong> (chi tiết xem mục 2).
          </li>
        </ul>
        <p>
          Để hoàn thành thủ tục đổi trả &amp; bảo hành, khách hàng cần cung cấp{" "}
          <strong>video khui kiện</strong> và <strong>hình ảnh</strong> liên
          quan làm bằng chứng.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          2) Chính sách bảo hành theo nguồn hàng &amp; loại hàng
        </h3>
        <p>
          <em>
            * Với hàng lỗi do nhà sản xuất, tùy chính sách từng hãng và nguồn
            hàng sẽ áp dụng như sau:
          </em>
        </p>

        <div className="overflow-x-auto">
          <table className="border border-gray-400 w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Nguồn hàng</th>
                <th className="border p-2">Loại hàng</th>
                <th className="border p-2">Chính sách bảo hành lỗi NSX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 align-top">Trung</td>
                <td className="border p-2 align-top">Tất cả mô hình PVC</td>
                <td className="border p-2">
                  – <strong>Đổi trả</strong> nếu hàng gãy vỡ, thiếu phụ kiện
                  <br />– <strong>Miễn bảo hành</strong> các khiếm khuyết của
                  sản phẩm
                  <br />– <strong>Miễn bảo hành</strong> tình trạng box. Khách
                  mua nguồn Trung cần hiểu trước các sự cố có thể khiến box bị
                  móp/rách
                </td>
              </tr>
              <tr>
                <td className="border p-2 align-top" rowSpan={2}>
                  Nhật / Mỹ / Hàng từ nhà phân phối chính hãng tại VN
                </td>
                <td className="border p-2 align-top">Mô hình Gameprize</td>
                <td className="border p-2">
                  – <strong>Đổi trả</strong> nếu hàng gãy vỡ, thiếu phụ kiện
                  <br />– <strong>Đổi trả</strong> nếu lỗi khớp gắn các bộ phận,
                  phụ kiện
                  <br />– <strong>Miễn bảo hành</strong> các khiếm khuyết của
                  sản phẩm (sơn lem, nhựa thừa, dơ ố...)
                </td>
              </tr>
              <tr>
                <td className="border p-2 align-top">
                  Nendoroid / Scale / Các sản phẩm PVC khác
                </td>
                <td className="border p-2">
                  – <strong>Bảo hành</strong> nếu hàng gãy vỡ, thiếu phụ kiện
                  <br />– Áp dụng{" "}
                  <strong>đúng chính sách bảo hành của nhà sản xuất</strong>.
                  Quyết định của nhà sản xuất là <strong>cuối cùng</strong>.
                  <br />
                  <br />– <strong>Quy trình bảo hành:</strong>
                  <br />❶ <strong>Xác nhận tình trạng sản phẩm:</strong> Khách
                  gửi hàng về kho để kiểm tra hoặc cung cấp{" "}
                  <strong>hình ảnh/video</strong> theo hướng dẫn
                  <br />❷ <strong>Gửi yêu cầu bảo hành cho hãng:</strong> JH
                  Figure gửi yêu cầu kèm mô tả tình trạng &amp; hóa đơn mua hàng
                  <br />❸ <strong>Đợi hãng xác nhận lỗi:</strong> JH Figure cập
                  nhật tiến độ thường xuyên. Nếu hãng xác nhận không phải lỗi,
                  hoặc lỗi thuộc giới hạn sản xuất chấp nhận được, yêu cầu bảo
                  hành sẽ bị hủy
                  <br />➍ <strong>Vận chuyển hàng bảo hành:</strong> Nếu hãng
                  xác nhận lỗi, JH Figure{" "}
                  <strong>chịu mọi chi phí vận chuyển</strong> đến tay khách
                  hàng.
                  <br />
                  Trường hợp hãng yêu cầu{" "}
                  <strong>gửi trả lại hàng cho hãng</strong>,{" "}
                  <strong>khách hàng tự chịu chi phí</strong>.
                </td>
              </tr>
              <tr>
                <td className="border p-2 align-top">Tất cả</td>
                <td className="border p-2 align-top">Mô hình Resin</td>
                <td className="border p-2">
                  – <strong>Sửa chữa</strong> nếu hàng gãy vỡ, thiếu phụ kiện
                  (thời gian xử lý phụ thuộc đối tác sửa chữa)
                  <br />– <strong>Miễn bảo hành</strong> tình trạng box
                  <br />– <strong>Không đảm bảo</strong> hàng newseal; hàng sẽ
                  được <strong>unbox kiểm tra</strong> trước khi giao
                </td>
              </tr>
              <tr>
                <td className="border p-2 align-top">Các nguồn hàng khác</td>
                <td className="border p-2 align-top">
                  – Hàng gom (khách gửi link mua hộ)
                  <br />– Hàng không newseal (likenew, 2nd)
                </td>
                <td className="border p-2">
                  – <strong>Refund toàn bộ cọc</strong> nếu quá 30 ngày hàng
                  chưa về
                  <br />– <strong>Không bảo hành</strong> tình trạng hàng hóa
                </td>
              </tr>
              <tr>
                <td className="border p-2 align-top">Các nguồn hàng khác</td>
                <td className="border p-2 align-top">Các sản phẩm khác</td>
                <td className="border p-2">
                  Vui lòng liên hệ JH Figure để được tư vấn rõ hơn
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-4">
          3) Thời gian thông báo &amp; gửi sản phẩm đổi trả
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Thời gian thông báo đổi trả:</strong> trong vòng{" "}
            <strong>48 giờ</strong> kể từ khi nhận sản phẩm (căn cứ theo{" "}
            <strong>giờ hệ thống của đơn vị giao hàng</strong>). Sau 48 giờ, mọi
            phát sinh sẽ <strong>không được giải quyết</strong>.
          </li>
          <li>
            <strong>Thời gian gửi chuyển trả sản phẩm:</strong> trong vòng{" "}
            <strong>3 ngày</strong> kể từ khi nhận sản phẩm.
          </li>
          <li>
            <strong>Địa điểm đổi trả:</strong> mang trực tiếp đến cửa hàng/văn
            phòng hoặc gửi chuyển phát <strong>có tracking</strong> về địa chỉ
            sau:
          </li>
        </ul>

        <table className="border border-gray-400 w-full text-sm">
          <tbody>
            <tr>
              <td className="p-3">
                Người nhận: <strong>JH FIGURE (BẢO HÀNH)</strong>
                <br />
                SĐT: <strong>0396686826</strong>
                <br />
                Địa chỉ: <strong>32 Đồng Xoài, Phường Tân Bình, TP. HCM</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mt-4">
          4) Chi phí vận chuyển khi trả hàng
        </h3>
        <p>
          Quý khách vui lòng liên hệ JH Figure để{" "}
          <strong>thống nhất hình thức</strong> và{" "}
          <strong>trách nhiệm thanh toán</strong> chi phí cho đơn hàng hoàn trả.
          Trường hợp <strong>thiếu hàng, nhầm hàng</strong>, JH Figure{" "}
          <strong>hỗ trợ toàn bộ chi phí vận chuyển</strong>.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          5) Quy định đóng gói khi chuyển trả
        </h3>
        <p>
          Vui lòng liên hệ và thực hiện theo hướng dẫn của JH Figure; đảm bảo{" "}
          <strong>đóng gói kỹ</strong> như khi nhận hàng.
        </p>
        <p>
          Nếu Quý khách có <strong>đóng góp/khiếu nại</strong> liên quan đến
          chất lượng sản phẩm, vui lòng liên hệ{" "}
          <strong>đường dây chăm sóc khách hàng</strong> của chúng tôi.
        </p>

        <h3 className="text-lg font-semibold mt-4">
          6) Quy định về trách nhiệm đền bù
        </h3>
        <p>
          Khi phát sinh sự cố (ví dụ: <em>không có hàng để giao</em>,{" "}
          <em>hàng không thể thông quan</em>,{" "}
          <em>đơn hàng bị hủy do cửa hàng Nhật/Trung</em> hoặc{" "}
          <em>nhà cung cấp Việt Nam</em>, <em>hàng hư hỏng do vận chuyển</em>),
          JH Figure sẽ <strong>hoàn cọc</strong> và{" "}
          <strong>đền bù thêm 10% giá trị cọc</strong>.
        </p>
      </div>
    </div>
  );
}
