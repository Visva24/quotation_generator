"use client"
import { postMethod } from '@/utils/api';
import { Response } from '@/utils/common';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Custombutton from '../component/Custombutton';
import SavePopup from '../component/SavePopup';

const SignUpPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [savePop, setSavePop] = useState<boolean>(false);
    const [pop, setPop] = useState<boolean>(false)
    const [error, setError] = useState<string>("initial");
    const [passKeyPop ,setPassKeyPop] = useState<boolean>(false)
    const [credential, setCredential] = useState<any>(
        {
            user_name: "",
            user_email: "",
            phone_number: "",
            user_password: "",
            confirm_pass: "",
            pass_key: ""
        }
    );
    const handleChange = (key: string, value: any) => {
        setError("initial")
        if (key === "confirm_pass") {
            setError("red")
            console.log(value, credential.user_password)
            if (value === credential.user_password) {
                setError("green")
            }
        }
        setCredential({ ...credential, [key]: value })
    }

    const handleSignIn = async () => {
        if (credential.user_password !== credential.confirm_pass) {
            setSavePop(true)
            return;
        }
        const payload = {
            user_name: credential.user_name,
            user_email: credential.user_email,
            user_password: credential.user_password,
            phone_number: credential.phone_number,
            passcode: credential.pass_key
        }
        const response: Response = await postMethod("/authentication/sign-up", payload)
        console.log(response)
        if (response.status == "success") {
            setPop(true)
            setTimeout(async () => {
                setPop(false)
                router.push("/log-in")
            }, 3000)
        }else{
            setPassKeyPop(true)
        }
    }


    return (
        <>
            <div className="h-screen w-screen flex bg-[#000]  text-[#fff] overflow-y-auto">
                <div className="w-[65%] mr-48 bg-[#000] ">
                    <div className="flex h-full items-center justify-end">
                        <Image src="/images/loginImg.svg" alt={""} height={400} width={400} className="shadow-2xl ml-36  shadow-[#f3f0f17f]" />
                    </div>
                </div>
                <div className="w-[35%] bg-[#000]   overflow-y-auto scroll-bar">
                    <div className="h-full mt-20 flex  items-center">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-[34px] font-bold">Sign Up!</h2>
                                <p>Today will be great</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <i className="pi pi-user text-[#F4AA08] pl-1"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"
                                        value={credential.user_name}
                                        onChange={(e) => { handleChange("user_name", e.target.value) }}
                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <i className="pi pi-envelope text-[#F4AA08] pl-1"></i>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"
                                        value={credential.user_email}
                                        onChange={(e) => { handleChange("user_email", e.target.value) }}
                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <i className="pi pi-phone text-[#F4AA08] pl-1"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter Mobile"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"
                                        onWheel={(e) => e.currentTarget.blur()} // Prevent scrolling to change value
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-"].includes(e.key)) {
                                                e.preventDefault(); // Prevent unwanted characters
                                            } else if (e.key === "Enter") {
                                                handleSignIn(); // Trigger login when Enter is pressed
                                            }
                                        }}
                                        value={credential.phone_number}
                                        onChange={(e) => { handleChange("phone_number", e.target.value) }}
                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <i className="pi pi-key text-[#F4AA08] pl-1"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Pass Key"
                                        className="  text-black w-full py-3 bg-white  focus:outline-none"
                                        value={credential.pass_key}
                                        onChange={(e) => { handleChange("pass_key", e.target.value) }}
                                    />
                                </div>
                                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                                    <i className="pi pi-lock text-[#F4AA08] pl-1"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className=" text-black w-full py-3 bg-white  focus:outline-none"
                                        value={credential.user_password}
                                        onChange={(e) => { handleChange("user_password", e.target.value) }}
                                    />
                                    <span className="pr-4" onClick={() => { setShowPassword(!showPassword) }}><i className={`text-[black] cursor-pointer pi ${showPassword ? "pi-eye" : "pi-eye-slash"}`}></i></span>
                                </div>
                                <div className={`flex p-1 gap-2  items-center rounded-lg w-[330px]  bg-white ${error == "red" ? "border-[2px] border-red-400" : error == "green" ? "border-[2px] border-green-400" : "border-none"}`}>
                                    <i className="pi pi-lock text-[#F4AA08] pl-1"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confrim Password"
                                        className=" text-black w-full py-3 bg-white  focus:outline-none"
                                        value={credential.confirm_pass}
                                        onChange={(e) => { handleChange("confirm_pass", e.target.value) }}
                                    />
                                    <span className="pr-4" onClick={() => { setShowPassword(!showPassword) }}><i className={`text-[black] cursor-pointer pi ${showPassword ? "pi-eye" : "pi-eye-slash"}`}></i></span>
                                </div>
                            </div>

                            <button className="w-full bg-yellow-500 px-4 py-3 rounded-lg text-black font-semibold hover:bg-yellow-600" onClick={handleSignIn}  >
                                Sign Up
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
            {
                savePop &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-[12px] shadow-lg w-[450px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                        <div className='w-full flex flex-col gap-3'>
                            <p className='flex justify-center'>Passwords do not match. Please re-check and enter the correct password.</p>
                            <div className='flex gap-4 justify-center items-center'>
                                <Custombutton name={'OK'} color={'black'} onclick={() => { setSavePop(false) }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
             {
                passKeyPop &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-[12px] shadow-lg w-[450px]  transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                        <div className='w-full flex flex-col gap-3'>
                            <p className='flex justify-center'>Please fill the missing fields and enter the valid pass key for sign up!!!</p>
                            <div className='flex gap-4 justify-center items-center'>
                                <Custombutton name={'OK'} color={'black'} onclick={() => { setPassKeyPop(false) }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                pop &&
                <SavePopup message={'Successfully Sign In'} />
            }
        </>
    )
}

export default SignUpPage