"use client"
import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import ProfileBreadcrumbs from '../component/ProfileBreadcrumbs'
import { TabPanel, TabView } from 'primereact/tabview'
import TabIndex from '../component/TabPanel'
import Custombutton from '../component/Custombutton'

const Profile = () => {
    const cookies = parseCookies();
    const [avatar, setAvatar] = useState<any>();
    const [userName, setUserName] = useState<any>();
    const [activeIndex, setActiveIndex] = useState(0);
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
    useEffect(() => {
        if (cookies.avatar_value || cookies.user_name) {
            setAvatar(cookies.avatar_value || "")
            setUserName(cookies.user_name || "")
        }
    }, [cookies])
    return (
        <>
            <div className='relative'>
                <div style={{ backgroundImage: `url('/images/profile-banner.svg')` }} className='w-full h-[200px]'>
                    <div className='pl-2 pt-1 '>
                        <ProfileBreadcrumbs breadcrumb={breadcrumb} />
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6 absolute top-20  w-full px-14'>
                    <div className='col-span-3 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div className='flex flex-col gap-5 items-center justify-center p-10'>
                            <div className='rounded-full w-28 h-28 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee] cursor-pointer'>
                                <p className='font-bold'>{avatar || ""}</p>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p className='text-[16px] text-[#000] flex justify-center font-bold'>{userName}</p>
                                <p className='text-[14px] text-[#898D8E] flex justify-center'>User</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-9 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div className='rounded-[24px] p-3 flex flex-col'>
                            <TabIndex tabHead={[{ title: "ACCOUNT SETTING" }, { title: "YET TO DECIDE" }]} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                            <div>
                                {
                                    activeIndex == 0 &&
                                    <>
                                        <div className='px-4  relative text-[14px]'>
                                            <div className='mt-2 flex flex-col gap-1 '>
                                                <label htmlFor="" className=''>Upload Signature</label>
                                                <div className='border border-[#F4AA08] bg-[#FFFDF8] w-[400px] rounded-[6px]'>
                                                    <div className='flex flex-col justify-center items-center px-5 py-3'>
                                                        <input
                                                            type='file'
                                                            id="release_images"
                                                            hidden
                                                            onChange={(e) => {

                                                            }}
                                                            accept=".jpeg, .png"
                                                            multiple
                                                        />
                                                        <label htmlFor="release_images" className='py-[6px] px-[16px] bg-[#F4AA08] text-[12px] rounded-[4px] text-white hover:cursor-pointer'>Upload File</label>
                                                        <p className='text-[12px] text-[#F4AA08] font-medium mt-1.5'>2MB Limit</p>
                                                        <p className='text-[10px] text-[#F4AA08]'>JPEG,PNG</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='-bottom-12 absolute '>
                                                <Custombutton name={'Update'} color={'yellow'}/>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile