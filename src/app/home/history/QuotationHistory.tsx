import Custombutton from '@/app/component/Custombutton';
import Loader from '@/app/component/Loader';
import MoveForward from '@/app/component/MoveForward';
import Table from '@/app/component/Table';
import { getMethod } from '@/utils/api';
import { Response } from '@/utils/common';
import { downloadPDF } from '@/utils/download';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react'

const QuotationHistory = () => {
    const router = useRouter();
    const cookies = parseCookies();
    const user_id = cookies.user_id
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
    const [history, setHistory] = useState<any>();
    const [sideBar, setSideBar] = useState<any>();
    const [viewData, setViewData] = useState<any>();
    const [selectOption, setSelectOption] = useState<any>('')
    const [loader, setLoader] = useState<boolean>(false);
    const [movePop, setMovePop] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<any>()
    const handleChange = (value: any) => {
        console.log(value)
        setSelectOption(value)
    }
    const getQuotationHistory = async () => {
        const response: Response = await getMethod(`/quotation/get-quotation-form-history`)
        console.log(response?.data)
        setHistory(response?.data)
    }

    const getViewData = async (id: number) => {
        const response: Response = await getMethod(`/quotation/get-quotation-form-data?quotation_id=${id}`)
        console.log(response.data)
        setViewData(response.data)
    }

    const reviseData = (id: number | string) => {
        router.push(`/quotation?type=revised&id=${id}`)
    }

    const downLoadPdf = async (id: number) => {
        setLoader(true)
        const response: Response = await getMethod(`/quotation/download-quotation-template?id=${id}`)
        if (response.status === "success") {
            setTimeout(() => { downloadPDF(response.data), setLoader(false) })
        }

    }

    const Sideheader = () => {
        return (
            <div className=" flex items-center justify-between !w-full bg-[#000] h-[70px] px-2 !m-0">
                <h2 className="text-lg font-semibold text-[#fff]">Quotation Details</h2>
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
                                        <p className='px-[10px] py-[4px] rounded-full text-[white] bg-gradient-to-r from-[#F4AA08] to-[#BA8000]'>Quotation</p>
                                        <p className='flex gap-2 items-center text-[18px]'><span className=' text-[#F4AA08] text-[16px]'>{data?.symbol}</span>{data?.total_amount}</p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <p className='flex gap-2 items-center'><i className='pi pi-calendar text-[#F4AA08] text-[16px]'></i>{data?.Date}</p> |
                                        <p className='flex gap-2 items-center'><i className='pi pi-file text-[#F4AA08] text-[16px]'></i>{data?.document_number}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4 '>
                                    <div className='h-16 w-16 rounded-full cursor-pointer flex justify-center items-center bg-[#FFF0CF]' onClick={() => { setMovePop(true), setSelectedId(data?.id) }}>
                                        <Image src={'/images/move-forward.svg'} alt={''} height={28} width={28} />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <Custombutton name={'View Detail'} color={'blue'} onclick={() => { getViewData(data?.id), setSideBar(true) }} />
                                        <Custombutton name={'Revise'} color={'black'} onclick={() => { reviseData(data?.id) }} />
                                    </div>
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
                                        <p className='font-semibold'>Remarks</p>
                                        <p>{data?.remarks}</p>
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
                movePop &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white   rounded-[8px] shadow-lg min-w-[250px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                        <div className='flex flex-col gap-4 justify-center items-center p-8'>
                            <Image src={'/images/illustrate.svg'} alt={''} height={160} width={160} />
                            <p>Move-forward Quotation To?</p>
                            <MoveForward options={["Sales Invoice", "Delivery Notes"]} value={selectOption} onChange={handleChange} />
                        </div>
                        <div className='w-full flex rounded-b-[8px]'>
                            <p className='w-[50%] flex justify-center items-center text-[#F4AA08] bg-[#FFF0CF] p-3 cursor-pointer rounded-bl-[8px]' onClick={() => { setMovePop(false) }}>Back</p>
                            <p className='w-[50%] flex justify-center items-center bg-[#F4AA08] text-[#fff] p-3 cursor-pointer rounded-br-[8px]' onClick={() => { router.push(`/${selectOption === "Sales Invoice" ? "invoice" : "challan"}?type=moveData&id=${selectedId}&current_user_id=${user_id}`) }}>Move</p>
                        </div>
                    </div>
                </div>
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
                                        <p className='h-5 border-[#F4AA08] border-[2px]'></p><p className='  '> QUOTATION</p>
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
                                                <p className='text-[#929292]'>{viewData?.doc_date}</p>
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
                                                <p>Payment Method:</p>
                                                <p className='text-[#929292] break-word'>{viewData?.payment_mode}</p>
                                            </div>
                                            <div>
                                                <p> Currency:</p>
                                                <p className='text-[#929292] break-word'>{viewData?.currency}</p>
                                            </div>
                                        </div>
                                        <hr className='mx-4' />
                                        <div className='grid grid-cols-3 text-[12px] px-4 my-4'>
                                            <div>
                                                <p>Address:</p>
                                                <p className='text-[#929292] break-word'>{viewData?.address}</p>
                                            </div>
                                            <div>
                                                <p>Validity:</p>
                                                <p className='text-[#929292] break-word'>{viewData?.quotation_validity}</p>
                                            </div>
                                        </div>
                                        <hr className='mx-4' />
                                    </div>
                                </div>
                                <div className='mx-3'>
                                    <Table columns={columns} rows={viewData?.quotation_items} />
                                </div>
                                <div className='mt-3 flex justify-between mx-4 text-[12px]'>
                                    <div className='flex flex-col gap-2'>
                                        <p>Remark Brand: <span>{viewData?.remark_brand}</span></p>
                                        <p>Delivery: <span>{viewData?.delivery}</span></p>
                                        <p>Amount in Words: <span>{viewData?.amount_in_words}</span></p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className=' text-[12px]'>Sub Total:{viewData?.sub_total}</p>
                                        <p>DIS:{viewData?.total_discount}</p>
                                        <p>TAX:{viewData?.total_tax}</p>
                                        <p>Total:{viewData?.grand_total}</p>
                                    </div>
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

export default QuotationHistory