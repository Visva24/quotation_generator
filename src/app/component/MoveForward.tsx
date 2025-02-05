import React from 'react';

interface MoveForwardProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const MoveForward: React.FC<MoveForwardProps> = ({ options, value, onChange }) => {
    return (
        <div className=" flex gap-4 px-2 py-1 ">
            {options.map((option) => (
                <div key={option} onClick={() => onChange(option)} className='flex items-center gap-2 cursor-pointer'>
                    <div className={`h-6 w-6 rounded-full border border-[#F4AA08] p-2 flex items-center  justify-center ${ value === option ? 'bg-[#1D1D1D] text-white' : 'text-gray-600'}`}>
                        <i className={`pi pi-check text-[#F4AA08]  `}></i>
                    </div>
                    <p> {option}</p>
                </div>
            ))}
        </div>
    );
};

export default MoveForward;

