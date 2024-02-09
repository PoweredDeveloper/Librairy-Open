/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

import React from 'react'
import { FaCheck } from 'react-icons/fa6'

interface PaidPlanCardProps {
  title: string
  description: string
  includedFeatures: string[]
  priceTitle: string
  price: number
}

export default function PaidPlanCard({
  title,
  description,
  includedFeatures,
  priceTitle,
  price
}: PaidPlanCardProps) {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-brown-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-brown-900">
          {title}
        </h3>
        <p className="mt-6 text-base leading-7 text-brown-600">{description}</p>
        <div className="mt-10 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-orange-600">
            Включает:
          </h4>
          <div className="h-px flex-auto bg-brown-100" />
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-brown-600 sm:grid-cols-2 sm:gap-6"
        >
          {includedFeatures.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <FaCheck
                className="h-6 w-5 flex-none text-orange-600"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl bg-brown-50 py-10 text-center ring-1 ring-inset ring-brown-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-brown-600">
              {priceTitle}
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-brown-900">
                ₽{price}
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-brown-600">
                РУБ
              </span>
            </p>
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-orange-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Приобрести
            </a>
            <p className="mt-6 text-xs leading-5 text-brown-600">
              Чеки и квитанции доступны будут на почте после приобретения.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
