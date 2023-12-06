'use client'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  function checkFormData(
    email: string,
    username: string,
    password: string,
    rePassword: string
  ): boolean {
    if (
      !/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(
        email
      )
    )
      return false
    if (!/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password))
      return false
    if (!/^[a-z_.-]{3,20}$/.test(username)) return false
    if (password.length <= 6) return false
    if (password != rePassword) return false
    return true
  }

  const signUpNewUser = async (event: any) => {
    if (
      !checkFormData(
        event.target.email.value,
        event.target.username.value,
        event.target.password.value,
        event.target.repassword.value
      )
    )
      return
    event.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: event.target.email.value,
      password: event.target.password.value,
      options: {
        emailRedirectTo: 'https://librairy.vercel.app/auth/callback',
        data: {
          username: event.target.username.value
        }
      }
    })
  }

  return (
    <form method="POST" onSubmit={signUpNewUser} className="flex flex-col">
      <input type="email" name="email" id="email" />
      <input type="text" name="username" id="username" />
      <input type="password" name="password" id="password" />
      <input type="password" name="repassword" id="repassword" />
      <button type="submit">Register</button>
    </form>
  )
}
