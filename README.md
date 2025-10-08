# Livestream Timestamp App (Live Note)

An app to help content creators or livestream viewers note important moments during live broadcasts. With automatic timestamp features, users can mark specific times from the livestream and add related notes, making it easier to review or summarize content later.

## Main Features

- **Start Button**: Starts the timer from zero when clicked.
- **Notes Input**: Text field for writing notes or descriptions of moments.
- **Add Note Button**: Adds a new note with automatic timestamp based on elapsed time since the start button was clicked.
- **Notes List**: Displays all added notes in chronological order, aligned downwards.
- **Local Storage**: Notes are automatically saved in browser local storage for data persistence across app sessions.
- **Export Notes**: Option to export the list of notes as a .txt or .md file for external storage or sharing.

## Usage Flow

1. **Preparation**: Open the app and ensure the livestream is running on a separate device or tab.
2. **Starting Timer**: Click the "Start" button to start the timer. The timer will start running from 00:00:00.
3. **Noting Moments**: When there's an important moment in the livestream, write a brief description in the notes input field.
4. **Adding Note**: Click "Add Note" to save the note. The note will automatically include the current timestamp (e.g., "00:05:23 - Moment description").
5. **Viewing Notes List**: All notes will appear in a list aligned downwards, allowing users to see the chronology of events during the livestream.
6. **Repeating Process**: Repeat steps 3-4 for each moment to note. The timer continues running until the app is closed or reset.
7. **Saving or Exporting**: Notes are automatically saved in browser local storage. Click the export button to download the notes list as a .txt or .md file.

## Folder Structure

```
live-note/
├── src/
│   ├── app/           # Next.js pages with App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── archive/
│   │       └── page.tsx
│   ├── styles/        # Global CSS files
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

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - Run development server with Turbopack
- `npm run build` - Build app for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript errors
- `npm run test` - Run Playwright tests

## Path Aliases

The app uses path aliases for cleaner imports:

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

The app uses Playwright for end-to-end testing. Run tests with:

```bash
npm run test
```

Test reports are available in `playwright-report/` and `test-results/`.

## Customization

This app can be customized according to needs. Add new features or modify the UI as per requirements.