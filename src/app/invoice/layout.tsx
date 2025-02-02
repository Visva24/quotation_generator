"use client"
import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import Header from '../component/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutInvoice: React.FC<LayoutProps> = ({ children }) => {
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        },
        {
            label: "Invoice Generator",
            route: "/"
        }
    ]
    return (
        <div className='min-h-screen'>
            <Header/>
            <div className='pl-2 pt-4 '>
                <Breadcrumbs breadcrumb={breadcrumb} />
                <div className='bg-[#DFDFDF] px-2.5 py-4 rounded-[8px] mx-2.5 my-3'>
                    <Tabs tabHead={[{ title: "Home", route: "/invoice", icon: "home" }, { title: "History", route: "/invoice/history", icon: "history" }]} />
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}
export default LayoutInvoice;
