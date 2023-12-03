import '@/src/css/global.css'
import localFont from '@next/font/local'
import Header from '../components/Header/Header'

const alliance = localFont({
  src: '../../public/fonts/Alliance-Regular.otf',
  variable: '--font-alliance'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${alliance.variable} font-sans h-full`}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Librairy | Главная</title>
      </head>
      <body className="text-brown-900 h-full bg-white">
        <Header />
        {children}
      </body>
    </html>
  )
}
