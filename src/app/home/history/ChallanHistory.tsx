import Custombutton from '@/app/component/Custombutton';
import Loader from '@/app/component/Loader';
import Table from '@/app/component/Table';
import { getMethod, postMethod } from '@/utils/api';
import { Response } from '@/utils/common';
import { downloadPDF } from '@/utils/download';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Calendar } from 'primereact/calendar';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react'

const ChallanHistory = () => {
  const router = useRouter();
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
  const getChallanHistory = async () => {
    let payload = {
      filter_data: {
        date: null
      }
    }
    const response: Response = await postMethod(`/delivery-challan/get-delivery-challan-form-history`, payload)
    console.log(response?.data)
    setHistory(response?.data)
  }

  const editChallan = (id: number | string) => {
    router.push(`/challan?type=revised&id=${id}`)
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

  const Filter = () => {
    const [toggleDrop, setToggleDrop] = useState<boolean>(false);
    const [isFilterApplied, setIsFilterApplied] = useState<any>();
    const [filterDate, setFilterDate] = useState<any>({
      filter_date: ""
    })

    const handleFilterChange = (key: string, value: any) => {
      setFilterDate({ ...filterDate, [key]: value })
    }

    const handleToggle = () => {
      setToggleDrop(!toggleDrop);
    };

    const handleApplyFilter = async () => {
      let payload = {
        filter_data: {
          date: moment(filterDate?.filter_date).format('YYYY/MM/DD') || null,
        }
      }
      const response: Response = await postMethod(`/delivery-challan/get-delivery-challan-form-history`, payload)
      setHistory(response?.data)
      setIsFilterApplied(true)
    }
    const handleClearFilter = async () => {
      setFilterDate({ filter_date: null });
      setIsFilterApplied(false);
      getChallanHistory();
    }

    return (
      <div className="relative">
        <div
          className="inline-flex items-center gap-2 text-[14px] px-2 py-[2px] border-[#222222] border rounded-full cursor-pointer bg-white"
          onClick={handleToggle}
        >
          <div className="w-7 h-7 rounded-full bg-[#F4AA08] flex justify-center items-center">
            <img className="w-5 h-5" src="/images/filter-white.svg" alt="filter" />
          </div>
          <p>Filter</p>
        </div>
        {toggleDrop && (
          <div
            className="absolute right-[0px] top-full mt-2 w-[325px] bg-white shadow-xl rounded-lg p-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <img src="/images/filter.svg" alt="filter" className="w-5 h-5" />
                <p>Filter</p>
              </div>
              {/* {isFilterApplied && <p className="text-gray-600">Filter Applied</p>} */}
              <div className='w-6 h-6 rounded-full border flex items-center justify-center'>
                <i className='pi pi-times text-[12px] text-[#000]' onClick={() => setToggleDrop(false)}></i>
              </div>
            </div>
            <hr className='my-2' />
            <div className='flex justify-between items-center'>
              <div className='flex items-center  border rounded-[24px] px-2'>
                <i className='pi pi-calendar  text-[#F4AA08]'></i>
                <Calendar className='border-none ml-1 mt-1 h-9 rounded-[6px] w-[100px] ' value={filterDate.filter_date || ""} onChange={(e) => handleFilterChange("filter_date", e.value as Date)} />

              </div>
              <div className='flex items-center justify-center gap-2'>
                <Custombutton name={'Apply'} color={'yellow'} onclick={handleApplyFilter} />
                <Custombutton name={'Clear'} color={'black'} onclick={handleClearFilter} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getChallanHistory()
  }, [])
  return (
    <div className='relative'>
      <div className='absolute right-4 -top-12'>
        <Filter />
      </div>
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
                <div className='flex flex-col gap-3'>
                  {/* <Custombutton name={'View Detail'} color={'yellow'} onclick={() => { getViewData(data?.id), setSideBar(true) }} /> */}
                  <button className='flex justify-center items-center px-[15px] py-1 text-[14px] rounded-[14px] text-[White] bg-yellow-500' onClick={() => { getViewData(data?.id), setSideBar(true) }} >View Detail</button>
                  <button className='flex justify-center items-center px-[15px] py-1 text-[14px] rounded-[14px] text-[White] bg-black' onClick={() => { editChallan(data?.id) }} >Edit</button>
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
                    <p className='font-semibold self-end'>Customer</p>
                    <p className='self-end'>{data?.customer_name}</p>
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
                    <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4 '>
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
                    <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4'>
                      <div className='!break-all'>
                        <p>Contact Person:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.contact_person}</p>
                      </div>
                      <div>
                        <p>E-mail:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.email}</p>
                      </div>
                      <div>
                        <p>Contact No.:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.contact_number}</p>
                      </div>
                    </div>
                    <hr className='mx-4' />
                    <div className='grid grid-cols-3 gap-1 text-[12px] px-4 my-4'>
                      <div>
                        <p>Customer Reference:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.customer_reference}</p>
                      </div>
                      <div>
                        <p> Reference Date:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.reference_date}</p>
                      </div>
                      <div>
                        <p>Address:</p>
                        <p className='text-[#929292] !break-all'>{viewData?.address}</p>
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
    </div>
  )
}

export default ChallanHistory