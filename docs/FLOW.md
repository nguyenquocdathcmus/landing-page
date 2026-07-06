# Landing Page — Flow chi tiết

> Flow tổng thể cả hệ thống: xem `docs/FLOW_OVERVIEW.md` ở workspace cha.
> Stack: Next.js 16 (App Router) + next-intl (13 ngôn ngữ, prefix luôn hiện) +
> Tailwind v4 + Paddle.js. Deploy: Vercel, auto-deploy khi push `main`.

## 1. Flow request (routing + i18n)

```
Request bất kỳ (ví dụ /)
  → src/proxy.ts (middleware next-intl)
      - match mọi path trừ /api, /_next, /_vercel, file tĩnh
      - không có prefix locale → redirect theo Accept-Language (/ → /en, GIỮ query string)
  → app/[locale]/layout.tsx
      - hasLocale() kiểm tra locale hợp lệ, không thì notFound()
      - setRequestLocale() để mọi server component render tĩnh được (SSG 13 locale)
      - dir="rtl" cho tiếng Ả Rập (RTL_LOCALES)
      - dựng khung: <PaddleCheckout/> + <Header/> + <main>{page}</main> + <Footer/>
  → page tương ứng (tất cả là server component, dịch qua getTranslations)
```

Cấu hình i18n nằm ở `src/i18n/`:

| File | Vai trò |
|---|---|
| `locales.ts` | danh sách 13 locale, label, RTL set |
| `routing.ts` | defineRouting, `localePrefix: "always"` (mọi URL đều có /en, /vi…) |
| `navigation.ts` | Link/useRouter/usePathname bọc locale — **luôn dùng thay next/link** |
| `request.ts` | nạp messages/<locale>.json cho server components |
| `messages/*.json` | chuỗi dịch theo namespace: meta, nav, footer, home, pricing, download, help, checkout |

## 2. Flow thanh toán trên web (mắt xích giữa app và Paddle)

Paddle "Default Payment Link" trỏ về site này, nên checkout URL mà desktop app mở
có dạng `https://<site>/?_ptxn=txn_xxx`.

```
Browser mở /?_ptxn=txn_xxx
  → proxy.ts redirect → /en?_ptxn=txn_xxx (query được giữ nguyên)
  → layout mount <PaddleCheckout/> (client component, render null):
      initializePaddle({ environment: NEXT_PUBLIC_PADDLE_ENV,
                         token: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, eventCallback })
      Paddle.js TỰ phát hiện _ptxn → mở overlay checkout trên trang
      (không cần gọi Checkout.open() thủ công)
  → người dùng thanh toán trong overlay
  → eventCallback nhận checkout.completed
      → đợi 1.5s (cho màn hình "payment received" của Paddle hiện)
      → router.push('/checkout/success')   # giữ đúng locale hiện tại
  → trang success nhắc quay lại app (gói Pro xuất hiện sau vài giây)
```

Nếu thiếu `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, PaddleCheckout no-op an toàn (không crash,
chỉ không mở overlay). Cả 2 biến phải set trên Vercel **trước khi build** (NEXT_PUBLIC_*
được nhúng lúc build).

## 3. Flow từng page

| Route | File | Nội dung |
|---|---|---|
| `/[locale]` | `app/[locale]/page.tsx` | Home: hero + social proof + 6 features + 3 testimonials + CTA. CTA → /download, /pricing |
| `/[locale]/pricing` | `pricing/page.tsx` | 2 card Free ($0) / Pro ($9.99 — badge nổi bật) + FAQ. CTA hiện trỏ /download (thanh toán thực hiện trong app) |
| `/[locale]/download` | `download/page.tsx` | Nút tải .dmg (đang disabled — chờ build ký; TODO gắn GitHub Release) + yêu cầu hệ thống |
| `/[locale]/help` | `help/page.tsx` | FAQ 4 nhóm (Getting started / Editing / Exporting / Account), accordion `<details>` |
| `/[locale]/checkout/success` | `checkout/success/page.tsx` | Xác nhận thanh toán thành công, hướng dẫn quay lại app, prerender đủ 13 locale |

Mọi page đều: `generateMetadata` lấy title dịch; `setRequestLocale` để SSG.

## 4. Flow từng component

| Component | Loại | Flow |
|---|---|---|
| `Header.tsx` | server | sticky, logo → `/`, nav (Product/#features, Help, Pricing) + LanguageSwitcher + nút Download |
| `Footer.tsx` | server | 3 cột link (Product/Resources/Company) + tagline + copyright. Lưu ý: `/changelog`, `/legal/*` chưa có page |
| `LanguageSwitcher.tsx` | client | dropdown 13 locale; chọn → `router.replace(pathname, {locale})` — giữ nguyên trang, đổi prefix; đóng khi click ra ngoài |
| `PaddleCheckout.tsx` | client | mount 1 lần ở layout; init Paddle.js; xử lý `_ptxn` + `checkout.completed` (xem mục 2). Guard `initialized` ref chống init đôi |

## 5. Deploy & env

- Push `main` → Vercel tự build + deploy production; branch khác/PR → preview URL.
- Env vars (đã set đủ Production/Preview/Development):
  - `NEXT_PUBLIC_PADDLE_ENV` = `sandbox` (đổi `production` khi go-live)
  - `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` = client-side token của Paddle (public-safe)
- Đổi env → phải **redeploy** mới có hiệu lực (giá trị nhúng lúc build).
- Go-live production Paddle: nhớ duyệt domain (Website approval) — sandbox không cần.
