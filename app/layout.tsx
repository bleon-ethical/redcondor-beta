import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RED CÓNDOR | Beta',
  description: 'Sistema de IA Red Teamer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-red-900 selection:text-white">
        {children}
      </body>
    </html>
  )
}
