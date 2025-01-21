'use client'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Custombutton from '../component/Custombutton'
import Image from 'next/image'
import moment from 'moment'
import Table from '../component/Table'
import { getMethod, postMethod } from '@/utils/api'
import { Response } from '@/utils/common'

const page = () => {
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
      address: "",
      validity: "",
      remark_brand: "",
      delivery: "",
    }
  )
  const [tableData, setTableData] = useState<any>({
    item_no: "",
    description: "",
    quantity: "",
    unit: "",
    price: "",
    discount: "",
    tax: ""
  });

  const handleChange = (key: string, value: any) => {
    setFormdata({ ...formdata, [key]: value })
    setTableData({ ...tableData, [key]: value })
  }

  const [rows, setRows] = useState<any>([]);
  const handleAdd = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        ...tableData,
        id: Date.now(),
      },
    ]);
    setTableData({
      item_no: "",
      description: "",
      quantity: "",
      unit: "",
      price: "",
      discount: "",
      tax: "",
    });
  };

  const handleRemoveRow = (id: string | number) => {
    console.log(id)
    setRows((prevRows: any) => prevRows.filter((row: any) => row.id !== id));
  };
  const handleEditRow = (id: string | number) => {
    console.log(id)
    // setRows((prevRows:any) => prevRows.filter((row:any) => row.id !== id));
  };


  const columns: any = [
    { label: "S.No.", key: "sno", align: "center", width: "60px" },
    { label: "Item No.", key: "item_no", align: "center", width: "100px" },
    { label: "Description", key: "description", align: "left", width: "300px" },
    { label: "Quantity", key: "quantity", align: "center", width: "80px" },
    { label: "Units", key: "unit", align: "center", width: "80px" },
    { label: "Price", key: "price", align: "center", width: "100px" },
    { label: "Tax(%)", key: "tax", align: "center", width: "100px" },
    { label: "Discount(%)", key: "discount", align: "center", width: "100px" },
    { label: "Total", key: "total", align: "center", width: "100px" },
  ];

  const rowsWithIndex = rows.map((row: any, index: any) => ({
    ...row,
    sno: index + 1,
    total: (
      (row.price * row.quantity +
        (row.price * row.quantity * row.tax) / 100 -
        (row.price * row.quantity * row.discount) / 100
      ).toFixed(2)
    ),
  }));
  console.log(rowsWithIndex)
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
  const units = [
    { label: "Numbers", value: "nos" },
    { label: "Kilograms", value: "kg" },
    { label: "Liters", value: "L" },
    { label: "Meters", value: "m" },
    { label: "Square Meters", value: "m2" },
    { label: "Cubic Meters", value: "m3" },
    { label: "Boxes", value: "box" },
    { label: "Sets", value: "set" },
    { label: "Kilometers", value: "km" },
    { label: "Grams", value: "g" },
    { label: "Milliliters", value: "ml" },
    { label: "Dozens", value: "doz" },
    { label: "Tons", value: "t" },
    { label: "Cans", value: "can" },
  ];
  
  const [docNo , setDocNo] = useState<any>()
  const getDocumentNo = async() => {
    const response:Response = await getMethod("/quotation/generate-dynamic-doc-number?doc_type=quotation")
    console.log(response.data)
    setDocNo(response?.data)
  }
  useEffect(()=>{
    getDocumentNo()
  },[])

  const createQuototion = async () => {
    const payload = {
      customer_name: formdata.customer,
      customer_reference_id: "",
      doc_number: formdata.document_no,
      doc_date: formdata.document_date,
      contact_person: formdata.contact_person,
      email: formdata.email,
      contact_number: "7708969414",
      customer_reference: "00001",
      payment_mode: "Cash",
      currency: "QAR",
      quotation_validity: "3",
      address: "chennai",
      remark_brand: "Banana",
      delivery: "60",
      sub_total: 7000,
      total_discount: 10,
      total_tax: 10,
      grand_total: 5600,
      created_user_id: 3,
      quotation_list_array: [
        {
          "item_number": 1,
          "description": "Bolt",
          "quantity": 10,
          "units": "Nos",
          "price": 200,
          "discount": 0,
          "tax": 0,
          "amount": 2000
        }
      ]
    }
  const response: Response = await postMethod("/quotation/create-quotation-form", payload)
  }


