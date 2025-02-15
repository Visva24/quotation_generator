"use client"
import Custombutton from '@/app/component/Custombutton';
import Loader from '@/app/component/Loader';
import Table from '@/app/component/Table';
import { getMethod } from '@/utils/api';
import { Response } from '@/utils/common';
import { downloadPDF } from '@/utils/download';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const cookies = parseCookies();
  const columns: any = [
    { label: "S.No.", key: "serial_no", align: "center", width: "60px" },
    { label: "Item No.", key: "item_number", align: "center", width: "100px" },
    { label: "Description", key: "description", align: "left", width: "300px" },
    { label: "Units", key: "units", align: "center", width: "80px" },
    { label: "Quantity", key: "quantity", align: "center", width: "80px" },
  ];
  const [history, setHistory] = useState<any>();
  const [sideBar, setSideBar] = useState<any>();
  const [viewData, setViewData] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const getQuotationHistory = async () => {
    const response: Response = await getMethod(`/delivery-challan/get-delivery-challan-form-history`)
    console.log(response?.data)
    setHistory(response?.data)
  }

  const getViewData = async (id: number) => {
    const response: Response = await getMethod(`/delivery-challan/get-delivery-challan-form-data?challan_id=${id}`)
    console.log(response.data)
    setViewData(response.data)
  }

  const downLoadPdf = async (id: number) => {
    setLoader(true)
    const response: Response = await getMethod(`/delivery-challan/download-delivery-challan-template?id=${id}`)
    if (response.status === "success") {
      setTimeout(() => { downloadPDF(response.data), setLoader(false) })
    }

  }

  const Sideheader = () => {
    return (
      <div className=" flex items-center justify-between !w-full bg-[#000] h-[70px] px-2 !m-0">
        <h2 className="text-lg font-semibold text-[#fff]">Delivery Note Details</h2>
        <div className='flex gap-2 items-center'>
          <Custombutton name={'Download'} color={'blue'} onclick={() => downLoadPdf(viewData?.id)} />
          <i className='pi pi-times text-[#fff]' onClick={() => { setSideBar(false) }}></i>
        </div>
      </div>
    )
  }

  useEffect(() => {
    getQuotationHistory()
  }, [])
  return (
    <>
      {
        (history?.length > 0) ?
          history?.map((data: any, index: any) => (
            <div key={index} className='p-[20px] text-[14px] rounded-[12px] bg-[#F6F6F6] shadow-lg mx-4 mb-3 group'>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3'>
                    <p className='px-[10px] py-[4px] rounded-full text-[white] bg-gradient-to-r from-[#08A5F4] to-[#005DBA]'>Delivery Notes</p>
                    <p className='flex gap-2 items-center text-[18px]'><span className=' text-[#F4AA08] text-[16px]'>{data?.symbol}</span>{data?.total_amount}</p>
                  </div>
                  <div className='flex gap-3'>
                    <p className='flex gap-2 items-center'><i className='pi pi-calendar text-[#F4AA08] text-[16px]'></i>{data?.Date}</p> |
                    <p className='flex gap-2 items-center'><i className='pi pi-file text-[#F4AA08] text-[16px]'></i>{data?.document_number}</p>
                  </div>
                </div>
                <div className=''>
                  <Custombutton name={'View Detail'} color={'blue'} onclick={() => { getViewData(data?.id), setSideBar(true) }} />
                </div>
              </div>
              <div className='mt-2 text-[14px] max-h-0 group-hover:max-h-[500px] overflow-hidden transition-all duration-300'>
                <hr className='my-1 border-[1px] border-[#9f9f9f]' />
                <div className='flex justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                    <div className='rounded-full w-10 h-10 flex items-center justify-center text-[white] bg-[#63a1ee]'>
                      <p>{data?.created_by?.avatar_value}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-[12px]'>Created by</p>
                      <p className='text-[14px]'>{data?.created_by?.user_name}</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Customer</p>
                    <p>{data?.customer_name}</p>
                  </div>
                </div>
              </div>
            </div>
          )) :
          <>
            <div className='flex justify-center'>
              <div className='my-[30px]'>
                <Image src={'/images/nodata.svg'} alt={''} height={550} width={550} />
              </div>
            </div>
          </>
      }

      {
        sideBar &&
        <>
          <Sidebar header={<Sideheader />} visible={sideBar} position="right" showCloseIcon={false} onHide={() => setSideBar(false)} className='w-[800px] custom-sidebar'>
            <div>
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
                    <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '>DELIVERY NOTE</p>
                  </div>
                  <div className='pl-10 mb-4'>
                    <div className='grid grid-cols-3 text-[12px] px-4 my-4 '>
                      <div className='flex flex-col !break-all'>
                        <p>Customer:</p>
                        <p className='text-[#929292] '>{viewData?.customer_name}</p>
                      </div>
                      <div className='flex flex-col  !break-all'>
                        <p>Document No:</p>
                        <p className='text-[#929292]'>{viewData?.doc_number}  </p>
                      </div>
                      <div className='flex flex-col !break-all'>
                        <p>Document Date:</p>
                        <p className='text-[#929292]'>{viewData?.doc_date ? viewData?.doc_date : ""}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />
                    <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                      <div className='!break-all'>
                        <p>Contact Person:</p>
                        <p className='text-[#929292] break-word'>{viewData?.contact_person}</p>
                      </div>
                      <div>
                        <p>E-mail:</p>
                        <p className='text-[#929292] break-word'>{viewData?.email}</p>
                      </div>
                      <div>
                        <p>Contact No.:</p>
                        <p className='text-[#929292] break-word'>{viewData?.contact_number}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />
                    <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                      <div>
                        <p>Contact Reference:</p>
                        <p className='text-[#929292] break-word'>{viewData?.customer_reference}</p>
                      </div>
                      <div>
                        <p> Reference Date:</p>
                        <p className='text-[#929292] break-word'>{viewData?.reference_date}</p>
                      </div>
                      <div>
                        <p>Remarks:</p>
                        <p className='text-[#929292] break-word'>{viewData?.remark_brand}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />
                    <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                      <div>
                        <p>Address:</p>
                        <p className='text-[#929292] break-word'>{viewData?.address}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />
                  </div>
                </div>
                <div className='mx-3'>
                  <Table columns={columns} rows={viewData?.delivery_items} />
                </div>
              </div>
              {
                loader &&
                <Loader />
              }
            </div>
          </Sidebar>
        </>
      }
    </>
  )
}

export default Page