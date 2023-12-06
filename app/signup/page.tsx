'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_up"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={['google']}
      redirectTo="http://librairy.vercel.app/auth/callback"
    />
  )
}
