# 🌐 Atlas Platform

> Modern, scalable full-stack web application engineered with **Next.js 15 (App Router)**, **Supabase SSR**, **AWS S3 Presigned Uploads**, **TipTap Rich Text Editor**, and **Tailwind CSS**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-SSR_Auth-emerald?style=flat-square&logo=supabase)](https://supabase.com/)
[![AWS S3](https://img.shields.io/badge/AWS-S3_Presigned_URLs-orange?style=flat-square&logo=amazons3)](https://aws.amazon.com/s3/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## ⚡ Architectural Highlights

1. **Direct-to-Cloud Asset Uploads (AWS S3 Presigned URLs):**
   * Eliminates server payload bottlenecks by generating secure, time-limited presigned URLs on the backend (`@aws-sdk/s3-request-presigner`).
   * The client streams large media files directly to Amazon S3 buckets with strict MIME validation.

2. **Modern Server-Side Authentication (`@supabase/ssr`):**
   * Implements secure, cookie-based session synchronization between Next.js Server Components, Client Components, and Route Handlers.
   * Middleware-level route protection and Row-Level Security (RLS) policies.

3. **Modular Block & Rich Text Editing (TipTap):**
   * Headless, extensible editor with custom styling, color palettes, link previews, and inline image handlers.

4. **Robust Schema Validations & State Architecture:**
   * End-to-end form verification combining **Zod** with **React Hook Form** for zero unhandled client/server validation errors.
   * Predictable global client state driven by **Zustand**.

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** Next.js 15 (App Router, Server Components & Server Actions)
* **Language:** TypeScript
* **UI & Styling:** Tailwind CSS, Radix UI Primitives, Lucide Icons, Framer Motion
* **Database & Auth:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
* **Storage:** AWS S3 SDK (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
* **State Management:** Zustand
* **Form Handling:** React Hook Form + Zod (`@hookform/resolvers`)
* **Rich Text:** TipTap Editor Suite

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/fares360/atlas.git
cd atlas
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_s3_bucket
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👨‍💻 Author
**Fares Haitham**  
* GitHub: [@fares360](https://github.com/fares360)  
* LinkedIn: [fares-haitham](https://linkedin.com/in/fares-haitham)
