
'use client'
import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Custombutton from '../../component/Custombutton'
import Image from 'next/image'
import moment from 'moment'
import Table from '../../component/Table'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();
    const [formdata, setFormdata] = useState<any>(
      {
        customer: "",
        document_no: "",
        customer_reference: "",
        contact_person: "",
        contact_no: "",
        document_date: "",
        ref_date:"",
        email: "",
        address: "",
        validity: "",
        remark_brand: "",
      }
    )
    const [tableData, setTableData] = useState<any>({
      item_number: "",
      description: "",
      quantity: "",
      unit: "",
      price: "",
      discount: "",
      tax: ""
    });
  const columns: any = [
    { label: "S.No.", key: "serial_no", align: "center", width: "60px" },
    { label: "Item No.", key: "item_number", align: "center", width: "100px" },
    { label: "Description", key: "description", align: "left", width: "300px" },
    { label: "Quantity", key: "quantity", align: "center", width: "80px" },
    { label: "Units", key: "units", align: "center", width: "80px" },
  ];
  const currency = [
    {
      label: "QAR",
      value: "QAR"
    },
    {
      label: "SAR",
      value: "SAR"
    },
    {
      label: "USD",
      value: "USD"
    }
  ]
  const paymentDropdown = [
    {
      label: "Cash",
      value: "Cash"
    },
    {
      label: "Cheque",
      value: "Cheque"
    },
    {
      label: "BankTransfer",
      value: "BankTransfer"
    }

  ]
  const units = [
    { label: "Numbers", value: "nos" },
    { label: "Kilograms", value: "kg" },
    { label: "Liters", value: "L" },
    { label: "Meters", value: "m" },
  ];

  const handleChange = (key: string, value: any) => {
    setFormdata({ ...formdata, [key]: value })
    setTableData({ ...tableData, [key]: value })
  }
  return (
    <div>
       <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
        <div className='col-span-6 !text-[14px] py-4 overflow-y-scroll '>
          <p className='text-[18px] ml-2 font-medium'>Delivery Note Inputs</p>
          <div className='border mx-2 rounded-[8px] p-2'>
            <div className='grid grid-cols-2 px-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Customer</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange('customer', e.target.value) }}
                  value={formdata.customer}
                />
              </div>
             
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Document No</label>
                <input
                  className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("document_no", e.target.value) }}
                  value={ ""}
                />
              </div>
              <div className='flex flex-col gap-1 small-picker'>
                <label htmlFor="">Document Date</label>
                <Calendar className='border h-9 rounded-[6px]' value={formdata.document_date || ""} onChange={(e) => handleChange("document_date", e.value as Date)} />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Contact person</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("contact_person", e.target.value) }}
                  value={formdata.contact_person}
                />
              </div>
            </div>
            <div className='px-2 my-2'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">E-mail</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("email", e.target.value) }}
                  value={formdata.email}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 px-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Contact No</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("contact_no", e.target.value) }}
                  value={formdata.contact_no}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Customer Reference</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("customer_reference", e.target.value) }}
                  value={formdata.customer_reference}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Address</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("address", e.target.value) }}
                  value={formdata.address}
                />
              </div>
              <div className='flex flex-col gap-1 small-picker'>
                <label htmlFor="">Reference Date</label>
                <Calendar className='border h-9 rounded-[6px]' value={formdata.ref_date || ""} onChange={(e) => handleChange("ref_date", e.value as Date)} />
              </div>
            </div>
          </div>
          <div>
            <p className='text-[18px] ml-2 mt-5 mb-2 font-medium'>Table Inputs</p>
            <div className='border mx-2 rounded-[8px] p-2'>
              <div className='grid grid-cols-2 px-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Item No.</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("item_number", e.target.value) }}
                    value={tableData.item_number}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Description</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("description", e.target.value) }}
                    value={tableData.description}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Quantity</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("quantity", e.target.value) }}
                    value={tableData.quantity}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Units</label>
                  <Dropdown className='border h-9 rounded-[6px]'
                    options={units}
                    optionLabel='label'
                    optionValue='value'
                    type='text'
                    onChange={(e) => { handleChange("unit", e.target.value) }}
                    value={tableData.unit}
                  />
                </div>
              </div>
              <div className='flex justify-end items-center my-3 px-2'>
                <div className='flex gap-5 items-center'>
                  <Custombutton name={'Add'} color={'yellow'}/>
                </div>
              </div>
            </div>
            <p className='text-[18px] ml-2 mt-5 mb-2 font-medium'>Extras</p>
            <div className='border mx-2 rounded-[8px] p-2'>
              <div className='grid grid-cols-2 px-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Remark Brand</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("remark_brand", e.target.value) }}
                    value={formdata.remark_brand}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center my-3 gap-3'>
              <Custombutton name={'Back'} color={'black'} onclick={() => { router.push("/home") }} />
              {<Custombutton name={'Revise'} color={'blue'} />}
            </div>

          </div>
        </div>
        <div className='col-span-6  '>
          <div className='my-2 flex justify-between items-center'>
            <p className='text-[18px] font-medium'> Delivery Note Preview:</p>
            <Custombutton name={'Download'} color={'blue'} />
            {/* <Custombutton name={''} color={'black'}/> */}
          </div>
          <div className='relative flex flex-col text-[14px] border rounded-[8px] pb-40 '>
            <div className='absolute top-0 left-0'> <Image src={'/images/shadow-trading-left-vector.svg'} alt={''} width={40} height={100} /></div>
            <div className='absolute bottom-0 '> <Image src={'/images/shadow-trading-footer.svg'} alt={''} width={900} height={20} /></div>

            <div>
              <div className='flex gap-2 mt-4 pl-14 justify-start items-center'>
                <div className=''>
                  <Image src={'/images/shadow-trading-logo.svg'} alt={''} width={80} height={90} />
                </div>
                <p className='text-[16px] font-medium'>NEW SHADOW TRADING AND CLASSY EVENTS W.L.L</p>
              </div>
              <div className='px-4 flex justify-end gap-2'>
                <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '> DELIVERY NOTE</p>
              </div>
              <div className='pl-10 mb-4'>
                <div className='grid grid-cols-3 text-[12px] px-4 my-4 '>
                  <div className='flex flex-col !break-all'>
                    <p>Customer:</p>
                    <p className='text-[#929292] '>{formdata.customer}</p>
                  </div>
                  <div className='flex flex-col  !break-all'>
                    <p>Document No:</p>
                    <p className='text-[#929292]'>{formdata.document_no}  </p>
                  </div>
                  <div className='flex flex-col !break-all'>
                    <p>Document Date:</p>
                    <p className='text-[#929292]'>{formdata.document_date ? moment(formdata.document_date).format("DD/MM/YYYY") : ""}</p>
                  </div>
                </div>
                <hr className='mx-4' />
                <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                  <div className='!break-all'>
                    <p>Contact Person:</p>
                    <p className='text-[#929292] break-word'>{formdata.contact_person}</p>
                  </div>
                  <div>
                    <p>E-mail:</p>
                    <p className='text-[#929292] break-word'>{formdata.email}</p>
                  </div>
                  <div>
                    <p>Contact No.:</p>
                    <p className='text-[#929292] break-word'>{formdata.contact_no}</p>
                  </div>
                </div>
                <hr className='mx-4' />
                <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                  <div>
                    <p>Contact Reference:</p>
                    <p className='text-[#929292] break-word'>{formdata.customer_reference}</p>
                  </div>
                  <div>
                    <p> Reference Date:</p>
                    <p className='text-[#929292] break-word'>{formdata.ref_date}</p>
                  </div>
                  <div>
                    <p>Remarks:</p>
                    <p className='text-[#929292] break-word'>{formdata.remark_brand}</p>
                  </div>
                 
                </div>
                <hr className='mx-4' />
                <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                  <div>
                    <p>Address:</p>
                    <p className='text-[#929292] break-word'>{formdata.address}</p>
                  </div>
                </div>
                <hr className='mx-4' />
              </div>
            </div>
            


            <div className='mx-3'>
              <Table columns={columns} rows={[]} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page