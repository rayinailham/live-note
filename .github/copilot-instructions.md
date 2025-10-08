# Next.js Starter - AI Agent Instructions

## Architecture Overview
- **Framework**: Next.js 14 with App Router (not Pages Router)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Turbopack for development, standard Next.js build for production

## Path Aliases (Critical)
Always use these aliases for imports - they're configured in both `tsconfig.json` and `next.config.js`:

```typescript
import Component from '@/components/Component'  // ./src/components/
import { util } from '@/lib/utils'              // ./src/lib/
import styles from '@/styles/globals.css'       // ./src/styles/
import type User from '@/types/user'            // ./src/types/
import { hook } from '@/hooks/useHook'          // ./src/hooks/
```


## Styling Patterns
- Use Tailwind utility classes primarily
- Custom CSS variables defined in `:root` for theme colors
- Dark mode support via `prefers-color-scheme` media query
- CSS custom properties: `--background`, `--foreground`

## Component Development
- Avoid using modular components; create components specific to a page directly within that page file
- In this project, prioritize context over efficiency, as development depends on AI that needs to read the context
