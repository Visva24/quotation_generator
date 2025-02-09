'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import 'primeicons/primeicons.css';
import Image from 'next/image';
interface redirect {
  handleRedirect: () => void,
  moduleName: string,
  image: string
}
const HomePage = () => {

  const router = useRouter();
  const ModuleCard: React.FC<redirect> = ({ handleRedirect, moduleName, image }) => {
    return (
      <>
        <div className="relative border p-3 rounded-[8px] bg-[#fff] w-[230px] h-[240px] hover:bg-[#FFC648] hover:text-white"
          onClick={handleRedirect}
        >
          <div className="flex gap-6 items-center justify-between">
            <p className="text-[18px] font-medium">{moduleName}</p>
            <div className="p-3 rounded-full border">
              <Image src={'/images/rightarrow.svg'} alt={'logo'} width={20} height={20} />
            </div>
          </div>
          <div className="absolute bottom-3 right-2">
            <Image src={image} alt={'logo'} width={60} height={60} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>

      <div>
        <div className="flex justify-center items-center" >
          <div className="flex justify-center items-center gap-10 p-8 bg-[#EFEFEF] rounded-[8px] mt-5">
            <ModuleCard handleRedirect={() => { router.push("/quotation") }} moduleName={'Generate Quotation'} image={'/images/quotation.svg'} />
            <ModuleCard handleRedirect={() => { router.push("/challan") }} moduleName={'Generate Delivery Note'} image={'/images/challan.svg'} />
            <ModuleCard handleRedirect={() => { router.push("/invoice") }} moduleName={'Generate Invoice'} image={'/images/invoice.svg'} />
          </div>
        </div>
      </div>


    </>
  )
}

export default HomePage