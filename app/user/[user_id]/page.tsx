/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import UserPageByID from './userPage'

type Props = {
  params: {
    user_id: string
  }
}

export default async function Profile({ params: { user_id }}: Props) {
  const cookiesStorage = cookies()
  const supabase = createServerComponentClient({cookies: () => cookiesStorage})
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <UserPageByID currentUser={user} user_id={user_id} />
  )
}