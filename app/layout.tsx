import '@/app/css/global.css'
import Header from '@/app/components/Header/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
