# README.md - Tài liệu Schema Cơ sở dữ liệu

## Tổng quan

Tài liệu này mô tả **schema cơ sở dữ liệu** cho hệ thống **Cửa hàng Figure E-commerce**. Schema bao gồm các bảng quản lý
người dùng, danh mục sản phẩm, giỏ hàng, đơn hàng, voucher và bình luận.

---

## 1. Bảng User

**Mô tả**: Lưu thông tin tài khoản người dùng bao gồm xác thực và nhật ký kiểm toán.

| Cột         | Kiểu Dữ liệu  | Ràng buộc  | Mô tả                        | Tham chiếu |
|-------------|---------------|------------|------------------------------|------------|
| `id`        | `uuid`        | `pk`       | ID người dùng duy nhất       |            |
| `email`     | `varchar(50)` | `not null` | Địa chỉ email                |            |
| `password`  | `varchar(50)` | `not null` | Mật khẩu đã mã hóa           |            |
| `status`    | `enum`        |            | Trạng thái (active/inactive) |            |
| `createdAt` | `timestamp`   |            | Thời gian tạo                |            |
| `createdBy` | `uuid`        |            | ID người tạo                 |            |
| `updatedAt` | `timestamp`   |            | Thời gian cập nhật cuối      |            |
| `updatedBy` | `uuid`        |            | ID người cập nhật cuối       |            |

---

## 2. Bảng Role

**Mô tả**: Định nghĩa vai trò hệ thống (admin, khách hàng).

| Cột    | Kiểu Dữ liệu  | Ràng buộc | Mô tả                         | Tham chiếu |
|--------|---------------|-----------|-------------------------------|------------|
| `name` | `varchar(50)` | `pk`      | Tên vai trò (admin, customer) |            |

---

## 3. Bảng UserRole

**Mô tả**: Bảng trung gian ánh xạ người dùng với vai trò (nhiều-nhiều).

| Cột        | Kiểu Dữ liệu  | Ràng buộc | Mô tả         | Tham chiếu    |
|------------|---------------|-----------|---------------|---------------|
| `userID`   | `uuid`        | `ref`     | ID người dùng | `> User.id`   |
| `RoleName` | `varchar(50)` | `ref`     | Tên vai trò   | `> Role.name` |

---

## 4. Bảng Figure

**Mô tả**: Bảng sản phẩm chính cho figure/đồ chơi với giá, tồn kho và thông tin khuyến mãi.

| Cột           | Kiểu Dữ liệu   | Ràng buộc    | Mô tả                    | Tham chiếu      |
|---------------|----------------|--------------|--------------------------|-----------------|
| `id`          | `uuid`         | `pk`         | ID figure duy nhất       |                 |
| `name`        | `varchar(255)` | `not null`   | Tên sản phẩm             |                 |
| `branchID`    | `uuid`         | `ref`        | **Nhà sản xuất**         | `> Branch.id`   |
| `categoryID`  | `uuid`         | `ref`        | Danh mục                 | `> Category.id` |
| `price`       | `double`       | `not null`   | Giá gốc                  |                 |
| `vote`        | `double`       | `default: 0` | Điểm đánh giá trung bình |                 |
| `imgSrc`      | `varchar[]`    |              | Mảng URL ảnh             |                 |
| `salePercent` | `double`       |              | Phần trăm giảm giá       |                 |
| `quantity`    | `int`          | `not null`   | Số lượng tồn kho         |                 |
| `saleFrom`    | `timestamp`    |              | Ngày bắt đầu khuyến mãi  |                 |
| `saleTo`      | `timestamp`    |              | Ngày kết thúc khuyến mãi |                 |
| `description` | `text`         |              | Mô tả sản phẩm           |                 |
| `createdAt`   | `timestamp`    |              | Thời gian tạo            |                 |
| `createdBy`   | `uuid`         |              | ID người tạo             |                 |
| `updatedAt`   | `timestamp`    |              | Thời gian cập nhật       |                 |
| `updatedBy`   | `uuid`         |              | ID người cập nhật        |                 |

