# 🚀 ASP.NET Core 8 + Next.js Project (Dockerized)

## 📖 Giới thiệu

Dự án này bao gồm:

- **Backend:** ASP.NET Core 8 (RESTful API, Entity Framework Core, Authentication, kiến trúc 3 tầng)
- **Frontend:** Next.js 14 (React 18, App Router, TailwindCSS)
- **Database:** SQL Server

## 🚀 Bắt đầu tham gia dự án

### 1️⃣ Cài đặt Docker & Docker Compose

- Tải và cài **Docker Desktop**:  
  👉 [Download Docker](https://www.docker.com/products/docker-desktop)
- Sau khi cài đặt, kiểm tra bằng lệnh:

```bash
docker --version
docker compose version

git clone https://github.com/hina-kasumi/Figure-Shop
cd Figure-Shop
```

## Mới bắt đầu hãy chạy Docker Compose

```bash
docker compose up --build
```

---

## 📑 Swagger API Docs

### 🔹 Swagger là gì?
- **Swagger** (OpenAPI) là công cụ tự động sinh tài liệu API từ code backend.  
- Hỗ trợ developer/tester **xem danh sách API** và **test trực tiếp** trên giao diện web mà không cần cài thêm công cụ.  
- Đặc biệt hữu ích khi nhiều người cùng làm việc giữa backend và frontend.  

### 🔹 Cách sử dụng trong dự án này
Sau khi chạy backend (qua **Docker Compose** hoặc chạy thủ công trong Visual Studio / `dotnet run`), mở trình duyệt và truy cập:  

- `http://localhost:<backend-port>/swagger`  

### 🔹 Ví dụ tính năng của Swagger
- Hiển thị toàn bộ **endpoint REST API** (GET/POST/PUT/DELETE).  
- Cho phép **thử nghiệm request** trực tiếp trên giao diện.  
- Tự động cập nhật tài liệu API khi backend thay đổi.  

---

## 📬 Postman
Ngoài Swagger, có thể dùng **Postman**

**Postman** là một công cụ phổ biến để **test và quản lý API**.  
Nó cho phép bạn gửi request (GET, POST, PUT, DELETE...) đến server, kiểm tra response, và lưu lại các collection API để dùng sau.  
Postman mạnh hơn Swagger vì có thể:
- Lưu trữ và chia sẻ collection API.
- Tạo môi trường (dev, staging, production).
- Viết script để tự động hóa test API.

Có thể dùng **Postman** để test API theo các cách sau:
- Cài Postman trên **VSCode** bằng cách tải extension (nhẹ, nhưng không đầy đủ tính năng).  
- Hoặc tải **Postman Desktop App** để sử dụng đầy đủ tính năng:  
  👉 [Download Postman](https://www.postman.com/downloads/)  

---

## 🏗️ Yêu cầu kiến trúc 3 Layer

Dự án backend ASP.NET Core cần tuân thủ kiến trúc **3 Layer** nhằm đảm bảo **dễ bảo trì, mở rộng và tái sử dụng code**:

### 🔹 Cấu trúc thư mục

- **FigureShop.API** → Tầng **Presentation** (Web API)
  - Chỉ chứa Controllers và cấu hình middleware, dependency injection.
- **FigureShop.Application** → Tầng **Business Logic**
  - Chứa Services, DTOs, Interfaces.
  - Thực hiện các xử lý logic nghiệp vụ.
- **FigureShop.Infrastructure** → Tầng **Data Access**
  - Chứa DbContext (Entity Framework Core), Repository, Migration.
  - Làm việc trực tiếp với **SQL Server**.

### 🔹 Nguyên tắc

- **Controller** chỉ gọi **Service** từ Application Layer, không truy cập trực tiếp Database.
- **Service** gọi đến **Repository** trong Infrastructure.
- **Repository** thao tác với **Entity Framework Core** và Database.
- Tách biệt rõ ràng: Presentation ↔ Application ↔ Infrastructure.

### 🔹 Cấu trúc thư mục (3 Layer Architecture)

```text
FigureShop/
│── Controllers/
│
│── Services/
│
│── Repositories/
│
│── Entities/
│
│── Repository/
│
│── Utils/

```
