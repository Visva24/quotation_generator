import Image from 'next/image'
import React from 'react'
import Custombutton from './Custombutton'
import { useRouter } from 'next/navigation'
import { clearUserDataFromCookies } from '@/utils/cookies'

const Header = () => {
    const router = useRouter();
    const handleLogout = async() => {
        await clearUserDataFromCookies();
        router.push("/log-in")
    }
  return (
    <>
     <header className="h-[90px] bg-[#222222] flex items-center">
               <div className='flex justify-between w-full items-center'>
               <div className="flex items-center gap-4">
                    <Image src="/images/Logo.svg" alt="Logo" width={100} height={120} />
                    <h1 className="text-white font-semibold text-lg">
                        SHADOW TRADING W.L.L
                    </h1>
                </div>
                <div className='pr-4 flex gap-3 items-center'>
                    <div className='rounded-full w-8 h-8 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee]'>
                        <p>FL</p>
                    </div>
                    <Custombutton name={'Logout'} color={'yellow'} onclick={handleLogout}/>
                </div>
               </div>
            </header>
    </>
  )
}

export default Header