---

## 5. Bảng Category

**Mô tả**: Danh mục sản phẩm (Anime, Marvel).

| Cột    | Kiểu Dữ liệu  | Ràng buộc          | Mô tả                | Tham chiếu |
|--------|---------------|--------------------|----------------------|------------|
| `id`   | `uuid`        | `pk`               | ID danh mục duy nhất |            |
| `name` | `varchar(50)` | `unique, not null` | Tên danh mục         |            |

---

## 6. Bảng Branch

**Mô tả**: **Nhà sản xuất** figure (Bandai, Good Smile, Kotobukiya...).

| Cột    | Kiểu Dữ liệu   | Ràng buộc          | Mô tả                    | Tham chiếu |
|--------|----------------|--------------------|--------------------------|------------|
| `id`   | `uuid`         | `pk`               | ID nhà sản xuất duy nhất |            |
| `name` | `varchar(255)` | `unique, not null` | Tên nhà sản xuất         |            |

---

## 7. Bảng ShoppingCart

**Mô tả**: Sản phẩm trong giỏ hàng của người dùng.

| Cột        | Kiểu Dữ liệu | Ràng buộc | Mô tả              | Tham chiếu    |
|------------|--------------|-----------|--------------------|---------------|
| `userID`   | `uuid`       | `pk, ref` | ID người dùng      | `> User.id`   |
| `figureID` | `uuid`       | `pk, ref` | ID figure          | `> Figure.id` |
| `quantity` | `int`        |           | Số lượng trong giỏ |               |

---

## 8. Bảng Order

**Mô tả**: Đơn hàng khách với chi tiết trạng thái, giá gốc và giá đã giảm.

| Cột               | Kiểu Dữ liệu | Ràng buộc              | Mô tả                 | Tham chiếu     |
|-------------------|--------------|------------------------|-----------------------|----------------|
| `id`              | `uuid`       | `pk`                   | ID đơn hàng duy nhất  |                |
| `userID`          | `uuid`       | `ref`                  | ID người dùng         | `> User.id`    |
| `voucherID`       | `uuid`       | `ref`                  | Voucher áp dụng       | `> Voucher.id` |
| `status`          | `varchar`    |                        | Trạng thái đơn hàng   |                |
| `price`           | `double`     | `not null, default: 0` | Tổng giá gốc đơn hàng |                |
| `priceDiscounted` | `double`     | `not null, default: 0` | Tổng giá sau giảm     |                |
| `createdAt`       | `timestamp`  |                        | Thời gian tạo         |                |
| `createdBy`       | `uuid`       |                        | ID người tạo          |                |
| `updatedAt`       | `timestamp`  |                        | Thời gian cập nhật    |                |
| `updatedBy`       | `uuid`       |                        | ID người cập nhật     |                |

---

## 9. Bảng OrderFigure

**Mô tả**: Bảng trung gian liên kết đơn hàng với figure (nhiều-nhiều).

| Cột        | Kiểu Dữ liệu | Ràng buộc | Mô tả                | Tham chiếu    |
|------------|--------------|-----------|----------------------|---------------|
| `id`       | `uuid`       | `pk`      | ID chi tiết đơn hàng |               |
| `orderID`  | `uuid`       | `ref`     | ID đơn hàng          | `> Order.id`  |
| `figureID` | `uuid`       | `ref`     | ID figure            | `> Figure.id` |

---

## 10. Bảng Voucher

**Mô tả**: Voucher/giảm giá với điều kiện sử dụng chi tiết.

