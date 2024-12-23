'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import 'primeicons/primeicons.css';
import Image from 'next/image';
import Breadcrumbs from '../component/Breadcrumbs';
import Tabs from '../component/Tabs';
import LayoutHome from './layout';

const HomePage = () => {

  const router = useRouter();
  const redirect = (data: string) => {
    if (data == "quotation") {
      router.push('/quotation')
    }
    else if (data == "invoice") {
      router.push('/invoice')
    }
    else if (data == "challan") {
      router.push('/challan')
    }
  }
  return (
    <>
     <LayoutHome>
     <div >
      
      <div className="flex justify-center items-center" >
        <div className="flex justify-center items-center gap-10 p-8 bg-[#EFEFEF] rounded-[8px] mt-5">
          {/* first */}
          <div className='relative border p-3 rounded-[8px] bg-[#fff] w-[230px] h-[240px] hover:bg-[#FFC648] hover:text-white' onClick={() => { redirect("quotation") }}>
            <div className='flex gap-5 items-center justify-between'>
              <p className='text-[18px] font-medium'>Generate Quotation</p>
              <div className='p-3 rounded-full border'>
                <Image src={'/images/rightarrow.svg'} alt={'logo'} width={20} height={20} />
              </div>
            </div>
            <div className='absolute bottom-3 right-2'> <Image src={'/images/quotation.svg'} alt={'logo'} width={60} height={60} /></div>
          </div>
          {/* second */}
          <div className='relative border p-3 rounded-[8px] bg-[#fff] w-[230px] h-[240px] hover:bg-[#FFC648] hover:text-white' onClick={() => redirect("invoice")} >
            <div className='flex gap-5 items-center justify-between'>
              <p className='text-[18px] font-medium'>Generate Invoice</p>
              <div className='p-3 rounded-full border'>
                <Image src={'/images/rightarrow.svg'} alt={'logo'} width={20} height={20} />
              </div>
            </div>
            <div className='absolute bottom-3 right-2'> <Image src={'/images/invoice.svg'} alt={'logo'} width={60} height={60} /></div>
          </div>
          {/* third */}
          <div className='relative border p-3 rounded-[8px] bg-[#fff] w-[230px] h-[240px] hover:bg-[#FFC648] hover:text-white' onClick={() => redirect("challan")} >
            <div className='flex gap-5 items-center justify-between'>
              <p className='text-[18px] font-medium'>Generate Delivery Slip</p>
              <div className='p-3 rounded-full border'>
                <Image src={'/images/rightarrow.svg'} alt={'logo'} width={20} height={20} />
              </div>
            </div>
            <div className='absolute bottom-0 right-2'> <Image src={'/images/challan.svg'} alt={'logo'} width={70} height={70} /></div>
          </div>
        </div>

      </div>
    </div>
     </LayoutHome>
    </>
  )
}

export default HomePage