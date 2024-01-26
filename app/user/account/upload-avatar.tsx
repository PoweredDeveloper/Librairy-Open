'use client'
import UserAvatar from './../../components/Presets/User/Avatar';

export default function UploadAvatar({
  uid,
  url,
  size,
  // onUpload,
}: {
  uid: string | undefined
  url: string | null
  size: number
  // onUpload: (url: string) => void
}) {

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <UserAvatar avatarUrl={url} size={size} className='rounded-full' />
        <label
          htmlFor="avatar-upload"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-2"
        >
          <span>Change{/* {uploading ? 'Uploading...' : 'Change'} */}</span>
          <input id="avatar-upload" accept='image/*' name="avatar-upload" type="file" className="sr-only" />
        </label>
      </div>
    </div>
  )
}