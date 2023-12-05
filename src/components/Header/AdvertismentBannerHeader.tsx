import Link from 'next/link'

export default function Banner() {
  return (
    <>
      14 Дней премиума бесплатно! Для новых пользователей 01.01.2024 -
      28.02.2024.
      <Link href="/premium">Зарегестрироваться сейчас</Link>
      <button
        type="button"
        onClick={() => {
          document.getElementById('ad-premium-banner').remove()
        }}
      >
        X
      </button>
    </>
  )
}
