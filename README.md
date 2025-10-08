# Live Note - Professional Livestream Timestamp Tool

A powerful web application designed for content creators, streamers, and live broadcast viewers to easily timestamp and archive important moments during livestreams. With automatic timestamp features, users can mark specific times from live broadcasts and add detailed notes, making it easier to review, summarize, or reference content later.

## Key Features for Content Creators

- **Automatic Timestamps**: Start a timer and automatically capture timestamps for every note during your livestream
- **Stream Archiving**: Save complete streams with all notes and timestamps for future reference
- **Export Functionality**: Download your timestamped notes as text files for sharing or backup
- **Local Storage**: All data persists in your browser for seamless session management
- **Real-time Notes**: Add notes instantly during live broadcasts without interrupting your workflow
- **Chronological Organization**: View all notes in perfect chronological order with precise timing

## Perfect For

- **Streamers & Content Creators**: Keep track of highlights, technical issues, or important moments
- **Live Event Organizers**: Document key moments during webinars, conferences, or live presentations
- **Podcasters**: Timestamp important segments or guest appearances during recording sessions
- **Educational Content**: Mark key learning points during live tutorials or lectures
- **Sports Broadcasters**: Track game events, scores, and highlights in real-time

## How It Works

1. **Launch Your Stream**: Open Live Note alongside your streaming software or viewing platform
2. **Start Timing**: Click "Start Timer" to begin automatic timestamp tracking
3. **Capture Moments**: When something important happens, quickly type a note and add it with automatic timestamp
4. **Build Your Archive**: Save complete streams with all notes for future reference
5. **Export & Share**: Download timestamped notes for editing, sharing, or archiving

## Technical Features

- Built with Next.js 14 and TypeScript for reliability
- Responsive design works on desktop and mobile devices
- Browser-based with local storage - no account required
- Export notes as plain text files for maximum compatibility
- Modern UI with Tailwind CSS for clean, professional appearance

## Getting Started with Livestream Timestamping

### Quick Setup

1. **Access Live Note**: Open the application in your web browser
2. **Prepare Your Stream**: Have your livestream running in another tab or device
3. **Begin Timing**: Click the "Start Timer" button to initialize timestamp tracking

### During Your Livestream

1. **Monitor Your Content**: Watch your live broadcast while Live Note runs in the background
2. **Capture Key Moments**: When important events occur, enter descriptive notes in the input field
3. **Timestamp Automatically**: Click "Add Note" to save the note with the current stream timestamp
4. **Continue Building**: Add as many timestamped notes as needed throughout your broadcast

### After Streaming

1. **Save Your Stream**: Enter a stream name and save the complete session with all notes
2. **Export for Sharing**: Download your timestamped notes as a text file
3. **Access Archive**: View previously saved streams in the archive section
4. **Start Fresh**: Begin a new stream session whenever ready

### Pro Tips for Content Creators

- **Use Descriptive Notes**: Write clear, actionable notes that will be useful when reviewing later
- **Regular Checkpoints**: Add notes at natural breaks or milestones in your content
- **Stream Naming**: Use descriptive names that include date, topic, or episode number
- **Export Regularly**: Download notes after important streams to ensure they're backed up
- **Review Archives**: Use archived streams to improve future content and identify patterns

## Project Architecture

```
live-note/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with SEO metadata
│   │   ├── page.tsx           # Main livestream timestamp interface
│   │   └── archive/           # Archived streams viewer
│   │       └── page.tsx
│   ├── styles/                # Global CSS and Tailwind configuration
│   │   └── globals.css
│   └── (other folders as needed)
├── public/                    # Static assets and documentation
│   └── docs/                  # Project documentation files
├── tests/                     # End-to-end tests with Playwright
│   └── livestream.spec.ts
├── playwright.config.ts       # Playwright testing configuration
└── (other config files)       # TypeScript, Tailwind, ESLint configs
```

### Technology Stack

- **Frontend Framework**: Next.js 14 with App Router for optimal performance
- **Language**: TypeScript for type safety and better developer experience
- **Styling**: Tailwind CSS for modern, responsive design
- **Testing**: Playwright for comprehensive end-to-end testing
- **Build Tool**: Turbopack for fast development builds

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