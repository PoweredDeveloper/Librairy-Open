import Link from 'next/link'

export default function Banner() {
  return (
    <div id="ad-premium-banner">
      14 Дней премиума бесплатно! Для новых пользователей 01.01.2024 -
      28.02.2024.
      <Link href="/premium">Зарегестрироваться сейчас</Link>
      <button
        type="button"
        onClick={() => {
          try {
            document.getElementById('ad-premium-banner')?.remove()
          } catch (error) {
            throw new Error(
              'Error removing AdvertismentBannerHeader [Element Not Found]'
            )
          }
        }}
      >
        X
      </button>
    </div>
  )
}
