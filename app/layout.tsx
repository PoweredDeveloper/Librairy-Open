import '@/app/css/global.css'
import '@/app/utils/customFunctions';
import Header from '@/app/components/Header/Header'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const inter = Inter({ weight: ['300'], subsets: ['cyrillic', 'latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  return (
    <html lang="ru" className={`${inter.className}`}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='bg-brown-100'>
        <Header user={user} />
        {children}
      </body>
    </html>
  )
}