return (
  <>
    <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
      <div className='col-span-6  !text-[14px] py-4 overflow-y-scroll h-screen'>
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
              <label htmlFor="">Document No</label>
              <input className='border h-9 rounded-[6px]'
                type='text'
                onChange={(e) => { handleChange("document_no", e.target.value) }}
                value={docNo || formdata.document_no}
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
              <label htmlFor="">Payment Method</label>
              <Dropdown className='border h-9 rounded-[6px]'
                options={paymentDropdown}
                onChange={(e) => { handleChange("payment_method", e.target.value) }}
                value={formdata.payment_method}
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
              <label htmlFor="">Validity</label>
              <input className='border h-9 rounded-[6px]'
                type='text'
                onChange={(e) => { handleChange("validity", e.target.value) }}
                value={formdata.validity}
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
                  onChange={(e) => { handleChange("item_no", e.target.value) }}
                  value={tableData.item_no}
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
            <div className='grid grid-cols-3  gap-4 m-4'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Price</label>
                <input className='border h-9 rounded-[6px] w-full'
                  type='number'
                  onChange={(e) => { handleChange("price", e.target.value) }}
                  value={tableData.price}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Discount</label>
                <input className='border h-9 rounded-[6px] w-full'
                  type='number'
                  onChange={(e) => { handleChange("discount", e.target.value) }}
                  value={tableData.discount}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Tax</label>
                <input className='border h-9 rounded-[6px] w-full'
                  type='number'
                  onChange={(e) => { handleChange("tax", e.target.value) }}
                  value={tableData.tax}
                />
              </div>
            </div>
            <div className='flex justify-end items-center my-3 px-2'>
              <div className='flex gap-5 items-center'>
                <Custombutton name={'Reset'} color={'black'} />
                <Custombutton name={'Add'} color={'yellow'} onclick={handleAdd} />
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
              <div className='flex flex-col gap-1'>
                <label htmlFor="">Delivery</label>
                <input className='border h-9 rounded-[6px]'
                  type='text'
                  onChange={(e) => { handleChange("delivery", e.target.value) }}
                  value={formdata.delivery}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center my-3'>
            <Custombutton name={'Save'} color={'blue'} onclick={createQuototion}/>
          </div>

        </div>
      </div>
      <div className='col-span-6  '>
        <div className='my-2 flex justify-end'>
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
              <p className='text-[16px] font-medium'>SHADOW TRADING W.L.L</p>
            </div>
            <div className='px-4 flex justify-end gap-2'>
              <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '> QUOTATION</p>
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
                  <p className='text-[#929292]'>{moment(formdata.document_date).format("DD/MM/YYYY") || ""}</p>
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
                  <p className='text-[#929292] break-word'>{formdata.mail}</p>
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
                  <p>Payment Method:</p>
                  <p className='text-[#929292] break-word'>{formdata.payment_method}</p>
                </div>
                <div>
                  <p> Currency:</p>
                  <p className='text-[#929292] break-word'>{formdata.currency}</p>
                </div>
              </div>
              <hr className='mx-4' />
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
              <hr className='mx-4' />
            </div>
          </div>

          {/* <div className="grid grid-cols-9 !text-[10px] w-[95%] mx-auto bg-[#f6f6f6] font-medium border p-2">
              <div className='flex justify-center'>S.No.</div>
              <div className='flex justify-center'>Item No.</div>
              <div className='!break-all'>Description</div>
              <div className='flex justify-center'>Quantity</div>
              <div className='flex justify-center'>Units</div>
              <div className='flex justify-center'>Price</div>
              <div className='flex justify-center'>Tax(%)</div>
              <div className='flex justify-center'>Discount(%)</div>
              <div className='flex justify-center'>Total</div>

            </div>
            {rows?.map((row: any, index: number) => {
              const total = (
                (parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) +
                ((parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) * (parseFloat(row.tax) || 0)) / 100 -
                ((parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) * (parseFloat(row.discount) || 0)) / 100
              ).toFixed(2);
              return (
                <div key={row.id || index} className="border-b w-[95%] mx-auto">
                  <div className="grid grid-cols-9 p-2 !text-[10px]">
                    <div className="flex justify-center !break-all">{index + 1}</div>
                    <div className="flex justify-center !break-all">{row.item_no}</div>
                    <div className="!break-all">{row.description}</div>
                    <div className="flex justify-center !break-all">{row.quantity}</div>
                    <div className="flex justify-center !break-all">{row.unit}</div>
                    <div className="flex justify-center !break-all">{row.price}</div>
                    <div className="flex justify-center !break-all">{row.tax}</div>
                    <div className="flex justify-center !break-all">{row.discount}</div>
                    <div className="flex justify-center !break-all">
                      {
                        total
                      }
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveRow(row.id)}
                    className="text-red-500 hover:text-red-700 flex justify-end"
                  >
                    <i className="pi pi-trash"></i>
                  </button>
                </div>
              )
            })} */}
          {/* <div className="grid grid-cols-9 p-2 border-b w-[95%] mx-auto !text-[10px]">
              <div></div>
              <div className='flex justify-center !break-all'>{tableData.item_no}</div>
              <div className='!break-all'>{tableData.description}</div>
              <div className='flex justify-center !break-all'>{tableData.quantity}</div>
              <div className='flex justify-center !break-all'>{tableData.unit}</div>
              <div className='flex justify-center !break-all'>{tableData.price}</div>
              <div className='flex justify-center !break-all'>{tableData.tax}</div>
              <div className='flex justify-center !break-all'>{tableData.discount}</div>
              <div className='flex justify-center !break-all'>{tableData.price}</div>
            </div> */}
          <div className='mx-3'>
            <Table columns={columns} rows={rowsWithIndex} onRemoveRow={handleRemoveRow} onEditRow={handleEditRow} />
          </div>
          <p className='flex justify-end w-[95%] mx-auto text-[12px] mt-2'>Sub Total:
            {rows?.reduce((sum: any, row: any) => {
              const total =
                (parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) +
                ((parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) * (parseFloat(row.tax) || 0)) / 100 -
                ((parseFloat(row.price) || 0) * (parseFloat(row.quantity) || 0) * (parseFloat(row.discount) || 0)) / 100;
              return sum + total;
            }, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>

  </>
)
}

export default page