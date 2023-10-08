import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'

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
      <body className='flex flex-col max-w-screen-2xl mx-auto pt-7 font-mono px-4 2xl:px-0 min-h-screen gap-3'>

        {children}
        
        </body>
    </html>
  )
}
