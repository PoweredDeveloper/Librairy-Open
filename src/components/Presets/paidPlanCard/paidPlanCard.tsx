import React from 'react'

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
    <>
      {title}, {description}, {includedFeatures.map((feature) => feature)},
      {priceTitle}, ₽{price}
    </>
  )
}
