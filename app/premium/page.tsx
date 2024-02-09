/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

import PaidPlanCard from '@/app/components/Presets/paidPlanCard/paidPlanCard'
import { v4 as uuidv4 } from 'uuid'

const cards = [
  {
    title: 'Пожизненая подписка',
    description:
      'Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.',
    includedFeatures: [
      'Нееограниченное колличество коллекций',
      'Бесплатные книги по подписке',
      'Специальный значок',
      'Специальные эмодзи',
      'Приватные форумы'
    ],
    priceTitle: 'Пользуйся вечно заплатив лишь раз',
    price: 1700
  },
  {
    title: 'Пожизненая подписка',
    description:
      'Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.',
    includedFeatures: [
      'Нееограниченное колличество коллекций',
      'Бесплатные книги по подписке',
      'Специальный значок',
      'Специальные эмодзи',
      'Приватные форумы'
    ],
    priceTitle: 'Пользуйся вечно заплатив лишь раз',
    price: 800
  },
  {
    title: 'Пожизненая подписка',
    description:
      'Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.',
    includedFeatures: [
      'Нееограниченное колличество коллекций',
      'Бесплатные книги по подписке',
      'Специальный значок',
      'Специальные эмодзи',
      'Приватные форумы'
    ],
    priceTitle: 'Пользуйся вечно заплатив лишь раз',
    price: 350
  }
]

export default function Premium() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {cards.map((card) => (
          <PaidPlanCard
            title={card.title}
            description={card.description}
            includedFeatures={card.includedFeatures}
            priceTitle={card.priceTitle}
            price={card.price}
            key={uuidv4()}
          />
        ))}
      </div>
    </div>
  )
}
