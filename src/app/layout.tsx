import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Live Note - Livestream Timestamp Tool',
  description: 'Professional livestream timestamp tool for content creators. Automatically timestamp and archive important moments during live broadcasts. Perfect for streamers, podcasters, and live event organizers.',
  keywords: ['livestream timestamp', 'live streaming notes', 'content creator tools', 'stream archiving', 'broadcast timing', 'live event notes'],
  authors: [{ name: 'Live Note Team' }],
  openGraph: {
    title: 'Live Note - Livestream Timestamp Tool',
    description: 'Automatically timestamp and archive important moments during live broadcasts. Essential tool for content creators and livestream viewers.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}