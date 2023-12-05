import Link from 'next/link'

export default function SignUp() {
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
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <button type="submit">Зарегестрироваться</button>
        <button>G | Продолжить через Google</button>
      </form>
      <p>
        Уже читатель? <Link href="auth/login">Войти</Link>
      </p>
    </>
  )
}
