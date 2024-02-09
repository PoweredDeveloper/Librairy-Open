/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

'use client'
import Image from 'next/image'
import banner from '@/app/assets/images/gruv.png'
import UserAvatar from '@/app/components/Presets/User/Avatar'
import { badges } from '@/app/components/Presets/Badges/Badges'
import { IBadges } from '@/app/types/interfaces'
import DialogAllBadges from './../../components/Presets/Badges/Dialog';
import { useState, Fragment, useEffect } from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link';
import { Tab } from '@headlessui/react'

// Icons:
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiAward } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiPencil } from 'react-icons/bi'

type Props = {
    user_id: string,
    currentUser: User | null
}

type BadgeType = {
    name: string,
    granted: string
}

type UserInfoType = {
    firstName: string,
    lastName: string,
    username: string,
    avatarUrl: string,
    level: number,
    badges: BadgeType[]
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

export default function UserPageByID({currentUser, user_id} : Props) {
    const supabase = createClientComponentClient()
    const [openDialog, setOpenDialog] = useState(false)
    const [userData, setUserData] = useState<UserInfoType | null>(null)
    const [userId, setUserId] = useState<string>('')

    const getUserData = async () => {
        try {
            const { data, error, status } = await supabase
                .from('profiles')
                .select('first_name, last_name, username, avatar_url, level, badges, id')
                .eq('username', user_id)
                .single()

            if (error && status !== 406) {
                throw error
            }
            if (!data) return

            const badges: BadgeType[] = Object.values(data.badges) || []
            const userDataGenerated: UserInfoType = {
                firstName: data.first_name,
                lastName: data.last_name,
                username: data.username,
                avatarUrl: data.avatar_url,
                level: data.level,
                badges: badges
            }

            setUserId(data.id)
            setUserData(userDataGenerated)
        } catch (error) {
            alert("Error fetching data")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <div className='bg-brown-100 flex-auto'>
            <div className='flex justify-center lg:mt-12 mt-0'>
                <div className="max-w-[1200px] bg-white lg:rounded-lg">
                {userData ?
                    <>
                        <div className='text-brown-900'>
                        <Image className="object-cover max-h-[160px] lg:rounded-t-lg bg-brown-100" alt="User Banner" src={banner} />
                        <div className='flex justify-between items-center p-5 border-b border-brown-600'>
                            <div className="flex gap-3 lg:gap-5 items-center">
                            <UserAvatar className='rounded-full ring-offset-[3px] ring-2 ring-brown-700 max-w-[48px] lg:max-w-[64px] max-h-[48px] lg:max-h-[64px]' size={64} avatarUrl={userData.avatarUrl} />
                            <div className='max-w-[250px] lg:max-w-[900px]'>
                                <div className='font-semibold text-lg flex lg:items-center lg:justify-start justify_center flex-col items-start lg:flex-row lg:gap-2'>
                                <div className="flex items-center gap-2">
                                    {`${userData.firstName} ${userData.lastName || ''}`}
                                    {userData.badges.length != 0 &&
                                        <div className='text-sm font-medium lg:hidden block'>{`@${userData.username}`}</div>
                                    }
                                </div>
                                <div className="gap-1 hidden lg:flex">
                                    {userData.badges.map((badge, index) => 
                                    index < 3 &&
                                    <div key={badge.name} className='mb-1'>
                                        {(badges as IBadges)[badge.name]}
                                    </div>
                                    )}
                                    {userData.badges.length != 0 &&
                                    <div className='mb-1'>
                                        <span onClick={() => setOpenDialog(true)} className='align-bottom inline-flex text-base items-center rounded-md hover:bg-gray-200 hover:text-gray-700 hover:ring-gray-500/40 cursor-pointer transition-colors bg-gray-50 px-1 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/20'>
                                        <HiOutlineDotsHorizontal />
                                        </span>
                                    </div>
                                    }
                                </div>
                                <div className='lg:hidden flex text-sm text-center gap-1'>
                                    <span className='flex gap-1 items-center'><FiAward />{userData.badges.length}</span>
                                    {'・'}
                                    <span className='flex gap-1 items-center'><FaRegUser />{0}</span>
                                </div>
                                </div>
                                <div className={`text-sm ${userData.badges.length != 0 ? 'lg:block hidden' : 'block'}`}>
                                {`@${userData.username} ・ ${userData.level} Уровень`}
                                </div>
                            </div>
                            </div>
                            <div>
                            <span className='flex gap-1 items-center text-xl lg:hidden mr-2'><HiOutlineDotsHorizontal onClick={() => setOpenDialog(true)} /></span>
                            {userId === currentUser?.id && <Link href='/user/account' className='hidden lg:block button'><BiPencil /></Link>}
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
                        <DialogAllBadges person={`${userData.firstName} ${userData.lastName || ''}`} isOpen={openDialog} setOpen={setOpenDialog}>
                            <table className='w-full border-collapse mt-2'>
                            <tr className='text-center font-semibold'>
                                <th className='border-b border-r p-1'>Бэйдж</th>
                                <th className='border-b border-r p-1'>Имя</th>
                                <th className='border-b p-1'>Получено</th>
                            </tr>
                            {userData.badges.map(badge => 
                                <tr key={badge.name}>
                                <td className='px-1 py-2 border-t'>
                                    {(badges as IBadges)[badge.name]}
                                </td>
                                <td className="font-semibold border border-b-0 px-2">{badge.name}</td>
                                <td className='border-t px-2'>{Date.parse(badge.granted)}</td>
                                </tr>
                            )}
                            </table>
                        </DialogAllBadges>
                    </>
                    :
                    <div className='text-brown-900 w-full md:w-auto my-5 lg:my-7 lg:mx-4 flex justify-center items-center flex-col'>
                        <h1 className='mb-3 text-2xl'>Пользователь не найден</h1>
                        <Link href='/' className='accent-button'>На Главную</Link>
                    </div>
                }
                </div>
            </div>
        </div>
    )
    }
