import '@/app/css/global.css'
import Header from '@/app/components/Header/Header'
import { Inter } from 'next/font/google'
import supabaseServer from './api/supabase/supabaseServer'

const inter = Inter({ weight: ['300'], subsets: ['cyrillic', 'latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = supabaseServer()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return (
    <html lang="ru" className={`${inter.className}`}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
