"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

const SignUpPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <>
            <div className="h-screen w-screen grid grid-cols-12 text-[#fff]">
                <div className="col-span-7 bg-[#000] ">
                    <div className="flex h-full items-center justify-center">
                        <Image src="/images/loginImg.png" alt={""} height={400} width={400} className="shadow-2xl  shadow-[#901129]" />
                    </div>
                </div>
                <div className="col-span-5 bg-[#000] overflow-y-auto">
                    <div className="mt-10 flex justify-center items-center">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-[34px] font-bold">Welcome!</h2>
                                <p>Today will be great</p>
                            </div>
                            <div className="flex flex-col gap-4">
                            <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <Image src="/images/mail.png" alt="Email Icon" width={30} height={30} />
                                    <input
                                        type="email"
                                        placeholder="Enter Name"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"

                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <Image src="/images/mail.png" alt="Email Icon" width={30} height={30} />
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"

                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <Image src="/images/lock.png" alt="Password Icon" width={30} height={30} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className=" text-black w-full py-3 bg-white  focus:outline-none"

                                    />
                                    <span className="pr-4" onClick={() => { setShowPassword(!showPassword) }}><i className={`text-[black] cursor-pointer pi ${showPassword ? "pi-eye" : "pi-eye-slash"}`}></i></span>
                                </div>
                               
                            </div>
                            {/* <div className="flex gap-1 items-center px-6">
                                <hr className=" w-full border-t-1 border-[#fff]" />
                                or
                                <hr className=" w-full  border-t-1 border-[#fff]" />
                            </div> */}
                            <button className="w-full bg-yellow-500 px-4 py-3 rounded-lg text-black font-semibold hover:bg-yellow-600"  >
                                Sign In
                            </button>
                            <div className="px-6 mt-2"> <hr className=" w-full px-6  border-t-1 border-[#fff]" /></div>
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <Image
                                    src="/images/flower.svg"
                                    alt="Footer Logo"
                                    width={120}
                                    height={120}
                                />
                                <p className="text-[24px] font-light text-white">SHADOW TRADING W.L.L</p>
                            </div>

                        </div>
                        <ToastContainer />
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignUpPage