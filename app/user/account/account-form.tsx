'use client'
import UploadAvatar from './upload-avatar'
import { AiFillPicture } from "react-icons/ai";
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs'

type Country = {id: number, icon: string, country: string}

const countries: Array<Country> = [
  { id: 1, icon: '🇷🇺', country: 'Russia'},
  { id: 2, icon: '🇨🇳', country: 'China'},
  { id: 5, icon: '🇧🇾', country: 'Belarus'},
  { id: 3, icon: '🇰🇿', country: 'Kazakhstan'},
  { id: 6, icon: '🇺🇸', country: 'United States'},
  { id: 4, icon: '🇬🇧', country: 'United Kingdom'},
]

export default function AccountForm({user}: {user: User | null}) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [userCountry, setUserCountry] = useState<number | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`avatar_url, first_name, last_name, country, email, username, description`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setUserCountry(data.country)
        setDescription(data.description)
      }
      
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile(updateValues: {
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    description?: string | null
    avatar_url?: string | null
    country?: number | null
  }) {
    try {
      setLoading(true)

      if (!updateValues) return

      const { error } = await supabase.from('profiles').upsert({id: user?.id as string, ...updateValues})

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='bg-white max-w-[1200px] w-max my-0 lg:my-12 lg:rounded-lg lg:p-12 p-6'>
      <div>
        <div className="border-b border-gray-900/10 pb-12 mb-8">
          <h2 className="text-lg font-semibold leading-7 text-gray-900">Edit Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">librairy.lib/user/</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-0.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
          </div>

          <UploadAvatar
            uid={user?.id}
            url={avatar_url}
            size={64}
            onChange={(url) => {
              setAvatarUrl(url)
              updateProfile({
                avatar_url: avatar_url,
              })
            }}
          />

          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <AiFillPicture className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 3MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 mb-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email || ''}
                disabled
                className="select-none block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </label>
            <div className="mt-2 cursor-pointer">
              <select
                onChange={(e) => setUserCountry(Number(e.target.options[e.target.selectedIndex]?.value))}
                id="country"
                name="country"
                value={userCountry || 0}
                className="block w-full font-sans rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled value={0}>Choose Country</option>
                {countries.map((country: Country) => {
                  return (<option key={country.id} value={country.id} className='p-1 cursor-pointer font-sans'>
                    {`${country.icon}  |  ${country.country}`}
                  </option>)
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 mb-8 hidden">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          We&apos;ll always let you know about important changes, but you pick what else you want to hear about.
        </p>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Comments
                  </label>
                  <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="candidates" className="font-medium text-gray-900">
                    Profile visibility
                  </label>
                  <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Offers
                  </label>
                  <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                />
                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  Everything
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                />
                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                  Same as email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-600"
                />
                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
      <form action="/auth/signout" method="post">
        <button className="text-sm font-semibold leading-6 text-gray-900" type="submit">
          Sign out
        </button>
      </form>
      <button
        type="submit"
        disabled={loading}
        onClick={() => {
          updateProfile({
            first_name: firstName,
            description: description,
            username: username,
            country: userCountry,
            last_name: lastName
          })
        }}
        className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  </form>
  )
}
