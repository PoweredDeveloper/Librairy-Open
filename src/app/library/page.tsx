import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Librairy | Библиотека"
}

export default async function Page() {
  return (
  <>
    <h1 className="text-brown-900 text-3xl mb-4">Library</h1>
  </>
  )
}
