# Taskflow

Taskflow là một ứng dụng quản lý công việc (To-Do List) được xây dựng bằng [Next.js](https://nextjs.org/).

**Demo trực tuyến:** [https://taskflow-hgphu.vercel.app/](https://taskflow-hgphu.vercel.app/)

## Hướng dẫn cài đặt và chạy dự án

Bạn có thể chạy dự án này bằng **Docker** (khuyên dùng cho môi trường production hoặc để chạy nhanh mà không cần cài đặt Node.js) hoặc chạy bằng **npm** (phù hợp cho môi trường phát triển).

### Cách 1: Chạy bằng Docker (Khuyên dùng)

Yêu cầu: Máy tính của bạn cần cài đặt sẵn [Docker Desktop](https://www.docker.com/products/docker-desktop/) (hoặc Docker Engine & Docker Compose).

1. Mở terminal tại thư mục gốc của dự án.
2. Build và khởi chạy các container ở chế độ chạy ngầm (detached mode):
   ```bash
   docker compose up -d --build
   ```
3. Chờ một chút để Docker build image. Sau khi hoàn tất, mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

**Các lệnh Docker hữu ích khác:**
- Xem log của ứng dụng: `docker compose logs -f`
- Dừng ứng dụng: `docker compose down`

---

### Cách 2: Chạy môi trường phát triển cục bộ (Local Development)

Yêu cầu: Máy tính cần cài đặt [Node.js](https://nodejs.org/) (phiên bản 18 trở lên).

1. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
2. Khởi chạy development server:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

*(Trong môi trường dev, mỗi khi bạn chỉnh sửa code, trang web sẽ tự động cập nhật).*

---

### Chạy Unit Tests

Dự án có sử dụng Jest và React Testing Library để viết unit test. Để chạy test:

```bash
npm run test
```

## Công nghệ sử dụng
- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) (Testing)
- [Docker](https://www.docker.com/) (Containerization)

## Cấu trúc dự án

```text
taskflow/
├── public/                 # Các tài nguyên tĩnh (hình ảnh, favicon...)
├── src/
│   ├── app/                # Chứa các trang và layout chính của Next.js (App Router)
│   ├── components/         # Các React components dùng chung
│   │   ├── layout/         # Component liên quan đến bố cục (Header, Footer...)
│   │   └── todo/           # Component chức năng của To-Do list
│   │       └── __tests__/  # File chứa Unit Test cho Todo components
│   ├── hooks/              # Các custom React hooks
│   ├── lib/                # Các tiện ích, cấu hình hoặc thư viện bên thứ 3
│   └── types/              # Các định nghĩa TypeScript type/interface
├── Dockerfile              # Script build image Docker
├── docker-compose.yml      # Cấu hình chạy các container Docker
├── next.config.ts          # File cấu hình Next.js
├── package.json            # Khai báo các thư viện phụ thuộc và scripts
└── README.md               # File tài liệu hướng dẫn
```

## Technical Decisions (Quyết định kỹ thuật)

- **Next.js**: Sử dụng để tận dụng kiến trúc hiện đại (App Router) và tối ưu hóa hiệu suất (SSR/SSG).
- **Tailwind CSS v4**: Giúp styling giao diện nhanh chóng, trực quan ngay trong component mà không cần file CSS rời.
- **@dnd-kit**: Lựa chọn thư viện kéo thả (drag and drop) hiện đại, dung lượng nhẹ và khả năng tùy biến cao, giúp người dùng dễ dàng sắp xếp thứ tự công việc.
- **Docker Multi-stage Build**: Giúp tối ưu hóa và giảm thiểu tối đa dung lượng image deploy lên production nhờ kết hợp với cấu hình `output: "standalone"` của Next.js.
- **Jest & React Testing Library**: Bộ công cụ tiêu chuẩn để viết Unit Test, đảm bảo độ ổn định cho các logic và giao diện UI của components.