| Cột                   | Kiểu Dữ liệu | Ràng buộc                  | Mô tả                    | Tham chiếu   |
|-----------------------|--------------|----------------------------|--------------------------|--------------|
| `id`                  | `uuid`       | `pk`                       | ID voucher duy nhất      |              |
| `orderID`             | `uuid`       | `ref`                      | ID đơn hàng liên kết     | `> Order.id` |
| `minPriceCanUse`      | `double`     |                            | Giá tối thiểu để sử dụng |              |
| `maxPriceCanDiscount` | `double`     |                            | Giá tối đa được giảm     |              |
| `figuresAvalable`     | `uuid[]`     |                            | Mảng ID figure áp dụng   |              |
| `description`         | `text`       |                            | Mô tả voucher            |              |
| `quantity`            | `int`        | `not null, default: 0`     | Số lượng có sẵn          |              |
| `isPubliced`          | `bool`       | `not null, default: false` | Công khai sử dụng        |              |
| `salePercent`         | `double`     |                            | Phần trăm giảm           |              |
| `usedFrom`            | `timestamp`  |                            | Ngày bắt đầu sử dụng     |              |
| `usedTo`              | `timestamp`  |                            | Ngày kết thúc sử dụng    |              |
| `createdAt`           | `timestamp`  |                            | Thời gian tạo            |              |
| `createdBy`           | `uuid`       |                            | ID người tạo             |              |
| `updatedAt`           | `timestamp`  |                            | Thời gian cập nhật       |              |
| `updatedBy`           | `uuid`       |                            | ID người cập nhật        |              |

---

## 11. Bảng Comment

**Mô tả**: Đánh giá/bình luận của người dùng về figure.

| Cột         | Kiểu Dữ liệu | Ràng buộc    | Mô tả                        | Tham chiếu    |
|-------------|--------------|--------------|------------------------------|---------------|
| `userID`    | `uuid`       | `pk, ref`    | ID người dùng                | `> User.id`   |
| `figureID`  | `uuid`       | `pk, ref`    | ID figure                    | `> Figure.id` |
| `vote`      | `int`        | `default: 0` | Điểm đánh giá (min 1, max 5) |               |
| `content`   | `text`       | `not null`   | Nội dung bình luận           |               |
| `updatedAt` | `timestamp`  |              | Thời gian cập nhật           |               |
| `createdAt` | `timestamp`  |              | Thời gian tạo                |               |

---

## Tóm tắt Quan hệ

| Quan hệ                   | Mô tả                         | Độ liên kết |
|---------------------------|-------------------------------|-------------|
| `User` ↔ `UserRole`       | Ánh xạ User-Role              | 1:N         |
| `Role` ↔ `UserRole`       | Ánh xạ Role-User              | 1:N         |
| `Figure` → `Branch`       | Figure thuộc **nhà sản xuất** | N:1         |
| `Figure` → `Category`     | Figure thuộc danh mục         | N:1         |
| `ShoppingCart` → `User`   | Giỏ hàng thuộc user           | N:1         |
| `ShoppingCart` → `Figure` | Giỏ chứa figure               | N:1         |
| `Order` → `User`          | Đơn hàng thuộc user           | N:1         |
| `Order` → `Voucher`       | Đơn hàng dùng voucher         | N:1         |
| `OrderFigure` → `Order`   | Chi tiết thuộc đơn hàng       | N:1         |
| `OrderFigure` → `Figure`  | Chi tiết chứa figure          | N:1         |
| `Voucher` → `Order`       | Voucher áp dụng cho đơn       | N:1         |
| `Comment` → `User`        | Bình luận của user            | N:1         |
| `Comment` → `Figure`      | Bình luận về figure           | N:1         |

---

## Trường Kiểm toán

Tất cả bảng chính có cột kiểm toán chuẩn:

- `createdAt`: Thời gian tạo bản ghi
- `createdBy`: Người dùng tạo bản ghi
- `updatedAt`: Thời gian sửa đổi cuối
- `updatedBy`: Người dùng sửa đổi cuối

---

*Tạo ngày: 15 Tháng 10, 2025*