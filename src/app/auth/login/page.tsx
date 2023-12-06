import Link from 'next/link'

export default function Login() {
  return (
    <>
      <form method="POST">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <label htmlFor="password">Пароль</label>
        <Link href="#">Забыли пароль?</Link>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <button>Войти</button>
        <button>G | Продолжить через Google</button>
      </form>
      <p>
        Не читатель? <Link href="#">Зарегестрироваться</Link>
      </p>
    </>
  )
}
