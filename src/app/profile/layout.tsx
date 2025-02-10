"use client"
import React from 'react';
import Breadcrumbs from '../component/Breadcrumbs';
import Header from '../component/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutProfile: React.FC<LayoutProps> = ({ children }) => {
    
    return (
        <div className='min-h-screen'>
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}
export default LayoutProfile;
