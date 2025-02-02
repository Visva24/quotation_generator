import Image from 'next/image'
import React from 'react'
interface savepop {
    message:string
}
const SavePopup:React.FC<savepop> = ({message}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-[12px] shadow-lg w-[250px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
              <div className='flex flex-col gap-4 justify-center items-center'>
              <Image src={'/images/tick.svg'} alt={''} height={50} width={50} />
              <p>{message}</p>
              </div>
            </div>
        </div>
    )
}

export default SavePopup