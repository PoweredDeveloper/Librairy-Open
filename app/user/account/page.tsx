import AccountForm from './account-form'
import supabaseServer from '@/app/api/supabase/supabaseServer'

export default async function Account() {
  const supabase = supabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return <AccountForm session={session} supabaseServer={supabase} />
}
