'use client'
import Image from 'next/image'
import banner from '@/app/assets/images/gruv.png'
import emptyUser from '@/app/assets/images/empty_user.jpg'
import { badges } from '@/app/components/Presets/Badges/Badges'
import { IBadges } from '@/app/types/interfaces'
import DialogAllBadges from './../../components/Presets/Badges/Dialog';
import { useState, Fragment } from 'react'
import { Tab } from '@headlessui/react'

// Icons:
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiAward } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

type Props = {
  params: {
    user_id: string
  }
}

type ProfileTab = {
  title: string,
  panel: React.ReactNode
}

const profileTabs: Array<ProfileTab> = [
  {title: 'Списки', panel: <h1>Lists</h1>},
  {title: 'Комментарии', panel: <h1>Comments</h1>},
  {title: 'Друзья', panel: <h1>Friends</h1>},
]

export default function Profile({ params: { user_id }}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const userBadges: string[] = ['premium']
  return (
    <>
      <div className='flex justify-center lg:mt-12 mt-0'>
        <div className="max-w-[1200px] bg-white lg:rounded-t-lg">
          <div className='text-brown-900'>
            <Image className="object-cover max-h-[160px] lg:rounded-t-lg bg-brown-100" alt="User Banner" src={banner} />
            <div className='flex justify-between items-center p-5 border-b border-brown-600'>
              <div className="flex gap-3 lg:gap-5 items-center">
                <Image className='rounded-full ring-offset-[3px] ring-2 ring-brown-700 max-w-[48px] lg:max-w-[64px]' width={64} src={emptyUser} alt="User Icon" />
                <div className='max-w-[250px] lg:max-w-[900px]'>
                  <div className='font-bold text-lg flex lg:items-center lg:justify-start justify_center flex-col items-start lg:flex-row lg:gap-2'>
                    <div className="flex items-center gap-2">
                      James Bond
                      {userBadges.length != 0 &&
                        <div className='text-sm font-medium lg:hidden block'>{`@${user_id}`}</div>
                      }
                    </div>
                    <div className="gap-1 hidden lg:flex">
                      {userBadges.map((badge_id, index) => 
                        index < 3 &&
                        <div key={badge_id} className='mb-1'>
                          {(badges as IBadges)[badge_id]}
                        </div>
                      )}
                      {userBadges.length != 0 &&
                        <div className='mb-1'>
                          <span onClick={() => setOpenDialog(true)} className='align-bottom inline-flex text-base items-center rounded-md hover:bg-gray-200 hover:text-gray-700 hover:ring-gray-500/40 cursor-pointer transition-colors bg-gray-50 px-1 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20'>
                            <HiOutlineDotsHorizontal />
                          </span>
                        </div>
                      }
                    </div>
                    <div className='lg:hidden flex text-sm text-center gap-1'>
                      <span className='flex gap-1 items-center'><FiAward />{userBadges.length}</span>
                      {'・'}
                      <span className='flex gap-1 items-center'><FaRegUser />{25}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${userBadges.length != 0 ? 'lg:block hidden' : 'block'}`}>
                    {`@${user_id} ・ ${4} Уровень`}
                  </div>
                </div>
              </div>
              <div>
                <span className='flex gap-1 items-center text-xl lg:hidden mr-2'><HiOutlineDotsHorizontal onClick={() => setOpenDialog(true)} /></span>
                <button className='hidden lg:block button'>Some button</button>
              </div>
            </div>
            <div className='px-5 pt-3'>
              <Tab.Group defaultIndex={0}>
                <Tab.List className='flex gap-4'>
                  {profileTabs.map(tab => 
                    <Tab as={Fragment} key={tab.title}>
                      {({selected}) => (
                        <button className={'transition-colors px-2 pb-2 border-b-2 ' + (selected ? 'border-orange-500' : 'border-transparent')}>
                          {tab.title}
                        </button>
                      )}
                    </Tab>  
                  )}
                </Tab.List>
              </Tab.Group>
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