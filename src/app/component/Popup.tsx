import React from 'react'
import Custombutton from './Custombutton';
interface popups {
    message:string,
    handleCancel:()=>void;
    handleRedirect:()=>void;
}

const Popup:React.FC<popups> = ({message,handleCancel,handleRedirect}) => {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-[12px] shadow-lg w-[450px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                    <div className='w-full flex flex-col gap-3'>
                        <p className='flex justify-center'>{message}</p>
                        <div className='flex gap-4 justify-center items-center'>
                            <Custombutton name={'No'} color={'black'} onclick={handleCancel} />
                            <Custombutton name={'Yes'} color={'blue'} onclick={handleRedirect} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup