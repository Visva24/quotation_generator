"use client"
import React from 'react'; 
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutHome: React.FC<LayoutProps> = ({ children }) => {
    const breadcrumb = [
        {
            label: "Home",
            route: "/"
        }
    ]
    return (
        <div className='min-h-screen'>
            <header className='pl-2 pt-4'>
                <Breadcrumbs breadcrumb={breadcrumb} />
                <div className='bg-[#DFDFDF] px-2.5 py-4 rounded-[8px] mx-2.5 my-3'>
                    <Tabs tabHead={[{ title: "Home", route: "/", icon: "home" }, { title: "History", route: "/home/history", icon: "history" }]} />
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}
export default LayoutHome;
