/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

import { IoIosClose } from 'react-icons/io'
import { FaArrowRight } from 'react-icons/fa6'
import Link from 'next/link'

export default function Banner() {
  return (
    <div
      id="ad-premium-banner"
      className="relative hidden lg:flex isolate items-center gap-x-6 overflow-hidden bg-brown-50 px-6 py-1.5 sm:px-3.5 sm:before:flex-1"
    >
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-red-600 to-orange-600 opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-red-600 to-orange-600 opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)'
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-brown-900">
          <strong className="font-semibold">14 Дней премиума бесплатно!</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Для новых пользователей 01.01.2024 - 28.02.2024.
        </p>
        <Link
          href="/premium"
          className="transition-colors flex flex-row items-center gap-1 rounded-full bg-brown-900 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#5e433d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-900"
        >
          Зарегистрироваться сейчас <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={() => {
            document.getElementById('ad-premium-banner')?.remove()
          }}
        >
          <span className="sr-only">Отказаться</span>
          <IoIosClose className="h-7 w-7 text-brown-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
