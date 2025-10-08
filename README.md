# Livestream Timestamp App (Live Note)

Aplikasi untuk membantu pembuat konten atau penonton livestream dalam mencatat momen penting selama siaran langsung. Dengan fitur timestamp otomatis, pengguna dapat menandai waktu spesifik dari livestream dan menambahkan catatan terkait, sehingga memudahkan untuk mereview atau membuat ringkasan konten nanti.

## Fitur Utama

- **Tombol Start**: Memulai penghitung waktu (timer) dari nol saat diklik.
- **Input Notes**: Kolom teks untuk menulis catatan atau deskripsi momen.
- **Tombol Add Note**: Menambahkan catatan baru dengan timestamp otomatis berdasarkan waktu yang telah berjalan sejak tombol start diklik.
- **List Notes**: Menampilkan semua catatan yang telah ditambahkan dalam urutan kronologis, berjajar ke bawah.
- **Penyimpanan Lokal**: Catatan disimpan secara otomatis di local storage browser untuk persistensi data antar sesi aplikasi.
- **Ekspor Catatan**: Opsi untuk mengekspor daftar catatan sebagai file .txt atau .md untuk penyimpanan eksternal atau berbagi.

## Alur Penggunaan

1. **Persiapan**: Buka aplikasi dan pastikan siaran livestream sedang berjalan di perangkat terpisah atau tab lain.
2. **Memulai Timer**: Klik tombol "Start" untuk memulai penghitung waktu. Timer akan mulai berjalan dari 00:00:00.
3. **Mencatat Momen**: Saat ada momen penting dalam livestream, tulis deskripsi singkat di kolom input notes.
4. **Menambahkan Catatan**: Klik tombol "Add Note" untuk menyimpan catatan tersebut. Catatan akan otomatis disertai dengan timestamp saat ini (misalnya, "00:05:23 - Deskripsi momen").
5. **Melihat Daftar Catatan**: Semua catatan akan muncul dalam daftar yang berjajar ke bawah, memungkinkan pengguna untuk melihat kronologi peristiwa selama livestream.
6. **Mengulangi Proses**: Ulangi langkah 3-4 untuk setiap momen yang ingin dicatat. Timer terus berjalan hingga aplikasi ditutup atau direset.
7. **Menyimpan atau Mengekspor**: Catatan disimpan otomatis di local storage browser. Klik tombol ekspor untuk mengunduh daftar catatan sebagai file .txt atau .md.

## Struktur Folder

```
live-note/
├── src/
│   ├── app/           # Halaman Next.js dengan App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── archive/
│   │       └── page.tsx
│   ├── styles/        # File CSS global
│   │   └── globals.css
│   └── (other folders as needed)
├── public/
│   └── docs/
│       ├── app-files-explanation.md
│       └── livestream-timestamp-app-concept.md
├── tests/
│   └── livestream.spec.ts
├── playwright.config.ts
└── (other config files)
```

## Phase Pengembangan

- ✅ Phase 1: Setup Proyek dan UI Dasar
- ✅ Phase 2: Timer dan Add Notes
- ✅ Phase 3: Local Storage Integration
- ⏳ Phase 4: Fitur Ekspor
- ✅ Phase 5: Testing dan Polish

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Menjalankan development server dengan Turbopack
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint
- `npm run type-check` - Cek TypeScript errors
- `npm run test` - Menjalankan Playwright tests

## Path Aliases

Aplikasi ini menggunakan path aliases untuk import yang lebih bersih:

```typescript
import Component from '@/components/Component'
import { util } from '@/lib/utils'
import styles from '@/styles/globals.css'
import type User from '@/types/user'
import { hook } from '@/hooks/useHook'
```

Available aliases:
- `@/*` → `./src/*`

## Testing

Aplikasi menggunakan Playwright untuk end-to-end testing. Jalankan tests dengan:

```bash
npm run test
```

Laporan test tersedia di `playwright-report/` dan `test-results/`.

## Customization

Aplikasi ini dapat dikustomisasi sesuai kebutuhan. Tambahkan fitur baru atau modifikasi UI sesuai requirements.