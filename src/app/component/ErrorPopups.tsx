import Image from 'next/image'
import React from 'react'
interface popupProps{
    errMessage:string,
    hidePopup:(value:boolean)=>void
}
const ErrorPopups:React.FC<popupProps>= ({errMessage,hidePopup}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white   rounded-[8px] shadow-lg min-w-[250px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                <div className='flex flex-col gap-4 justify-center items-center p-8'>
                    <Image src={'/images/fill-mandatory.svg'} alt={''} height={160} width={180} />
                    <p>{errMessage}</p>
                </div>
                <div className='w-full rounded-b-[8px]'>
                    <p className='flex justify-center items-center text-[#F4AA08] bg-[#FFF0CF] p-3 cursor-pointer rounded-b-[8px]' onClick={() => { hidePopup(false) }}>Back</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPopups