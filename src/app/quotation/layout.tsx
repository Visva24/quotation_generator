"use client"
import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import Header from '../component/Header';

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
            route: "/quotation"
        }
    ]
    return (
        <div className='min-h-screen'>
            <Header/>
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
