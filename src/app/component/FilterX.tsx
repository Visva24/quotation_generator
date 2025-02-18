import React, { useState } from 'react'
import Custombutton from './Custombutton';
import { Calendar } from 'primereact/calendar';

interface FilterProps {
    toggleDrop:boolean;
    handleToggle:()=>void;
    handleApplyFilter:()=>void;
    handleClearFilter:()=>void;
}

const FilterX:React.FC<FilterProps> = ({toggleDrop,handleToggle,handleClearFilter,handleApplyFilter}) => {
    
    const [isFilterApplied ,setIsFilterApplied] = useState<any>();
    const [filterDate, setFilterDate] = useState<any>({
        filter_date: ""
    })

    const handleFilterChange = (key: string, value: any) => {
        setFilterDate({ ...filterDate, [key]: value })
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
                    className="absolute right-[0px] top-full mt-2 w-[300px] bg-white shadow-xl rounded-lg p-3"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex gap-1 items-center">
                            <img src="/images/filter.svg" alt="filter" className="w-5 h-5" />
                            <p>Filter</p>
                        </div>
                        {isFilterApplied && <p className="text-gray-600">Filter Applied</p>}
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between items-center'>
                        <Calendar className='border h-9 rounded-[6px] w-[100px] ' value={filterDate.filter_date || ""} onChange={(e) => handleFilterChange("filter_date", e.value as Date)} />
                        <Custombutton name={'Apply'} color={'yellow'} onclick={handleApplyFilter} />
                        <Custombutton name={'Clear'} color={'black'} onclick={handleClearFilter} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterX