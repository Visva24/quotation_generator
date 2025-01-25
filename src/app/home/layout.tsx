"use client"
import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import Image from 'next/image';
import Custombutton from '../component/Custombutton';
import { useRouter } from 'next/navigation';
import Header from '../component/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutHome: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        }
    ]
    return (
        <div className='min-h-screen'>
            {/* <header className="h-[90px] bg-[#222222] flex items-center">
               <div className='flex justify-between w-full items-center'>
               <div className="flex items-center gap-4">
                    <Image src="/images/Logo.svg" alt="Logo" width={100} height={120} />
                    <h1 className="text-white font-semibold text-lg">
                        SHADOW TRADING W.L.L
                    </h1>
                </div>
                <div className='pr-4 flex gap-3 items-center'>
                    <div className='rounded-full w-8 h-8 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee]'>
                        <p>VV</p>
                    </div>
                    <Custombutton name={'Logout'} color={'yellow'} onclick={()=>{router.push("/log-in")}}/>
                </div>
               </div>
            </header> */}
            <Header/>
            <div className='pl-2 pt-4 '>
                <Breadcrumbs breadcrumb={breadcrumb} />
                <div className='bg-[#DFDFDF] px-2.5 py-4 rounded-[8px] mx-2.5 my-3'>
                    <Tabs tabHead={[{ title: "Home", route: "/home", icon: "home" }, { title: "History", route: "/home/history", icon: "history" }]} />
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}
export default LayoutHome;
