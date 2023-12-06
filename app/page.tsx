import { Metadata } from 'next'
import AuthForm from './auth-form'

export const metadata: Metadata = {
  title: 'Librairy | Главная',
  description: 'The main page of Librairy website'
}

export default function Page() {
  return (
    <>
      <h1>Main</h1>
      <div className="row">
        <div className="col-6">
          <h1 className="header">Supabase Auth + Storage</h1>
          <p className="">
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </p>
        </div>
        <div className="col-6 auth-widget">
          <AuthForm />
        </div>
      </div>
    </>
  )
}
