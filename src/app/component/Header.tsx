import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Custombutton from './Custombutton'
import { useRouter } from 'next/navigation'
import { clearUserDataFromCookies } from '@/utils/cookies'
import { parseCookies } from 'nookies'

const Header = () => {
    const router = useRouter();
    const cookies = parseCookies();
    const [avatar, setAvatar] = useState<string>();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    useEffect(() => {
        if (cookies.avatar_value) {
            setAvatar(cookies.avatar_value || "")
        }
    }, [cookies])
    const handleLogout = async () => {
        setIsPopupVisible(true)
    }

    return (
        <>
            <header className="h-[90px] bg-[#222222] flex items-center">
                <div className='flex justify-between w-full items-center'>
                    <div className="flex items-center gap-3 ">
                        <Image src="/images/Logo.svg" alt="Logo" className='ml-2' width={60} height={160} />
                        <h1 className="text-white font-semibold text-lg">
                            NEW SHADOW TRADING AND CLASSY EVENTS W.L.L
                        </h1>
                    </div>
                    <div className='pr-4 flex gap-3 items-center'>
                        <div className='flex gap-1 items-center border border-[#606060] px-3 py-1 rounded-[24px] cursor-pointer' onClick={handleLogout}>
                            <Image src={'/images/logout.svg'} alt={''} width={24} height={24} />
                            <p className='text-[#F4AA08] text-[14px]'>Logout</p>
                        </div>
                        <div className='rounded-full w-8 h-8 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee] cursor-pointer' onClick={() => { router.push("/profile") }}>
                            <p>{avatar}</p>
                        </div>
                    </div>
                </div>
            </header>
            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-[12px] shadow-lg w-[450px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                        <div className='w-full flex flex-col gap-3'>
                            <p className='flex justify-center'>Are you sure you want to log out?</p>
                            <div className='flex gap-4 justify-center items-center'>
                                <Custombutton name={'No'} color={'black'} onclick={() => { setIsPopupVisible(false) }} />
                                <Custombutton name={'Yes'} color={'yellow'} onclick={() => { clearUserDataFromCookies(); router.push("/log-in") }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header