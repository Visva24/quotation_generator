'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Custombutton from '../component/Custombutton'
import Image from 'next/image'
import moment from 'moment'

const page = () => {
  const router = useRouter();
  const [formdata, setFormdata
    
  ] = useState<any>(
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
      address: "",
      validity: "",
      remark_brand: "",
      delivery: "",
      item_no: "",
      description: "",
      quantity: "",
      unit: "",
      price: "",
      discount: "",
      tax: ""
    }
  )
  const paymentDropdown = [
    {
      label: "QAR",
      value: "QAR"
    },
    {
      label: "INR",
      value: "INR"
    }
  ]
  const handleChange = (key: string, value: string) => {
    setFormdata({ ...formdata, [key]: value })
  }
  return (
    <>
      <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
        <div className='col-span-6  !text-[14px] py-4'>
          <p className='text-[18px] ml-2 font-medium'>Quotation Inputs</p>
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
                <label htmlFor="">Contact person</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("contact_person", e.target.value) }}
                  value={formdata.contact_person}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">E-mail</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("email", e.target.value) }}
                  value={formdata.email}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Contact No</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("contact_no", e.target.value) }}
                  value={formdata.contact_no}
                />
              </div>
            </div>
            <div className='px-2 my-2'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Address</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("address", e.target.value) }}
                  value={formdata.address}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 px-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Document No</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("document_no", e.target.value) }}
                  value={formdata.document_no}
                />
              </div>
              <div className='flex flex-col gap-1 small-picker'>
                <label htmlFor="">Document Date</label>
                <Calendar className='border h-9 rounded-[6px]' value={formdata.document_date as Date | null} onChange={(e) => handleChange("document_date", e.value)} />
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
                <label htmlFor="">Validity</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("validity", e.target.value) }}
                  value={formdata.validity}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Currency</label>
                <Dropdown className='border h-9 rounded-[6px]'
                  options={paymentDropdown}
                  onChange={(e) => { handleChange("currency", e.target.value) }}
                  value={formdata.currency}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Payment Method</label>
                <Dropdown className='border h-9 rounded-[6px]'
                  options={paymentDropdown}
                  onChange={(e) => { handleChange("payment_method", e.target.value) }}
                  value={formdata.payment_method}
                />
              </div>

            </div>
          </div>
          <div>
            <p className='text-[18px] ml-2 mt-2 font-medium'>Table Inputs</p>
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
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Delivery</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("delivery", e.target.value) }}
                    value={formdata.delivery}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Item No.</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("item_no", e.target.value) }}
                    value={formdata.item_no}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Description</label>
                  <input className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("description", e.target.value) }}
                    value={formdata.description}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Quantity</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("quantity", e.target.value) }}
                    value={formdata.quantity}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Units</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("unit", e.target.value) }}
                    value={formdata.unit}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Discount</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("discount", e.target.value) }}
                    value={formdata.discount}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Tax</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("tax", e.target.value) }}
                    value={formdata.tax}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Price</label>
                  <input className='border h-9 rounded-[6px]'
                    type='number'
                    onChange={(e) => { handleChange("price", e.target.value) }}
                    value={formdata.price}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end items-center my-3 px-2'>
              <div className='flex gap-5 items-center'>
                <Custombutton name={'Reset'} color={'black'} />
                <Custombutton name={'Add'} color={'yellow'} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-6 pt-10'>
          <div className='flex flex-col text-[14px] border rounded-[8px] '>
            <div>
              <div className='flex gap-5 justify-center items-center'>
                <div className=''>
                  <Image src={'/images/abs_icon.png'} alt={''} width={80} height={90} />
                </div>
                <p className='text-[16px] font-medium'>SHADOW TRADING W.L.L</p>
              </div>
              <div className='px-4 flex justify-end gap-2'>
                <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '> QUOTATION</p>
              </div>
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
                  <p className='text-[#929292]'>{moment(formdata.document_date).format("DD/MM/YYYY") || ""}</p>
                </div>
              </div>
              <hr  className='mx-4'/>
              <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                <div className='!break-all'>
                  <p>Contact Person:</p>
                  <p className='text-[#929292] break-word'>{formdata.contact_person}</p>
                </div>
                <div>
                  <p>E-mail:</p>
                  <p className='text-[#929292] break-word'>{formdata.mail}</p>
                </div>
                <div>
                  <p>Contact No.:</p>
                  <p className='text-[#929292] break-word'>{formdata.contact_no}</p>
                </div>
              </div>
              <hr  className='mx-4'/>
              <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                <div>
                  <p>Contact Reference:</p>
                  <p className='text-[#929292] break-word'>{formdata.customer_reference}</p>
                </div>
                <div>
                  <p>Payment Method:</p>
                  <p className='text-[#929292] break-word'>{formdata.payment_method}</p>
                </div>
                <div>
                  <p> Currency:</p>
                  <p className='text-[#929292] break-word'>{formdata.currency}</p>
                </div>
              </div>
              <hr  className='mx-4'/>
              <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                <div>
                  <p>Address:</p>
                  <p className='text-[#929292] break-word'>{formdata.address}</p>
                </div>
                <div>
                  <p>Validity:</p>
                  <p className='text-[#929292] break-word'>{formdata.validity}</p>
                </div>
              </div>
              <hr  className='mx-4'/>
            </div>
            {/* <Custombutton name='Back' color='blue' onclick={() => { router.push('/') }} /> */}
            <div>
              <div>S.No.</div>
              <div>Item No.</div>
              <div>Description</div>
              <div>Quantity</div>
              <div>Units</div>
              <div>Price</div>
              <div>Tax</div>
              <div>Discount</div>
              <div>Total</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page