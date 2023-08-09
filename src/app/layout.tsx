import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My LoL Meta',
  description: 'What\'s meta in your rank?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-screen-2xl mx-auto pt-7 font-mono'>{children}</body>
    </html>
  )
}
