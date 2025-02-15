import React from "react";
import { usePathname } from "next/navigation";
import "primeicons/primeicons.css";

type Icon = "home" | "history";

interface TabItems {
    title: string;
    route: string;
    icon: Icon;
}

interface RestrictNavigateTabsProps {
    tabHead: TabItems[];
    onNavigate: (route: string) => void;
}

const RestrictNavigateTabs: React.FC<RestrictNavigateTabsProps> = ({ tabHead, onNavigate }) => {
    const pathname = usePathname();

    const iconMap: Record<Icon, string> = {
        home: "pi pi-home text-[14px]",
        history: "pi pi-history text-[14px]",
    };

    return (
        <div className="px-3 py-1.5 bg-[#fff] inline text-[14px] rounded-[8px]">
            {tabHead.map((header, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (pathname !== header.route) {
                            onNavigate(header.route);
                        }
                    }}
                    className={`border-b-[3px] mr-3 gap-2 text-[#8B8B8B] ${pathname === header.route ? "border-[#F4AA08] !text-[#000] rounded-b-sm cursor-default" : "border-transparent"}`}
                    disabled={pathname === header.route}
                >
                    <i className={iconMap[header.icon]}></i> {header.title}
                </button>
            ))}
        </div>
    );
};

export default RestrictNavigateTabs;
