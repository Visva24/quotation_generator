"use client"
import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import Image from 'next/image';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutQuotation: React.FC<LayoutProps> = ({ children }) => {
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        },
        {
            label: "Quotation Generator",
            route: "/"
        }
    ]
    return (
        <div className='min-h-screen'>
            <header className="h-[90px] bg-[#222222] flex items-center">
                <div className="flex items-center gap-4">
                    <Image src="/images/Logo.svg" alt="Logo" width={100} height={120} />
                    <h1 className="text-white font-semibold text-lg">
                        SHADOW TRADING W.L.L
                    </h1>
                </div>
            </header>
            <div className='pl-2 pt-4 '>
                <Breadcrumbs breadcrumb={breadcrumb} />
                <div className='bg-[#DFDFDF] px-2.5 py-4 rounded-[8px] mx-2.5 my-3'>
                    <Tabs tabHead={[{ title: "Home", route: "/quotation", icon: "home" }, { title: "History", route: "/quotation/history", icon: "history" }]} />
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}
export default LayoutQuotation;
