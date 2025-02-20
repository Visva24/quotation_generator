"use client"
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import RestrictNavigateTabs from '../component/RestrictNavigateTabs';
import Popup from '../component/Popup';
import { getMethod } from '@/utils/api';
import { Response } from '@/utils/common';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutChallan: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [docNo, setDocNo] = useState<any>();
    const [pendingRoute, setPendingRoute] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        },
        {
            label: "Delivery Note Generator",
            route: "/"
        }
    ]

    const onNavigationChange = (route: any) => {
        if (pathname === "/challan" && route !== "/challan") {
            setPendingRoute(route);
            setShowPopup(true);
        } else {
            router.push(route);
        }
    }

    const resetTempData = async () => {
        const response: Response = await getMethod(`/delivery-challan/reset-temp-Challan-list?doc_number=${docNo}`)
    }
    const handleYes = async () => {
        if (pendingRoute) {
            await resetTempData();
            router.push(pendingRoute);
            setPendingRoute(null);
        }
        setShowPopup(false);
    }

    const getDocumentNo = async () => {
        const response: Response = await getMethod("/quotation/generate-dynamic-doc-number?doc_type=delivery")
        if (response.status === "success") {
            setDocNo(response?.data)
        } else {
            console.log(response.message)
        }
    }
    useEffect(() => {
        getDocumentNo();
    }, [])
    return (
        <div className='min-h-screen'>
            <Header />
            <div className='pl-2 pt-1'>
                <Breadcrumbs breadcrumb={breadcrumb} onNavigate={onNavigationChange} />
                <div className='bg-[#DFDFDF] px-2.5 py-4 rounded-[8px] mx-2.5 mt-1 mb-2'>
                    <RestrictNavigateTabs tabHead={[{ title: "Home", route: "/challan", icon: "home" }, { title: "History", route: "/challan/history", icon: "history" }]} onNavigate={onNavigationChange} />
                </div>
            </div>
            <main>
                {children}
            </main>
            {
                showPopup &&
                <>
                    <Popup message={'Are you sure you want to navigate to a different page? Any unsaved changes in your form will be discarded.'} handleCancel={() => { setShowPopup(false) }} handleRedirect={handleYes} />
                </>
            }
        </div>
    )
}
export default LayoutChallan;
