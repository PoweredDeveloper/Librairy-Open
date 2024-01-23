import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Librairy | 404',
  description: 'Librairy page not found'
}

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-orange-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brown-900 sm:text-5xl">
          Страница не найдена
          {/* Page not found */}
        </h1>
        <p className="mt-4 text-base leading-7 text-brown-600">
          Простите, мы не можем найти страницу, что вы ищите.
          {/* Sorry, we couldn’t find the page you’re looking for. */}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="accent-button">
            Вернуться на главную
            {/* Go back home */}
          </Link>
          <Link
            href="/support"
            className="underline-button"
          >
            Связаться с поддержкой
            {/* Contact support */}
            <span aria-hidden="true" className="ml-1 text-base">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
