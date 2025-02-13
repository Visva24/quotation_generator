import React from "react";

interface BreadcrumbItem {
  label: string;
  route: string;
}

interface BreadcrumbsProps {
  breadcrumb: BreadcrumbItem[];
  onNavigate: (route: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumb, onNavigate }) => {
  return (
    <>
      {breadcrumb.map((item, index) => (
        <div key={index} className="h-[30px] text-[14px] inline-flex items-center gap-[2px]">
          <div className="ml-1">
            {index === breadcrumb.length - 1 ? (
              <span className="text-[#F4AA08] cursor-pointer">{item.label}</span>
            ) : (
              <button onClick={() => onNavigate(item.route)}>{item.label}</button>
            )}
          </div>
          {index < breadcrumb.length - 1 && (
            <i className="pi pi-angle-right pt-[3px] text-[14px]"></i>
          )}
        </div>
      ))}
    </>
  );
};

export default Breadcrumbs;
