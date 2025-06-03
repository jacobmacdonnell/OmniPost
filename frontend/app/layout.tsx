import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OmniPost.ai',
  description: 'OmniPost.ai is a platform that allows you to generate posts for multiple platforms at once.',
  generator: 'OmniPost.ai',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
