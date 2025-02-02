'use client';
import React, { Suspense, useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Custombutton from '../component/Custombutton'
import Image from 'next/image'
import moment from 'moment'
import Table from '../component/Table'
import { getMethod, postMethod } from '@/utils/api'
import { Response } from '@/utils/common'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseCookies } from 'nookies'

const Page = () => {
  const Quotation = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type: string = searchParams.get("type") ?? "";
    console.log(type)
    const data_id = searchParams.get("id");
    const cookies = parseCookies()
    const [tableValues, setTableValues] = useState<any>()
    const [docNo, setDocNo] = useState<any>()
    const [updateId, setUpdateId] = useState<any>()
    const [revisedDoc, setRevisedDoc] = useState<string>();
    const [revisedData, setRevisedData] = useState<any>();
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
      item_number: "",
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
    const handleAdd = async () => {
      await createQuototionList();
      getTableValues();
      setTableData({
        item_number: "",
        description: "",
        quantity: "",
        unit: "",
        price: "",
        discount: "",
        tax: "",
      });
    };


    const columns: any = [
      { label: "S.No.", key: "serial_no", align: "center", width: "60px" },
      { label: "Item No.", key: "item_number", align: "center", width: "100px" },
      { label: "Description", key: "description", align: "left", width: "300px" },
      { label: "Quantity", key: "quantity", align: "center", width: "80px" },
      { label: "Units", key: "units", align: "center", width: "80px" },
      { label: "Price", key: "price", align: "center", width: "100px" },
      { label: "Tax(%)", key: "tax", align: "center", width: "100px" },
      { label: "Discount(%)", key: "discount", align: "center", width: "100px" },
      { label: "Total", key: "amount", align: "center", width: "100px" },
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

    const handleRemoveRow = async (id: string | number) => {
      console.log(id)
      const response: Response = await getMethod(`/quotation/delete-quotation-list?record_id=${id}`)
      getTableValues()
    };

    const handleEditRow = (id: string | number) => {
      const selectedRow = tableValues.list.find((row: any) => row.id === id);
      setUpdateId(id)
      console.log(id, selectedRow)
      setTableData({
        item_number: selectedRow?.item_number,
        description: selectedRow?.description,
        quantity: selectedRow?.quantity,
        unit: selectedRow?.units,
        price: selectedRow?.price,
        discount: selectedRow?.discount,
        tax: selectedRow?.tax,
      });

    };

    const getDocumentNo = async () => {
      const response: Response = await getMethod("/quotation/generate-dynamic-doc-number?doc_type=quotation")
      console.log(response.data)
      setDocNo(response?.data)
    }
    const getReviseDocNo = async () => {
      const response: Response = await getMethod(`/quotation/generate-revision-doc-number?record_id=${data_id}`)
      await setRevisedDoc(response.data)
      console.log(response.data)
    }

    const getTableValues = async () => {
      const docNumber = type === "revised" ? revisedDoc : docNo;
      const response: Response = await getMethod(`/quotation/get-all-quotation-list?doc_number=${docNumber}`)
      console.log(response.data)
      setTableValues(response?.data)
    }

    const getRevisedData = async () => {
      const response: Response = await getMethod(`/quotation/get-quotation-form-data?quotation_id=${data_id}&type=${type}`)
      const data = response.data;
      console.log(data)
      if (response.status === "success") {
        setRevisedData(data)
        setFormdata({
          customer: data.customer_name,
          document_no: data.doc_number,
          customer_reference: data.customer_reference,
          contact_person: data.contact_person,
          contact_no: data.contact_number,
          document_date: data.doc_date,
          currency: data.currency,
          payment_method: data.payment_mode,
          email: data.email,
          address: data.address,
          validity: data.quotation_validity,
          remark_brand: data.remark_brand,
          delivery: data.delivery,
        });
        await getReviseDocNo()
      }

    }

    const createQuototion = async () => {
      const user_id = cookies.user_id
      const payload = {
        customer_name: formdata.customer || null,
        customer_reference_id: "",
        doc_number: docNo || null,
        doc_date: formdata.document_date || null,
        contact_person: formdata.contact_person || null,
        email: formdata.email || null,
        contact_number: formdata.contact_no || null,
        customer_reference: formdata.customer_reference || null,
        payment_mode: formdata.payment_method || null,
        currency: formdata.currency || null,
        quotation_validity: formdata.validity || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        delivery: formdata.delivery || null,
        created_user_id: user_id || null,
        total_discount: 0,
        total_tax: 0
      }
      const response: Response = await postMethod("/quotation/create-quotation-form", payload)
      if (response.status == "success") {
        router.push("/quotation/history")
      }
    }

    const createQuototionList = async () => {
      const payload = {
        doc_number: type == "revised" ? revisedDoc : docNo,
        Quotation_list: [
          {
            item_number: tableData.item_number,
            description: tableData.description,
            quantity: tableData.quantity,
            units: tableData.unit,
            price: tableData.price,
            discount: tableData.discount,
            tax: tableData.tax
          }
        ],
        record_id: updateId ? updateId : null
      }
      console.log(payload);
      const response: Response = await postMethod("/quotation/save-or-update-quotation-list", payload)
      console.log(response?.data)
      if (response.status == "success") {
        setUpdateId(null)
      }
    }

    const createReviseData = async () => {
      const user_id = cookies.user_id
      const payload = {
        customer_name: formdata.customer || null,
        customer_reference_id: "",
        doc_number: revisedDoc || null,
        doc_date: formdata.document_date || null,
        contact_person: formdata.contact_person || null,
        email: formdata.email || null,
        contact_number: formdata.contact_no || null,
        customer_reference: formdata.customer_reference || null,
        payment_mode: formdata.payment_method || null,
        currency: formdata.currency || null,
        quotation_validity: formdata.validity || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        delivery: formdata.delivery || null,
        created_user_id: user_id || null,
        total_discount: 0,
        total_tax: 0
      }
      const response: Response = await postMethod(`/quotation/update-quotation-form?id=${data_id}`, payload)
      if (response.status == "success") {
        router.push("/quotation/history")
      }
    }


    useEffect(() => {
      getDocumentNo()
    }, [])

    useEffect(() => {
      getRevisedData()
    }, [type === "revised"])

    useEffect(() => {
      if (revisedDoc) {
        getTableValues();
      }
    }, [revisedDoc]);
    return (
      <>
        <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
          <div className='col-span-6 !text-[14px] py-4 overflow-y-scroll '>
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
                  <input
                    className='border h-9 rounded-[6px]'
                    type='text'
                    onChange={(e) => { handleChange("document_no", e.target.value) }}
                    value={type == "revised" ? revisedDoc || "" : docNo || ""}
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
                    options={currency}
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
              <div className='flex justify-center items-center my-3 gap-3'>
                <Custombutton name={'Back'} color={'black'} onclick={() => { router.push("/home") }} />
                {type === "revised" ? <Custombutton name={'Revise'} color={'blue'} onclick={createReviseData} /> : <Custombutton name={'Save'} color={'blue'} onclick={createQuototion} />}
              </div>

            </div>
          </div>
          <div className='col-span-6  '>
            <div className='my-2 flex justify-between items-center'>
              <p className='text-[18px] font-medium'> Quotation Preview:</p>
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
                      <p className='text-[#929292]'>{formdata.document_no || docNo}  </p>
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


              <div className='mx-3'>
                <Table columns={columns} rows={tableValues?.list} onRemoveRow={handleRemoveRow} onEditRow={handleEditRow} />
              </div>
              <div className='mt-3 flex justify-between mx-4 text-[12px]'>
                <div className='flex flex-col gap-2'>
                  <p>Remark Brand: <span>{formdata.remark_brand}</span></p>
                  <p>Delivery: <span>{formdata.delivery}</span></p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className=' text-[12px]'>Sub Total:{tableValues?.sub_total}</p>
                  <p>DIS:{tableValues?.total_discount}</p>
                  <p>TAX:{tableValues?.total_tax}</p>
                  <p>Total:{tableValues?.grand_total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Quotation />
    </Suspense>
  )
}

export default Page