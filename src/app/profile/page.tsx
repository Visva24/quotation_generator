"use client"
import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import ProfileBreadcrumbs from '../component/ProfileBreadcrumbs'
import { TabPanel, TabView } from 'primereact/tabview'
import TabIndex from '../component/TabPanel'
import Custombutton from '../component/Custombutton'
import Image from 'next/image'
import { getMethod, postMethod } from '@/utils/api'
import { Response } from '@/utils/common'
import SavePopup from '../component/SavePopup'

const Profile = () => {
    const cookies = parseCookies();
    const [avatar, setAvatar] = useState<any>();
    const [userName, setUserName] = useState<any>();
    const [userSign, setUserSign] = useState<any>();
    const [uploaded , setUploaded] = useState<boolean>();
    const [uploadSign, setUploadSign] = useState<any>({
        signature: ""
    })
    const [activeIndex, setActiveIndex] = useState(0);
    const breadcrumb = [
        {
            label: "Home",
            route: "/home"
        },
        {
            label: "Profile",
            route: "/profile"
        }
    ]

    const handleChange = (key: string, file: File | null) => {
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                console.log(base64String,"base64String")
                setUploadSign((prev: any) => ({ ...prev, [key]: base64String }));
            };
            reader.onerror = (error) => {
                console.error("Error converting file to Base64:", error);
            };
        } else {
            setUploadSign((prev: any) => ({ ...prev, [key]: null }));
        }
    };

    const getUploadSignature = async () => {
        const response: Response = await getMethod(`/quotation/get-user-Profile-details?user_id=${cookies?.user_id ? cookies?.user_id : null}`)
        const data = response.data;
        if (response.status == "success") {
            console.log(response.data)
            const base64Prefix = "data:image/png;base64,";
            const signatureSrc = data?.user_signature.startsWith(base64Prefix)
                ? data.user_signature
                : base64Prefix + data?.user_signature;
            setUserSign(signatureSrc)
        }
    }


    const uploadSignature = async () => {
        const payLoad = {
            user_name: cookies.user_name ? cookies.user_name : uploadSign.user_name || null,
            user_id: cookies.user_id ? cookies.user_id : uploadSign.user_id || null,
            signature: uploadSign.signature || null
        }
        const response: Response = await postMethod("/quotation/upload-user-details", payLoad)
        if(response.status == "success"){
            getUploadSignature()
            setUploaded(true)
            setTimeout(async () => {
              setUploaded(false)
            }, 2000)
        }
       
    }

    useEffect(() => {
        if (cookies.avatar_value || cookies.user_name) {
            setAvatar(cookies.avatar_value || "")
            setUserName(cookies.user_name || "")
        }
    }, [cookies])
    useEffect(() => {
        getUploadSignature()
    }, [])
    return (
        <>
            <div className='relative'>
                <div style={{ backgroundImage: `url('/images/profile-banner.svg')` }} className='w-full h-[200px]'>
                    <div className='pl-2 pt-1 '>
                        <ProfileBreadcrumbs breadcrumb={breadcrumb} />
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-6 absolute top-20  w-full px-14'>
                    <div className='col-span-3 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div className='flex flex-col gap-5 items-center justify-center p-10'>
                            <div className='rounded-full w-28 h-28 flex items-center justify-center text-[white] text-[14px] bg-[#63a1ee] cursor-pointer'>
                                <p className='font-bold'>{avatar || ""}</p>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p className='text-[16px] text-[#000] flex justify-center font-bold'>{userName}</p>
                                <p className='text-[14px] text-[#898D8E] flex justify-center'>User</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-9 border bg-[#fff] rounded-[24px] shadow-xl'>
                        <div className='rounded-[24px] p-3 flex flex-col'>
                            <TabIndex tabHead={[{ title: "ACCOUNT SETTING" }, { title: "YET TO DECIDE" }]} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                            <div>
                                {
                                    activeIndex == 0 &&
                                    <>
                                        <div className="px-4 relative text-[14px]">
                                            <div className="mt-2 flex flex-col gap-1">
                                                <label className="font-medium text-gray-700">Upload Signature</label>

                                                <div className="border border-[#F4AA08] bg-[#FFFDF8] w-[400px] rounded-[6px]">
                                                    <div className="flex flex-col justify-center items-center px-5 py-3">
                                                        <input
                                                            type="file"
                                                            id="signature"
                                                            hidden
                                                            accept=".jpeg, .png"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0] || null;
                                                                handleChange("signature", file);
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="signature"
                                                            className="py-[6px] px-[16px] bg-[#F4AA08] text-[12px] rounded-[4px] text-white hover:cursor-pointer"
                                                        >
                                                            Upload File
                                                        </label>
                                                        <p className="text-[12px] text-[#F4AA08] font-medium mt-1.5">2MB Limit</p>
                                                        <p className="text-[10px] text-[#F4AA08]">JPEG, PNG</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {(uploadSign?.signature || userSign)&&(
                                                <div className="mt-2 ">
                                                    <img
                                                        src={userSign ? userSign : uploadSign.signature ? uploadSign.signature : ""}
                                                        alt="Signature Preview"
                                                        className=" p-3 h-[150px] w-[250px] border border-gray-300 rounded-md"
                                                       
                                                    />
                                                </div>
                                            )}
                                            <div className="mt-10">
                                                <Custombutton name="Update" color="yellow" onclick={uploadSignature} />
                                            </div>
                                        </div>

                                    </>
                                }
                                {
                                    activeIndex == 1 &&
                                    <>
                                        <div className='px-4  flex justify-center'>
                                            <Image src={'/images/decide.svg'} alt={'logo'} width={200} height={200} />
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                uploaded && 
                <SavePopup message={"Signature Uploaded"} />
            }
        </>
    )
}

export default Profile