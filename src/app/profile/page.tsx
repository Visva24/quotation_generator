"use client"
import React from 'react'
import Breadcrumbs from '../component/Breadcrumbs'
import { parseCookies } from 'nookies'
import Tabs from '../component/Tabs'

const Profile = () => {
    const cookies = parseCookies();
    const userName = cookies.user_name;
    const avatar = cookies.avatar_value;
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        },
        {
            label: "Profile",
            route: "/profile"
        }
    ]
    return (
        <>
            <div className='relative'>
                <div style={{ backgroundImage: `url('/images/profile-banner.svg')` }} className='w-full h-[200px]'>
                    <div className='pl-2 pt-4 '>
                        <Breadcrumbs breadcrumb={breadcrumb} />
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6 absolute top-20  w-full px-14'>
                    <div className='col-span-3 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div className='flex flex-col gap-5 items-center justify-center p-10'>
                        <div className='rounded-full w-28 h-28 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee] cursor-pointer'>
                            <p className='font-bold'>{avatar}</p>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-[16px] text-[#000] flex justify-center font-bold'>{userName}</p>
                            <p className='text-[14px] text-[#898D8E] flex justify-center'>User</p>
                        </div>
                        </div>
                    </div>
                    <div className='col-span-9 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile