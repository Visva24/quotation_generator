import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  route: string;
}

interface BreadcrumbsProps {
  breadcrumb: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumb }) => {
  return (
    <>
      {breadcrumb.map((item, index) => (
        <div key={index} className="h-[30px] text-[14px] flex items-center  gap-[2px]">
          <div className='ml-1'><Link href={item?.route}>{item?.label}</Link></div> <i className="pi pi-angle-right pt-[3px] text-[14px]"></i>
        </div>
      ))}
    </>
  );
};

export default Breadcrumbs;
