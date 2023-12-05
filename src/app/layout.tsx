import '@/src/css/global.css'
import { AuthContextProvider } from '@/src/context/AuthContext'
import Header from '../components/Header/Header'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.className}`}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="text-brown-900 h-full bg-white">
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
