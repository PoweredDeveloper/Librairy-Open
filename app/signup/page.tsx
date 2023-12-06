'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabaseServer from '../api/supabase/supabaseServer'

export default function AuthForm() {
  const supabase = supabaseServer()

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_up"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={['google']}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}
