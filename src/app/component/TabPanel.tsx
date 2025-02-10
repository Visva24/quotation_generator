import React from 'react';

interface TabItems {
    title: string;
}

interface TabPanel {
    tabHead: TabItems[];
    activeIndex: number; 
    setActiveIndex: (index: number) => void;  
}

const TabIndex: React.FC<TabPanel> = ({ tabHead, activeIndex, setActiveIndex }) => {
  return (
    <div className="px-3 py-1.5 bg-[#fff] inline text-[14px] rounded-[8px]">
      {tabHead.map((header, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)} 
          className={`border-b-[3px] mr-3 gap-2 ${
            activeIndex === index ? 'border-[#F4AA08] rounded-b-sm' : 'border-transparent'
          }`}
        >
          {header.title}
        </button>
      ))}
    </div>
  );
};

export default TabIndex;
