# 📋 KẾ HOẠCH TRIỂN KHAI BLOG (Deploy Vercel)

> Blog cá nhân, layout trang chủ theo ảnh mẫu (3 cột), phối màu theo palette,
> nội dung lưu trên MongoDB, có Admin Panel + Authentication để quản lý bài viết.
> Deploy lên Vercel.

---

## 1. Công nghệ (Tech Stack)

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Deploy Vercel 1-click, có sẵn backend (Route Handlers / Server Actions), SSR tốt cho SEO |
| Ngôn ngữ | **TypeScript** | An toàn kiểu, dễ bảo trì |
| CSS | **Tailwind CSS** | Responsive nhanh, áp palette qua config |
| Database | **MongoDB Atlas** (free tier) | Cloud, hợp với Vercel serverless |
| ODM | **Mongoose** | Định nghĩa schema rõ ràng |
| Auth | **NextAuth.js v5 (Auth.js)** + Credentials + bcryptjs | Đăng nhập admin, session JWT |
| Deploy | **Vercel** | Free, CI/CD tự động từ GitHub |
| Ảnh | **next/image** (+ Cloudinary tùy chọn) | Tối ưu ảnh tự động |

> **Chỉ dùng Tailwind** (không dùng chung với Bootstrap).

---

## 2. Bảng màu (Palette Mapping)

Định nghĩa trong `tailwind.config.ts`:

```
Cream   #EFECE3  → nền chính, section sáng            (bg-cream)
Sky     #8FABD4  → nền phụ, hover, accent nhạt        (bg-sky)
Blue    #4A70A9  → màu nhấn chính (THAY màu hồng):    (bg-primary)
                   khối "01 BLOG", card nổi bật,
                   nút, link active
Black   #000000  → chữ, tiêu đề, footer                (text-ink)
```

**Quy tắc đổi màu so với ảnh mẫu:** mọi vùng **hồng (coral/pink)** → **#4A70A9 (Blue)**; nền **trắng** → **#EFECE3 (Cream)**.

Gợi ý font: `Playfair Display` cho tiêu đề lớn, `Inter` cho body.

---

## 3. Layout Trang chủ (theo ảnh mẫu)

Lưới **3 cột** trên desktop (`grid-cols-3`), xếp chồng dọc trên mobile.

```
┌───────── NAVBAR: About | Blog(active) | Forum | Contact ─────────┐
├──────────────┬────────────────────────┬────────────────────────┤
│  CỘT TRÁI    │      CỘT GIỮA           │      CỘT PHẢI          │
│ (Hero image  │  ┌──────────────────┐   │  ┌──────────────────┐  │
│  sản phẩm/   │  │ "01 ──────"      │   │  │ Ảnh category lớn │  │
│  ảnh nền)    │  │ "BLOG" (chữ to)  │   │  └──────────────────┘  │
│              │  │ nền xanh #4A70A9 │   │  "COSMETICS" (label)   │
│              │  └──────────────────┘   │  ┌──────────────────┐  │
│  ┌────────┐  │  ┌─[About Author]──┐    │  │ Card bài nổi bật │  │
│  │ nút →  │  │  │ tab dọc + welcome│   │  │ nền xanh #4A70A9 │  │
│  └────────┘  │  │ card "Hey I'm..."│   │  │ tiêu đề + mô tả  │  │
│              │  └──────────────────┘   │  │ READ MORE...     │  │
│              │  ┌─ PERFUMES card ─┐    │  └──────────────────┘  │
│              │  │ ảnh + label      │   │                        │
└──────────────┴────────────────────────┴────────────────────────┘
```

**Các khối cần dựng:**
1. `<Navbar>` — menu ngang; link "Blog" có gạch chân active.
2. `<HeroImage>` (cột trái) — ảnh lớn full-height + nút mũi tên tròn ở góc.
3. `<BlogTitleBlock>` — số "01" + đường kẻ ngang + chữ "BLOG" cỡ lớn, nền `bg-primary`.
4. `<AboutAuthorCard>` — tab dọc "About Author" (`writing-mode: vertical-rl`) + card giới thiệu có avatar + "READ MORE".
5. `<FeaturedPostCard>` (cột giữa dưới) — ảnh + nhãn danh mục (VD "PERFUMES & SCENTS").
6. `<CategoryFeature>` (cột phải) — ảnh + label "COSMETICS" + card mô tả nền xanh + "READ MORE".
7. `<Footer>` — nền `text-ink` (đen).

**Responsive breakpoints:**
- `lg` (≥1024px): 3 cột như ảnh.
- `md` (768–1023px): 2 cột (gộp cột phải xuống dưới).
- `sm` (<768px): 1 cột, xếp dọc; navbar thu thành hamburger menu.

---

## 4. Các trang (Routes)

