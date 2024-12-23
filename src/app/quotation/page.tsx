'use client'
import React, { useState } from 'react'
import Custombutton from '../component/Custombutton'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState<any>(
    {
      customer: "",
      document_no: "",
      customer_reference: "",
      contact_person: "",
      contact_no: "",
      document_date: "",
      currency: "",
      payment_method: "",
      email: "",
    }
  )
  const [sideTemplate, setSideTemplate] = useState<any>()
  const handleChange = (key: string, value: string) => {
    setFormdata({ ...formdata, [key]: value })
  }
  return (
    <>
      <div className='flex justify-center items-center'><p className='text-[18px]'>Quotation</p></div>
      <div className='grid grid-cols-4 gap-5 text-[14px] px-4 mt-5 border rounded-[4px] p-2 mx-2'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Customer</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange('customer', e.target.value) }}
            value={formdata.customer}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Document No</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("document_no", e.target.value) }}
            value={formdata.document_no}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Contact person</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("contact_person", e.target.value) }}
            value={formdata.contact_person}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Customer Reference</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("customer_reference", e.target.value) }}
            value={formdata.customer_reference}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Contact No</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("contact_no", e.target.value) }}
            value={formdata.contact_no}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Document Date</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("document_date", e.target.value) }}
            value={formdata.document_date}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Currency</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("currency", e.target.value) }}
            value={formdata.currency}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Payment Method</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("payment_method", e.target.value) }}
            value={formdata.payment_method}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">E-mail</label>
          <input className='border h-8 rounded-[4px]'
            type='text'
            onChange={(e) => { handleChange("email", e.target.value) }}
            value={formdata.email}
          />
        </div>
      </div>
      {
        
      }
      {JSON.stringify(formdata)}
      <div className='flex justify-center mt-5'>
        <Custombutton name='Back' color='blue' onclick={() => { router.push('/') }} />
      </div>
      {/* table */}
     
    </>
  )
}

export default page