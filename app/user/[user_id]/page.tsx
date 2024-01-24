import Image from 'next/image'
import banner from '@/app/assets/images/gruv.png'
import emptyUser from '@/app/assets/images/empty_user.jpg'
import { badges } from '@/app/components/Presets/Badges/Badges'
import { IBadges } from '@/app/types/interfaces'
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Props = {
  params: {
    user_id: string
  }
}

export async function generateMetadata({ params: { user_id } }: Props) {
  return {
    title: `Librairy | ${user_id}`
  }
}

export default function Profile({ params: { user_id }}: Props) {
  const userBadges = ['admin', 'premium', 'premium', 'premium',]
  return (
    <div className='flex justify-center lg:mt-12 mt-0'>
      <div className="max-w-[1200px] bg-white lg:rounded-t-lg">
        <div className='text-brown-900'>
          <Image className="object-cover max-h-[160px] lg:rounded-t-lg bg-brown-100" alt="User Banner" width={100} src='./some.png' />
          <div className='flex justify-between items-center p-4 border-b border-brown-600'>
            <div className="flex gap-3 items-center">
              <Image className='rounded-full border-2 border-brown-700 max-w-[48px] lg:max-w-[72px]' width={128} src={emptyUser} alt="User Icon" />
              <div className='max-w-[250px] lg:max-w-[900px]'>
                <div className='font-bold text-lg flex items-center gap-2'>
                  James Bond
                  <div className="flex flex-wrap gap-2">
                    {userBadges.length <= 3 ? userBadges.map(badge_id => 
                      <div key={badge_id} className='mb-1'>
                        {(badges as IBadges)[badge_id]}
                      </div>
                    ) : userBadges.map((badge_id, index) => 
                      index < 4 && <div key={badge_id} className='mb-1'>
                        {index < 3
                        ? (badges as IBadges)[badge_id]
                        : <span className='self-baseline inline-flex text-xs items-center rounded-md hover:bg-gray-200 hover:text-gray-700 hover:ring-gray-500/40 cursor-pointer transition-colors bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20'><HiOutlineDotsHorizontal /></span>}
                      </div>
                    )}
                  </div>
                </div>
                <div className='text-sm font-medium'>{`@${user_id}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}