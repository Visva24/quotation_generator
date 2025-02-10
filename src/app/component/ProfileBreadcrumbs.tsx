import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  route: string;
}

interface BreadcrumbsProps {
  breadcrumb: BreadcrumbItem[];
}

const ProfileBreadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumb }) => {
  return (
    <>
      {breadcrumb.map((item, index) => (
        <div key={index} className="h-[30px] text-[14px] text-[#fff] inline-flex items-center gap-[2px]">
          <div className='ml-1'>
            <Link href={item?.route} className={`${index===breadcrumb.length-1 ? "text-[#000]":""}`}>{item?.label}</Link>
          </div>
          {index < breadcrumb.length - 1 && <i className="pi pi-angle-right pt-[3px] text-[14px]"></i>}
        </div>
      ))}

    </>
  );
};

export default ProfileBreadcrumbs;