### Public
| Route | Mô tả |
|---|---|
| `/` | Trang chủ (layout mục 3) |
| `/blog` | Danh sách tất cả bài viết (grid card + phân trang) |
| `/blog/[slug]` | Chi tiết bài viết (render nội dung + SEO metadata) |
| `/about` | Giới thiệu tác giả |
| `/forum` | Placeholder / list thảo luận (MVP để tĩnh) |
| `/contact` | Form liên hệ |

### Auth & Admin
| Route | Bảo vệ | Mô tả |
|---|---|---|
| `/login` | Public | Form đăng nhập (email + password) |
| `/admin` | 🔒 Auth | Dashboard: danh sách bài + Tạo/Sửa/Xóa |
| `/admin/new` | 🔒 Auth | Form tạo bài mới |
| `/admin/edit/[slug]` | 🔒 Auth | Form chỉnh sửa bài |
| `/api/auth/[...nextauth]` | — | Endpoint NextAuth (tự động) |

---

## 5. Cấu trúc thư mục

```
blog/
├── auth.ts                     # cấu hình NextAuth (providers, callbacks)
├── middleware.ts               # chặn /admin/* nếu chưa auth
├── app/
│   ├── layout.tsx              # layout gốc + font + Navbar/Footer
│   ├── page.tsx                # TRANG CHỦ
│   ├── globals.css             # Tailwind directives
│   ├── blog/
│   │   ├── page.tsx            # danh sách bài
│   │   └── [slug]/page.tsx     # chi tiết bài
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── forum/page.tsx
│   ├── login/page.tsx          # form đăng nhập
│   ├── admin/
│   │   ├── layout.tsx          # layout admin (sidebar + logout)
│   │   ├── page.tsx            # dashboard list bài
│   │   ├── new/page.tsx        # tạo bài
│   │   └── edit/[slug]/page.tsx# sửa bài
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/route.ts
│       └── posts/
│           ├── route.ts        # GET tất cả / POST tạo mới
│           └── [slug]/route.ts # GET / PUT / DELETE theo slug
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── home/
│   │   ├── HeroImage.tsx
│   │   ├── BlogTitleBlock.tsx
│   │   ├── AboutAuthorCard.tsx
│   │   ├── FeaturedPostCard.tsx
│   │   └── CategoryFeature.tsx
│   ├── admin/
│   │   ├── PostForm.tsx        # form dùng chung new + edit
│   │   ├── PostTable.tsx       # bảng list bài + nút xóa
│   │   └── LogoutButton.tsx
│   └── ui/                     # Button, Card, Badge dùng lại
├── lib/
│   └── mongodb.ts              # kết nối MongoDB (cache connection)
├── models/
│   ├── Post.ts                 # Mongoose schema bài viết
│   └── User.ts                 # Mongoose schema tài khoản admin
├── scripts/
│   └── seed-admin.ts           # tạo tài khoản admin ban đầu
├── public/                     # ảnh tĩnh
├── tailwind.config.ts
├── .env.local                  # biến môi trường (KHÔNG commit)
└── package.json
```

---

## 6. Data Models (MongoDB)

### `models/Post.ts`
```ts
Post {
  title:      String, required
  slug:       String, required, unique   // dùng cho URL /blog/[slug]
  excerpt:    String                      // mô tả ngắn hiển thị ở card
  content:    String, required            // nội dung đầy đủ (Markdown/HTML)
  coverImage: String                      // URL ảnh bìa
  category:   String                      // VD "Cosmetics", "Perfumes"
  author:     String, default "Jess"
  featured:   Boolean, default false      // để chọn bài lên trang chủ
  tags:       [String]
  createdAt:  Date, default now
  updatedAt:  Date
}
```

### `models/User.ts`
```ts
User {
  email:     String, required, unique
  password:  String, required            // đã hash bằng bcrypt
  name:      String, default "Jess"
  role:      String, default "admin"     // để mở rộng phân quyền sau
  createdAt: Date, default now
}
```

> Tạo tài khoản admin bằng **seed script** (không có UI đăng ký công khai).

---

## 7. Backend / API

Dùng **Next.js Route Handlers** (`app/api/...`):

| Method | Endpoint | Bảo vệ | Chức năng |
|---|---|---|---|
| GET | `/api/posts` | Public | Danh sách (hỗ trợ `?category=`, `?featured=true`, phân trang) |
| GET | `/api/posts/[slug]` | Public | Lấy 1 bài theo slug |
| POST | `/api/posts` | 🔒 Auth | Tạo bài |
| PUT | `/api/posts/[slug]` | 🔒 Auth | Sửa bài |
| DELETE | `/api/posts/[slug]` | 🔒 Auth | Xóa bài |

- Kết nối MongoDB qua `lib/mongodb.ts` — **cache connection** để tránh tạo mới mỗi request trên serverless.
- Trang chủ và `/blog` nên **fetch trực tiếp trong Server Component** (gọi hàm DB thay vì fetch API) để nhanh + SEO tốt.
- Các API ghi dữ liệu (`POST/PUT/DELETE`) phải **kiểm tra session** ở đầu handler → chưa auth trả `401`.

