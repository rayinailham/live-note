# Penjelasan File Utama di Next.js App Router

Dokumen ini menjelaskan fungsi dan peran file utama di folder `src/app/` dalam aplikasi Next.js menggunakan App Router: `layout.tsx` dan `page.tsx`.

## 1. `layout.tsx`

### Fungsi Utama
`layout.tsx` adalah komponen root layout dari aplikasi Next.js App Router. Semua halaman dan layout turunan akan dirender di dalam komponen ini secara otomatis.

### Kegunaan
- **Global Styles**: Menambahkan CSS global, seperti Tailwind CSS atau stylesheet kustom.
- **State Management**: Mengelola state global menggunakan Context API, Redux, Zustand, atau library serupa.
- **Layout Konsisten**: Menambahkan elemen yang muncul di setiap halaman, seperti header, footer, atau navigation bar.
- **Error Handling**: Menggunakan error boundaries untuk menangani error di seluruh aplikasi.
- **Analytics & Tracking**: Menjalankan kode analytics (misalnya Google Analytics) di setiap halaman.
- **HTML Structure**: Mengontrol struktur HTML dokumen, termasuk elemen `<html>`, `<head>`, dan `<body>`.
- **Metadata**: Mengatur metadata global seperti title, description, dan meta tags untuk SEO.

### Catatan
- Layout bersifat nested - setiap folder dapat memiliki layout.tsx sendiri.
- Kode di sini berjalan di client-side dan server-side (untuk SSR).
- Metadata dapat dioverride oleh layout atau page di level yang lebih dalam.

## 2. `page.tsx`

### Fungsi Utama
`page.tsx` adalah komponen halaman dari route tertentu dalam App Router. File ini menentukan konten yang akan ditampilkan untuk route tersebut.

### Kegunaan
- **Konten Halaman**: Menampilkan konten spesifik untuk route tersebut.
- **Routing**: Dalam App Router, setiap `page.tsx` otomatis menjadi route berdasarkan lokasi foldernya.
- **UI & Interaksi**: Berisi JSX untuk UI, event handlers, dan logika halaman spesifik.
- **Metadata**: Dapat mengatur metadata spesifik untuk halaman tersebut menggunakan export `metadata`.
- **Data Fetching**: Menggunakan Server Components untuk fetching data di server-side.

### Catatan
- `page.tsx` harus ditempatkan di dalam folder route (misalnya `app/blog/page.tsx` untuk route `/blog`).
- Bisa menggunakan hooks seperti `useState` atau `useEffect` untuk interaktivitas.
- Mendukung Server Components dan Client Components.

## 3. Struktur Folder App Router

```
src/app/
├── layout.tsx          # Root layout (global)
├── page.tsx           # Home page (/)
├── loading.tsx        # Loading UI (opsional)
├── error.tsx          # Error UI (opsional)
├── not-found.tsx      # 404 page (opsional)
└── [folder]/
    ├── layout.tsx     # Nested layout
    ├── page.tsx       # Route page
    └── [dynamic]/
        └── page.tsx   # Dynamic route
```

## Kesimpulan
- **`layout.tsx`**: Untuk konfigurasi global aplikasi, layout, dan struktur HTML.
- **`page.tsx`**: Untuk konten halaman spesifik dan logika route.

File-file ini membentuk fondasi aplikasi Next.js dengan App Router. Untuk pengembangan lebih lanjut, edit `layout.tsx` untuk layout global dan metadata, serta `page.tsx` untuk konten halaman spesifik.