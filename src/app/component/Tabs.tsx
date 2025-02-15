import Link from 'next/link';
import React from 'react';
import 'primeicons/primeicons.css';
import { usePathname } from 'next/navigation';

type Icon = "home" | "history";

interface TabItems {
    title: string;
    route: string;
    icon: Icon;
}

interface TabsProps {
    tabHead: TabItems[];
}

const Tabs: React.FC<TabsProps> = ({ tabHead }) => {
    const pathname = usePathname();
   

    const iconMap: Record<Icon, string> = {
        home: "pi pi-home text-[14px]",
        history: "pi pi-history text-[14px]",
    };

 

    return (
        <div className="px-3 py-1.5 bg-[#fff] inline text-[14px] rounded-[8px]">
            {tabHead.map((header, index) => (
                <Link href={header.route} key={index} className="">
                    <button
                        className={`border-b-[3px] mr-3 gap-2 text-[#8B8B8B] ${
                            pathname === header.route ? 'border-[#F4AA08] !text-[#000] rounded-b-sm' : 'border-transparent'
                        }`}
                    >
                        <i className={iconMap[header.icon]}></i> {header.title}
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default Tabs;
