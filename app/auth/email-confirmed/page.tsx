import supabaseServer from '@/app/api/supabase/supabaseServer'
import Link from 'next/link'
import { NextResponse } from 'next/server'

export default async function EmailConfirmedPage() {
  const supabase = supabaseServer()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('https://librairy.vercel.app/'))
  }

  return (
    <div className="flex items-center mt-6 w-full h-screen">
      <div className="bg-brown-50 border border-brown-500 rounded-xl h-2/3 text-brown-900 p-6">
        <h2 className="text-xl w-full text-center">Ваша почта подтверждена!</h2>
        <p className="text-brown-700">
          Ваша почта была успешно подтверждена и теперь вы можете вернуться на
          сайт и войти в свой аккаунт
        </p>
        <div className="flex items-center justify-around mt-3">
          <Link
            href="/signin"
            className="rounded-md py-2 px-3 bg-orange-500 hover:bg-orange-600 transition-colors text-white w-1/2"
          >
            Вход
          </Link>
          <Link
            href="/"
            className="rounded-md py-2 px-3 bg-brown-200 hover:bg-brown-300 w-1/2"
          >
            На Главную
          </Link>
        </div>
      </div>
    </div>
  )
}
