
'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Custombutton from '../component/Custombutton'
import Image from 'next/image'
import moment from 'moment'
import Table from '../component/Table'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseCookies } from 'nookies'
import { getMethod, postMethod } from '@/utils/api'
import { Response } from '@/utils/common'
import SavePopup from '../component/SavePopup'
import Popup from '../component/Popup'



const Page = () => {
  const Invoice = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type: string = searchParams.get("type") ?? "";
    const data_id = searchParams.get("id")
    const current_user_id = searchParams.get("current_user_id")
    const cookies = parseCookies();
    const [docNo, setDocNo] = useState<any>();
    const [savePop, setSavePop] = useState<boolean>();
    const [tableValues, setTableValues] = useState<any>()
    const [updateId, setUpdateId] = useState<any>();
    const [moveDoc, setMoveDoc] = useState<any>();
    const [error, setError] = useState<boolean>(false);
    const [errorone, setErrorOne] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [editDocno, setEditDocno] = useState<any>();
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
        dn_number: "",
        ref_date: "",
        delivery: "",
        sales_emp: "",
        pay_terms: "",
        over_all_discount: ""
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
      { label: "Price", key: "price", align: "center", width: "100px" },
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
        label: "Credit",
        value: "Credit"
      },
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
      { label: "Carton", value: "ctn" },
      { label: "Meters", value: "m" },
      { label: "Packets", value: "pkt" },
      { label: "Sets", value: "set" },
      { label: "Pieces", value: "pcs" },
      { label: "Rolls", value: "roll" },
      { label: "Length", value: "length" },  
    ];

    const handleChange = (key: string, value: any) => {
      setFormdata({ ...formdata, [key]: value })
      setTableData({ ...tableData, [key]: value })
    }
    const getTableValues = async () => {
      const document_no = type == "moveData" ? moveDoc : type == "revised" ? editDocno : docNo;
      const currency = formdata.currency ? formdata.currency : null;
      const total_discount = formdata.over_all_discount ? formdata.over_all_discount : 0;
      const response: Response = await getMethod(`/sales-invoice/get-all-sales-invoice-list?doc_number=${document_no}&currency=${currency}&total_discount=${total_discount}`)
      console.log(response.data)
      setTableValues(response?.data)
    }
    const handleAdd = async () => {
      if (!tableData.description || !tableData.quantity || !tableData.price) {
        setError(true)
        return
      }
      await createInvoiceList();
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

    const handleRemoveRow = async (id: string | number) => {
      console.log(id)
      const response: Response = await getMethod(`/sales-invoice/delete-sales-invoice-list?record_id=${id}`)
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

    const createInvoiceList = async () => {
      const payload = {
        doc_number: editDocno ? editDocno : docNo,
        invoice_list: [
          {
            item_number: tableData.item_number || null,
            description: tableData.description || null,
            quantity: tableData.quantity || null,
            units: tableData.unit || null,
            price: tableData.price || null,
            discount: tableData.discount || null,
          }
        ],
        record_id: updateId ? updateId : null
      }
      console.log(payload);
      const response: Response = await postMethod("/sales-invoice/save-or-update-invoice-list", payload)
      console.log(response?.data)
      if (response.status == "success") {
        setUpdateId(null)
      }
    }

    const getDocumentNo = async () => {
      const response: Response = await getMethod("/quotation/generate-dynamic-doc-number?doc_type=sales")
      if (response.status === "success") {
        setDocNo(response?.data)
      } else {
        console.log(response.message)
      }
    }

    const createInvoice = async () => {
      if (!formdata.customer || !formdata.document_date ||  !formdata.sales_emp) {
        setError(true)
        return;
      }
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
        // payment_mode: formdata.payment_method || null,
        currency: formdata.currency || null,
        quotation_validity: formdata.validity || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        delivery: formdata.delivery || null,
        created_user_id: user_id || null,
        dn_number: formdata.dn_number || null,
        reference_date: formdata.ref_date || null,
        sales_employee: formdata.sales_emp || null,
        payment_terms: formdata.pay_terms || null,
        total_discount:  formdata.over_all_discount ?  formdata.over_all_discount : 0 || null
      }
      const response: Response = await postMethod("/sales-invoice/create-sales-invoice-form", payload)
      if (response.status == "success") {
        console.log(response.message)
        setSavePop(true)
        setTimeout(() => { setSavePop(false), router.push("/invoice/history") }, 2000)
      }
    }

    const createEdit = async() => {
      if (!formdata.customer || !formdata.document_date || !formdata.sales_emp) {
        setError(true)
        return;
      }
      const user_id = cookies.user_id
      const payload = {
        id:data_id,
        customer_name: formdata.customer || null,
        customer_reference_id: "",
        doc_number: editDocno ? editDocno : null,
        doc_date: formdata.document_date || null,
        contact_person: formdata.contact_person || null,
        email: formdata.email || null,
        contact_number: formdata.contact_no || null,
        customer_reference: formdata.customer_reference || null,
        // payment_mode: formdata.payment_method || null,
        currency: formdata.currency || null,
        quotation_validity: formdata.validity || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        delivery: formdata.delivery || null,
        created_user_id: user_id || null,
        dn_number: formdata.dn_number || null,
        reference_date: formdata.ref_date || null,
        sales_employee: formdata.sales_emp || null,
        payment_terms: formdata.pay_terms || null,
        total_discount: formdata.over_all_discount ?  formdata.over_all_discount : 0 || null
      }
      const response: Response = await postMethod("/sales-invoice/update-sales-invoice-form", payload)
      if (response.status == "success") {
        console.log(response.message)
        setSavePop(true)
        setTimeout(() => { setSavePop(false), router.push("/invoice/history") }, 2000)
      }
    }

    const getEditInvoice = async () => {
      const response = await getMethod(`/sales-invoice/get-sales-invoice-form-data?Invoice_id=${data_id}&type=revision`)
      const editData = response?.data;
      const format_date = new Date(editData?.doc_date);
      setFormdata({
        customer: editData?.customer_name || "",
        customer_reference: editData?.customer_reference || "",
        contact_person: editData?.contact_person || "",
        contact_no: editData?.contact_number || "",
        document_date: format_date || "",
        currency: editData?.currency || "",
        // payment_method: editData?.payment_mode || "",
        email: editData?.email || "",
        address: editData?.address || "",
        validity: editData?.quotation_validity || "",
        remark_brand: editData?.remark_brand || "",
        delivery: editData?.delivery || "",                                                         
        sales_emp:editData?.sales_employee || "",
        pay_terms:editData?.payment_terms || "",
        dn_number:editData?.dn_number || "",
        over_all_discount:editData?.total_discount || ""
      })
      setEditDocno(editData?.doc_number)
    }

    const getMovedDataInvoice = async () => {
      const response: Response = await getMethod(`/sales-invoice/move-forward-sales-invoice?quotation_id=${data_id}&current_user_id=${current_user_id}`)
      console.log(response?.data)
      const data = response?.data[0]
      setMoveDoc(data?.doc_number)
      getTableValues()
      console.log(data?.doc_number)
      const format_doc_date = data?.doc_date ? new Date(data?.doc_date) : null;
      if (response.status === "success") {
        setFormdata({
          customer: data?.customer_name || "",
          document_no: data?.doc_number || "",
          customer_reference: data?.customer_reference || "",
          contact_person: data?.contact_person || "",
          contact_no: data?.contact_number || "",
          document_date: format_doc_date || "",
          currency: data?.currency || "",
          payment_method: data?.payment_mode || "",
          email: data?.email || "",
          address: data?.address || "",
          validity: data?.quotation_validity || "",
          remark_brand: data?.remark_brand || "",
          delivery: data?.delivery || "",
          over_all_discount: data?.total_discount || "",
        })
      }

    }

    const resetTempData = async () => {
      const response: Response = await getMethod(`/sales-invoice/reset-temp-sales-invoice-list?doc_number=${docNo}`)
    }

    const handleYes = async () => {
      await resetTempData()
      router.push("/home")
    }

    useEffect(() => {
      getDocumentNo()
    }, [])

    // useEffect(() => {
    //   if (docNo) {
    //     getTableValues()
    //   }
    // }, [docNo])

    // useEffect(() => {
    //   if (moveDoc) {
    //     getTableValues();
    //   }
    // }, [moveDoc]);

    // useEffect(() => {
    //   if (type === "moveData") {
    //     getMovedDataInvoice()
    //     getTableValues()
    //   } else if (type === "revised") {
    //     getEditInvoice()
    //   }
    // }, [type])
    // useEffect(() => {
    //   getTableValues()
    // }, [editDocno])

    // useEffect(() => { getTableValues() }, [formdata.currency])

    useEffect(() => {
      if (docNo || moveDoc || editDocno || formdata.currency || formdata.over_all_discount) {
        getTableValues();
      }
    }, [docNo, moveDoc, editDocno, formdata.currency ,formdata.over_all_discount]);
    
    useEffect(() => {
      if (type === "moveData") {
        getMovedDataInvoice();
        getTableValues();
      } else if (type === "revised") {
        getEditInvoice();
      }
    }, [type]);
    return (
      <div>
        <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
          <div className='col-span-6 !text-[14px] overflow-y-scroll scroll-bar'>
            <p className='text-[18px] ml-2 font-medium mb-2'>Invoice Inputs</p>
            <div className='border mx-2 rounded-[8px] p-2'>
              <div className='grid grid-cols-2 px-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Customer <span className='text-red-500'>*</span></label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange('customer', e.target.value) }}
                    value={formdata.customer}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Document No <span className='text-red-500'>*</span></label>
                  <input
                    className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("document_no", e.target.value) }}
                    value={editDocno ? editDocno : docNo ?? ""}
                    disabled
                  />
                </div>
                <div className='flex flex-col gap-1 small-picker'>
                  <label htmlFor="">Document Date <span className='text-red-500'>*</span></label>
                  <Calendar className='border h-9 rounded-[6px]' value={formdata.document_date || null} onChange={(e) => handleChange("document_date", e.value as Date)} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Contact person</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("contact_person", e.target.value) }}
                    value={formdata.contact_person ?? ""}
                  />
                </div>
              </div>
              <div className='px-2 my-2'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">E-mail</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("email", e.target.value) }}
                    value={formdata.email ?? ""}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 px-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Contact No</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='number'
                    onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleChange("contact_no", value);
                      }
                    }}
                    value={formdata.contact_no ?? ""}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Address</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("address", e.target.value) }}
                    value={formdata.address ?? ""}
                  />
                </div>

                {/* <div className='flex flex-col gap-1 '>
                  <label htmlFor="">Payment Method <span className='text-red-500'>*</span></label>
                  <Dropdown className='border h-9 rounded-[6px] custom-dropdown'
                    options={paymentDropdown}
                    onChange={(e) => { handleChange("payment_method", e.target.value) }}
                    value={formdata.payment_method ?? ""}
                  />
                </div> */}
               
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Customer Reference</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("customer_reference", e.target.value) }}
                    value={formdata.customer_reference ?? ""}
                  />
                </div>
                {/* <div className='flex flex-col gap-1'>
                  <label htmlFor="">Reference Date</label>
                  <Calendar className='border h-9 rounded-[6px]' value={formdata.ref_date || null} onChange={(e) => handleChange("ref_date", e.value as Date)} />
                </div> */}
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">DN Number</label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("dn_number", e.target.value) }}
                    value={formdata.dn_number ?? ""}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="">Currency <span className='text-red-500'>*</span></label>
                  <Dropdown className='border h-9 rounded-[6px]'
                    options={currency}
                    onChange={(e) => { handleChange("currency", e.target.value) }}
                    value={formdata.currency ?? ""}
                  />
                </div>
                {/* <div className='flex flex-col gap-1'>
                  <label htmlFor="">Validity <span className='text-red-500'>*</span></label>
                  <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                    type='text'
                    onChange={(e) => { handleChange("validity", e.target.value) }}
                    value={formdata.validity ?? ""}
                  />
                </div> */}
              </div>
            </div>
            <div>
              <p className='text-[18px] ml-2 mt-5 mb-2 font-medium'>Table Inputs</p>
              <div className='border mx-2 rounded-[8px] p-2'>
                <div className='grid grid-cols-2 px-2 gap-4'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Item No.</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("item_number", e.target.value) }}
                      value={tableData.item_number ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Description <span className='text-red-500'>*</span></label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("description", e.target.value) }}
                      value={tableData.description ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Quantity <span className='text-red-500'>*</span></label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='number'
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                      onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                      onChange={(e) => { handleChange("quantity", e.target.value) }}
                      value={tableData.quantity ?? ""}
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
                      value={tableData.unit ?? ""}
                    />
                  </div>


                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Price <span className='text-red-500'>*</span></label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2 w-full'
                      type='number'
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                      onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                      onChange={(e) => { handleChange("price", e.target.value) }}
                      value={tableData.price ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Discount</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2 w-full'
                      type='number'
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                      onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                      onChange={(e) => { handleChange("discount", e.target.value) }}
                      value={tableData.discount ?? ""}
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
                    <label htmlFor="">Sales Employee <span className='text-red-500'>*</span></label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("sales_emp", e.target.value) }}
                      value={formdata.sales_emp ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Payment Terms</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("pay_terms", e.target.value) }}
                      value={formdata.pay_terms ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Remarks</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("remark_brand", e.target.value) }}
                      value={formdata.remark_brand ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Delivery</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("delivery", e.target.value) }}
                      value={formdata.delivery ?? ""}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Overall Discount</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='number'
                      onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                      onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                      onChange={(e) => { handleChange("over_all_discount", e.target.value) }}
                      value={formdata.over_all_discount ?? ""}
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center my-3 gap-3'>
                <Custombutton name={'Back'} color={'black'} onclick={() => { setShowPopup(true) }} />
                <Custombutton name={type === "revised" ? 'Update' : 'Save'} color={'yellow'} onclick={type === "revised" ? createEdit : createInvoice} />
              </div>

            </div>
          </div>
          <div className='col-span-6  '>
            <div className='flex justify-start items-center'>
              <p className='text-[18px] font-medium mb-2'> Invoice Preview:</p>
              {/* <Custombutton name={'Download'} color={'blue'} /> */}
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
                  <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '>SALES INVOICE</p>
                </div>
                <div className='pl-10 mb-4'>
                  <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4 '>
                    <div className='flex flex-col !break-all'>
                      <p>Customer:</p>
                      <p className='text-[#929292] '>{formdata.customer}</p>
                    </div>
                    <div className='flex flex-col  !break-all'>
                      <p>Document No:</p>
                      <p className='text-[#929292]'>{editDocno ? editDocno : docNo}  </p>
                    </div>
                    <div className='flex flex-col !break-all'>
                      <p>Document Date:</p>
                      <p className='text-[#929292]'>{formdata.document_date ? moment(formdata.document_date).format("DD/MM/YYYY") : ""}</p>
                    </div>
                  </div>
                  <hr className='mx-4' />
                  <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4'>
                    <div className='!break-all'>
                      <p>Contact Person:</p>
                      <p className='text-[#929292] !break-all'>{formdata.contact_person}</p>
                    </div>
                    <div>
                      <p>E-mail:</p>
                      <p className='text-[#929292] !break-all'>{formdata.email}</p>
                    </div>
                    <div>
                      <p>Contact No.:</p>
                      <p className='text-[#929292] !break-all'>{formdata.contact_no}</p>
                    </div>
                  </div>
                  <hr className='mx-4' />
                  <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4'>
                    <div>
                      <p>Address:</p>
                      <p className='text-[#929292] !break-all'>{formdata.address}</p>
                    </div>
                    <div>
                      <p>Customer Reference:</p>
                      <p className='text-[#929292] !break-all'>{formdata.customer_reference}</p>
                    </div>
                    <div>
                      <p>DN Number:</p>
                      <p className='text-[#929292] !break-all'>{formdata.dn_number}</p>
                    </div>
                  </div>
                  <hr className='mx-4' />
                </div>
              </div>
              <div className='mx-3 mt-4'>
                <Table columns={columns} rows={tableValues?.list} onRemoveRow={handleRemoveRow} onEditRow={handleEditRow} />
              </div>
              <div className='mt-3 flex justify-between mx-4 text-[12px]'>
                <div className='flex flex-col gap-2'>
                  <p>Sales Employee: <span>{formdata.sales_emp}</span></p>
                  <p>Payment Terms: <span>{formdata.pay_terms}</span></p>
                  <p>Remarks: <span>{formdata.remark_brand}</span></p>
                  <p>Delivery: <span>{formdata.delivery}</span></p>
                  <p>Amount in Words: <span>{tableValues?.amount_in_words}</span></p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className=' text-[12px]'>Sub Total:{tableValues?.sub_total}</p>
                  <p>Overall Discount:{ formdata.over_all_discount ? formdata.over_all_discount  :  tableValues?.total_discount || 0}</p>
                  <p>Total:{tableValues?.grand_total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          savePop &&
          <SavePopup message={'Saved Successfully'} />
        }
        {
          showPopup &&
          <>
            <Popup message={'Are you sure you want to navigate to a different page? Any unsaved changes in your form will be discarded.'} handleCancel={() => { setShowPopup(false) }} handleRedirect={handleYes} />
          </>
        }
        {
          error &&
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white   rounded-[8px] shadow-lg min-w-[250px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                <div className='flex flex-col gap-4 justify-center items-center p-8'>
                  <Image src={'/images/fill-mandatory.svg'} alt={''} height={160} width={180} />
                  <p>Fill the Mandatory Fields!!!</p>
                </div>
                <div className='w-full rounded-b-[8px]'>
                  <p className='flex justify-center items-center text-[#F4AA08] bg-[#FFF0CF] p-3 cursor-pointer rounded-b-[8px]' onClick={() => { setError(false) }}>Back</p>
                </div>
              </div>
            </div>
          </>
        }
        {
          errorone &&
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white   rounded-[8px] shadow-lg min-w-[250px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                <div className='flex flex-col gap-4 justify-center items-center p-8'>
                  <Image src={'/images/fill-mandatory.svg'} alt={''} height={160} width={180} />
                  <p>Fill the currency before add!!!</p>
                </div>
                <div className='w-full rounded-b-[8px]'>
                  <p className='flex justify-center items-center text-[#F4AA08] bg-[#FFF0CF] p-3 cursor-pointer rounded-b-[8px]' onClick={() => { setErrorOne(false) }}>Back</p>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    )
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Invoice />
      </Suspense>
    </>
  )
}

export default Page