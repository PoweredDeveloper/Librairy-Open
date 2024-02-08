'use client'
import '@/app/css/global.css'
import '@/app/utils/customFunctions';
import Header from '@/app/components/Header/Header'
import { Commissioner } from 'next/font/google'
import { cookies } from 'next/headers';
import { User, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

const commissioner = Commissioner({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['cyrillic', 'latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null!)
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  useEffect(() => {
    const getData = async () => {
      const { data: { user: gettedUser } } = await supabase.auth.getUser()
      setUser(gettedUser)
    }
    getData()
  }, [supabase])
  
  return (
    <html lang="ru" className={`${commissioner.className}`}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='h-screen flex flex-col'>
        <Header user={user} />
        {children}
      </body>
    </html>
  )
}