---

## 8. Authentication (NextAuth)

**Chiến lược:** Credentials Provider (email + password), session JWT, blog 1 tác giả.

**Luồng hoạt động:**
```
1. Admin vào /admin ──► middleware kiểm tra session
      │
      ├─ Chưa đăng nhập ──► redirect /login
      │                        │
      │                   Nhập email+pass ──► NextAuth Credentials
      │                        │              ├─ tìm User theo email
      │                        │              ├─ bcrypt.compare(password)
      │                        │              └─ đúng → tạo JWT session
      │                        │
      │                   Đăng nhập OK ──► redirect /admin
      │
      └─ Đã đăng nhập ──► Dashboard
                              ├─ PostTable (list + Sửa/Xóa)
                              └─ nút "New Post" → /admin/new
```

- `auth.ts`: cấu hình Credentials Provider → query User → so khớp bcrypt → trả session.
- `app/api/auth/[...nextauth]/route.ts`: export handler NextAuth.
- `middleware.ts`: chặn toàn bộ `/admin/*` khi chưa đăng nhập.
- Không mở route đăng ký công khai; chỉ có **1 tài khoản admin** seed thủ công.

---

## 9. Biến môi trường (`.env.local` + Vercel)

```
MONGODB_URI=...                 # chuỗi kết nối MongoDB Atlas
NEXTAUTH_SECRET=...             # random: openssl rand -base64 32
NEXTAUTH_URL=https://your-domain.vercel.app   # URL production
ADMIN_EMAIL=...                 # dùng cho seed script
ADMIN_PASSWORD=...              # dùng cho seed script (chỉ chạy 1 lần)
```

> Thêm **tất cả** biến này vào **Vercel → Project Settings → Environment Variables**.
> `NEXTAUTH_SECRET` bắt buộc ở production, thiếu sẽ lỗi session.

---

## 10. Các bước triển khai (thứ tự cho model coding)

1. **Khởi tạo:** `npx create-next-app@latest` (TypeScript, Tailwind, App Router).
2. **Cấu hình palette** trong `tailwind.config.ts` (4 màu mục 2) + font (Playfair Display + Inter).
3. **Kết nối DB:** `lib/mongodb.ts` + `models/Post.ts`. Tạo `.env.local` với `MONGODB_URI`.
4. **Layout gốc:** `Navbar` + `Footer` + `app/layout.tsx`.
5. **Trang chủ** theo lưới 3 cột (mục 3) — hardcode dữ liệu mẫu trước, sau đó nối DB.
6. **API routes** cho posts (GET public trước).
7. **Auth:**
   - 7.1 Cài `next-auth@beta` (v5) + `bcryptjs`.
   - 7.2 Tạo `models/User.ts` + `scripts/seed-admin.ts`, chạy seed tạo admin.
   - 7.3 Cấu hình `auth.ts` (Credentials → bcrypt compare → session).
   - 7.4 Tạo `app/api/auth/[...nextauth]/route.ts`.
   - 7.5 Viết `middleware.ts` chặn `/admin/*`.
   - 7.6 Dựng `/login` + `/admin` (dashboard, new, edit) với `PostForm`, `PostTable`.
   - 7.7 Thêm check session vào `POST/PUT/DELETE /api/posts`.
8. **Trang `/blog` và `/blog/[slug]`** — fetch từ DB.
9. **Trang phụ:** about, contact, forum.
10. **Responsive check** ở 3 breakpoint.
11. **Seed data:** script tạo vài bài mẫu để có nội dung hiển thị.
12. **Deploy Vercel:** push GitHub → import Vercel → thêm env → deploy.

---

## 11. Checklist trước khi deploy

**Cấu hình & Deploy**
- [ ] `.env.local` có trong `.gitignore` (không lộ secret)
- [ ] MongoDB Atlas: whitelist IP `0.0.0.0/0` (cho Vercel serverless)
- [ ] `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` đã thêm trong Vercel
- [ ] `next/image`: khai báo `remotePatterns` cho domain ảnh ngoài
- [ ] Responsive OK trên mobile
- [ ] SEO metadata (`generateMetadata`) cho trang chi tiết bài

**Bảo mật**
- [ ] Mật khẩu **luôn** hash bằng bcrypt — không lưu plain text
- [ ] Không có route đăng ký công khai (`/register`)
- [ ] Mọi API ghi dữ liệu đều check session (không chỉ ẩn UI)
- [ ] `middleware.ts` bảo vệ toàn bộ `/admin/*`
- [ ] Sau seed admin, xóa `ADMIN_PASSWORD` khỏi env production (hoặc đổi mật khẩu)
- [ ] Đăng nhập sai trả thông báo chung chung (không tiết lộ email tồn tại hay không)
