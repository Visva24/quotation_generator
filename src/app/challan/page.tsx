
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
import { getMethod, patchMethod, postMethod } from '@/utils/api'
import { Response } from '@/utils/common'
import SavePopup from '../component/SavePopup'
import Popup from '../component/Popup'

const Page = () => {
  const Delivery = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type: string = searchParams.get("type") ?? "";
    const data_id = searchParams.get("id")
    const current_user_id = searchParams.get("current_user_id")
    console.log(current_user_id, "current_user_id")
    console.log(type, data_id)
    const cookies = parseCookies();
    const [docNo, setDocNo] = useState<any>();
    const [moveDoc, setMoveDoc] = useState<any>();
    const [updateId, setUpdateId] = useState<any>();
    const [tableValues, setTableValues] = useState<any>();
    const [savePop, setSavePop] = useState<boolean>();
    const [error, setError] = useState<boolean>(false);
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
        ref_date: "",
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
      { label: "Units", key: "units", align: "center", width: "80px" },
      { label: "Quantity", key: "quantity", align: "center", width: "80px" },

    ];

    const units = [
      { label: "Numbers", value: "nos" },
      { label: "Kilograms", value: "kg" },
      { label: "Liters", value: "L" },
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
    const handleAdd = async () => {
      if (!tableData.description || !tableData.quantity) {
        setError(true)
        return
      }
      await createChallanList();
      getTableValues();
      setTableData({
        item_number: "",
        description: "",
        quantity: "",
        unit: "",
      });
    };

    const getTableValues = async () => {
      console.log(editDocno, type, "editDocno");
      const document_no = type == "moveData" ? moveDoc : type == "revised" ? editDocno : docNo;
      const response: Response = await getMethod(`/delivery-challan/get-all-challan-list?doc_number=${document_no}`)
      console.log(response.data)
      setTableValues(response?.data)
    }

    const handleEditRow = (id: string | number) => {
      const selectedRow = tableValues.list.find((row: any) => row.id === id);
      setUpdateId(id)
      console.log(id, selectedRow)
      setTableData({
        item_number: selectedRow?.item_number,
        description: selectedRow?.description,
        quantity: selectedRow?.quantity,
        unit: selectedRow?.units,
      });

    };

    const handleRemoveRow = async (id: string | number) => {
      console.log(id)
      const response: Response = await getMethod(`/delivery-challan/delete-challan-list?record_id=${id}`)
      getTableValues()
    };

    const getEditValues = async () => {
      const response: Response = await getMethod(`/delivery-challan/get-delivery-challan-form-data?challan_id=${data_id}&type=revision`)
      const editData = response?.data;
      const format_date = new Date(editData?.doc_date);
      const refFormat_date = new Date(editData?.reference_date)
      console.log(editData, "editData");
      setFormdata({
        customer: editData?.customer_name || "",
        document_no: editData?.doc_number || "",
        customer_reference: editData?.customer_reference || "",
        contact_person: editData?.contact_person || "",
        contact_no: editData?.contact_number || "",
        document_date: format_date || "",
        ref_date: refFormat_date || "",
        email: editData?.email || "",
        address: editData?.address || "",
        remark_brand: editData?.remark_brand || "",
      })
      setEditDocno(editData?.doc_number)
    }

    const createEdit = async () => {
      const user_id = cookies.user_id
      const payload = {
        id: data_id,
        customer_name: formdata.customer || null,
        customer_reference_id: "",
        doc_number: editDocno ? editDocno : null,
        doc_date: formdata.document_date || null,
        contact_person: formdata.contact_person || null,
        email: formdata.email || null,
        contact_number: formdata.contact_no || null,
        customer_reference: formdata.customer_reference || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        reference_date: formdata.ref_date || null,
        created_user_id: user_id || null,
      }
      const response: Response = await postMethod(`/delivery-challan/update-delivery-challan-form`, payload)
      if (response.status == "success") {
        setSavePop(true)
        setTimeout(() => { setSavePop(false), router.push("/challan/history") }, 2000)
      }
    }


    const createDeliveryNote = async () => {
      if (!formdata.customer || !formdata.document_date || !formdata.ref_date) {
        setError(true)
        return;
      }
      const user_id = cookies.user_id
      const payload = {
        customer_name: formdata.customer || null,
        customer_reference_id: "",
        doc_number: docNo ? docNo : null,
        doc_date: formdata.document_date || null,
        contact_person: formdata.contact_person || null,
        email: formdata.email || null,
        contact_number: formdata.contact_no || null,
        customer_reference: formdata.customer_reference || null,
        address: formdata.address || null,
        remark_brand: formdata.remark_brand || null,
        reference_date: formdata.ref_date || null,
        created_user_id: user_id || null,
      }
      const response: Response = await postMethod("/delivery-challan/create-delivery-challan-form", payload)
      if (response.status == "success") {
        setSavePop(true)
        setTimeout(() => { setSavePop(false), router.push("/challan/history") }, 2000)
      }
    }

    const createChallanList = async () => {
      console.log(updateId)
      const payload = {
        doc_number: editDocno ? editDocno : docNo,
        challan_list: [
          {
            item_number: tableData.item_number || null,
            description: tableData.description || null,
            quantity: tableData.quantity || null,
            units: tableData.unit || null,
          }
        ],
        record_id: updateId ? updateId : null
      }
      const response: Response = await postMethod("/delivery-challan/save-or-update-challan-list", payload)
      console.log(response?.data)
      if (response.status == "success") {
        setUpdateId(null)
      }
    }
    const getDocumentNo = async () => {
      const response: Response = await getMethod("/quotation/generate-dynamic-doc-number?doc_type=delivery")
      if (response.status === "success") {
        setDocNo(response?.data)
      } else {
        console.log(response.message)
      }
    }

    const getMovedDataChallan = async () => {
      const response: Response = await getMethod(`/delivery-challan/move-forward-delivery-challan?quotation_id=${data_id}&current_user_id=${current_user_id}`)
      console.log(response?.data)
      const data = response?.data[0]
      setMoveDoc(data.doc_number)
      getTableValues()
      console.log(data.doc_number)
      const format_ref_date = data.reference_date ? new Date(data.reference_date) : null;
      const format_doc_date = data.doc_date ? new Date(data.doc_date) : null;
      if (response.status === "success") {
        setFormdata({
          customer: data.customer_name || "",
          document_date: format_doc_date,
          contact_person: data.contact_person || "",
          email: data.email || "",
          contact_no: data.contact_number || "",
          customer_reference: data.customer_reference || "",
          address: data.address || "",
          remark_brand: data.remark_brand || "",
          ref_date: format_ref_date,
        })
      }

    }

    const resetTempData = async () => {
      const response: Response = await getMethod(`/delivery-challan/reset-temp-Challan-list?doc_number=${docNo}`)
    }

    const handleYes = async () => {
      await resetTempData()
      router.push("/home")
    }

    useEffect(() => {
      getDocumentNo()
    }, [])

    useEffect(() => {
      if (moveDoc) {
        getTableValues();
        console.log("moveDoc get")
      }
    }, [moveDoc]);

    useEffect(() => {
      if (docNo) {
        getTableValues()
      }
    }, [docNo])

    useEffect(() => {
      if (type === "moveData") {
        getMovedDataChallan()
        getTableValues()
      } else if (type === "revised") {
        getEditValues()
      }
    }, [type])

    useEffect(() => {
      getTableValues()
    }, [editDocno])

    return (
      <>
        <div>
          <div className='grid grid-cols-12 mx-2.5 min-h-screen'>
            <div className='col-span-6 !text-[14px] overflow-y-scroll scroll-bar'>
              <p className='text-[18px] ml-2 font-medium mb-2'>Delivery Note Inputs</p>
              <div className='border mx-2 rounded-[8px] p-2'>
                <div className='grid grid-cols-2 px-2 gap-4'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="">Customer <span className='text-red-500'>*</span></label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange('customer', e.target.value) }}
                      value={formdata.customer ?? ""}
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
                    <label htmlFor="">Customer Reference</label>
                    <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                      type='text'
                      onChange={(e) => { handleChange("customer_reference", e.target.value) }}
                      value={formdata.customer_reference ?? ""}
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
                  <div className='flex flex-col gap-1 small-picker'>
                    <label htmlFor="">Reference Date <span className='text-red-500'>*</span></label>
                    <Calendar className='border h-9 rounded-[6px]' value={formdata.ref_date || null} onChange={(e) => handleChange("ref_date", e.value as Date)} />
                  </div>
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
                      <input className='border h-9 rounded-[6px] focus:border-[#F4AA08] focus:outline focus:outline-[#F4AA08] px-2'
                        type='text'
                        onChange={(e) => { handleChange("remark_brand", e.target.value) }}
                        value={formdata.remark_brand}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center my-3 gap-3'>
                  <Custombutton name={'Back'} color={'black'} onclick={() => { setShowPopup(true) }} />
                  <Custombutton name={type === "revised" ? 'Update' : 'Save'} color={'yellow'} onclick={type === "revised" ? createEdit : createDeliveryNote} />
                </div>

              </div>
            </div>
            <div className='col-span-6  overflow-y-auto '>
              <div className='flex justify-between items-center'>
                <p className='text-[18px] font-medium mb-2'> Delivery Note Preview:</p>
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
                    <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '> DELIVERY NOTE</p>
                  </div>
                  <div className='pl-10 mb-4'>
                    <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4 '>
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
                    <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4'>
                      <div className=''>
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
                        <p>Customer Reference:</p>
                        <p className='text-[#929292] !break-all'>{formdata.customer_reference}</p>
                      </div>
                      <div>
                        <p> Reference Date:</p>
                        <p className='text-[#929292] !break-all'>{formdata.ref_date ? moment(formdata.ref_date).format("DD/MM/YYYY") : ""}</p>
                      </div>
                      <div>
                        <p>Address:</p>
                        <p className='text-[#929292] !break-all'>{formdata.address}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />

                  </div>
                </div>
                <div className='mx-3 mt-4'>
                  <Table columns={columns} rows={tableValues?.list} onRemoveRow={handleRemoveRow} onEditRow={handleEditRow} />
                </div>
                <div className='mt-3 mx-3 flex items-center gap-1'>
                  <p>Remarks:</p>
                  <p className='text-[#929292] !break-all'>{formdata.remark_brand}</p>
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
      </>
    )
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Delivery />
      </Suspense>
    </>
  )
}

export default Page