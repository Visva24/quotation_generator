"use client"
import Custombutton from '@/app/component/Custombutton'
import ToggleSwitch from '@/app/component/ToggleSwitch'
import React, { useState } from 'react'

const Page = () => {
  const [selectOption ,setSelectOption] = useState<any>('Over All')
  const option = ['Over All', 'Quotations', 'Sales Invoice', 'Delivery Notes'];
  const handleChange = (value:any) => {
    console.log(value)
    setSelectOption(value)
  }
  return (
    <div>
     <div className='mx-4 flex justify-between items-center mb-3'>
     <ToggleSwitch options={option} value={selectOption} onChange={handleChange}/>
     <p>filter</p>
     </div>
     {
      selectOption == "Over All" && 
      <div className='p-[20px] text-[14px] rounded-[12px] bg-[#898484] mx-4 group'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <div className='flex gap-3'>
            <p className='px-[10px] py-[4px] rounded-[8px] text-[white] bg-[#5af25a]'>Quotation</p>
            <p className='flex gap-2 items-center'><i className='pi pi-indian-rupee text-[yellow] text-[16px]'></i>6544444</p>
          </div>
          <div className='flex gap-3'>
            <p className='flex gap-2 items-center'><i className='pi pi-calendar text-[yellow] text-[16px]'></i>12/25</p> |
            <p className='flex gap-2 items-center'><i className='pi pi-file text-[yellow] text-[16px]'></i>STG/QUOTATION</p>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Custombutton name={'View Detail'} color={'red'}/>
          <Custombutton name={'Revise'} color={'red'}/>
        </div>
      </div>
      
      {/* This part will only show when parent is hovered */}
      <div className='mt-2 text-[14px] max-h-0 group-hover:max-h-[500px] overflow-hidden transition-all duration-300'>
        <hr className='my-1'/>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='rounded-full w-10 h-10 flex items-center justify-center text-[white] bg-[#63a1ee]'>
              <p>VV</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-[12px]'>Created by</p>
              <p className='text-[14px]'>Visva</p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold'>Remarks</p>
            <p>Abu Dhubai Kitchen</p>
          </div>
        </div>
      </div>
    </div>
    
    
     }
    </div>
  )
}

export default Page