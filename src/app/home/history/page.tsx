"use client"
import ToggleSwitch from '@/app/component/ToggleSwitch'
import React, { useState } from 'react'
import QuotationHistory from './QuotationHistory'
import ChallanHistory from './ChallanHistory'
import InvoiceHistory from './InvoiceHistory'

const Page = () => {
  const [selectOption, setSelectOption] = useState<any>("Quotations")
  const option = ['Quotations', 'Delivery Notes', 'Sales Invoice'];
  const handleChange = (value: any) => {
    console.log(value)
    setSelectOption(value)
  }
  return (
    <div>
      <div className='mx-4 flex justify-between items-center mb-3'>
        <ToggleSwitch options={option} value={selectOption} onChange={handleChange} />
        <p>filter</p>
      </div>
      {
        selectOption == "Quotations" &&
        <QuotationHistory />
      }
      {
        selectOption == "Delivery Notes" &&
        <ChallanHistory />
      }
      {
        selectOption == "Sales Invoice" &&
        <InvoiceHistory />
      }
    </div>
  )
}

export default Page