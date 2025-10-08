# Next.js Template

Template Next.js sederhana dengan TypeScript dan Tailwind CSS.

## Struktur Folder

```
nextjs-template/
├── src/
│   ├── components/    # Komponen React yang dapat digunakan kembali
│   ├── pages/         # Halaman Next.js 
│   ├── styles/        # File CSS global
│   ├── lib/           # Utilitas dan helper functions
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript type definitions
├── public/            # Asset statis
└── docs/              # Dokumentasi
```

## Fitur

- ✅ Next.js 14 dengan App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Turbopack untuk development
- ✅ Custom path aliases
- ✅ ESLint configuration
- ✅ Komponen siap pakai
- ✅ Custom hooks
- ✅ Type definitions

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

## Path Aliases

Template ini menggunakan path aliases untuk import yang lebih bersih:

```typescript
import Button from '@/components/Button'
import { cn } from '@/lib/utils'
import type { User } from '@/types'
```

Available aliases:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/pages/*` → `./src/pages/*`
- `@/lib/*` → `./src/lib/*`
- `@/utils/*` → `./src/utils/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/types/*` → `./src/types/*`
- `@/styles/*` → `./src/styles/*`
- `@/public/*` → `./public/*`

## Customization

Template ini dirancang untuk dikustomisasi sesuai kebutuhan project Anda. Hapus komponen yang tidak diperlukan dan tambahkan sesuai requirements.