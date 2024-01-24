'use client'
import Image from 'next/image'
import banner from '@/app/assets/images/gruv.png'
import emptyUser from '@/app/assets/images/empty_user.jpg'
import { badges } from '@/app/components/Presets/Badges/Badges'
import { IBadges } from '@/app/types/interfaces'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DialogAllBadges from './../../components/Presets/Badges/Dialog';
import { useState } from 'react'

type Props = {
  params: {
    user_id: string
  }
}

export default function Profile({ params: { user_id }}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const userBadges = ['admin', 'premium', 'author', 'wise']
  return (
    <>
      <div className='flex justify-center lg:mt-12 mt-0'>
        <div className="max-w-[1200px] bg-white lg:rounded-t-lg">
          <div className='text-brown-900'>
            <Image className="object-cover max-h-[160px] lg:rounded-t-lg bg-brown-100" alt="User Banner" src={banner} />
            <div className='flex justify-between items-center p-4 border-b border-brown-600'>
              <div className="flex gap-3 items-center">
                <Image className='rounded-full ring-offset-[3px] ring-2 ring-brown-700 max-w-[48px] lg:max-w-[72px]' width={128} src={emptyUser} alt="User Icon" />
                <div className='max-w-[250px] lg:max-w-[900px]'>
                  <div className='font-bold text-lg flex lg:items-center lg:justify-start justify_center flex-col items-start lg:flex-row lg:gap-2'>
                    <div className="flex items-center gap-2">
                      James Bond
                      <div className='text-sm font-medium lg:hidden block'>{`@${user_id}`}</div>
                    </div>
                    <div className="flex gap-2">
                      {userBadges.map((badge_id, index) => 
                        index < 3 &&
                        <div key={badge_id} className='mb-1'>
                          {(badges as IBadges)[badge_id]}
                        </div>
                      )}
                      <div className='mb-1'>
                        <span onClick={() => setOpenDialog(true)} className='align-bottom inline-flex text-base items-center rounded-md hover:bg-gray-200 hover:text-gray-700 hover:ring-gray-500/40 cursor-pointer transition-colors bg-gray-50 px-1 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20'>
                          <HiOutlineDotsHorizontal />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='text-sm font-medium lg:block hidden'>{`@${user_id}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogAllBadges person='James Bond' isOpen={openDialog} setOpen={setOpenDialog}>
        <table className='w-full border-collapse mt-2'>
          <tr className='text-center'>
            <th className='border-b border-r p-1'>Badge</th>
            <th className='border-b border-r p-1'>Name</th>
            <th className='border-b p-1'>Granted</th>
          </tr>
          {userBadges.map(badge_id => 
            <tr key={badge_id}>
              <td className='px-1 py-2 border-t'>
                {(badges as IBadges)[badge_id]}
              </td>
              <td className="font-bold border border-b-0 px-2">{badge_id}</td>
              <td className='border-t px-2'>20 June, 2024</td>
            </tr>
          )}
        </table>
      </DialogAllBadges>
    </>
  )
}