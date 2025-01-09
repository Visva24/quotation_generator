"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Response } from "@/utils/common";
import { postMethod } from "@/utils/api";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword , setShowPassword] = useState<any>(false)
  const [credential, setCredential] = useState<any>(
    {
      user_email: "",
      user_password: ""
    }
  );
  const handleChange = (key:string,value:any) => {
      setCredential({...credential,[key]:value})
  }
  const handleLogin = async() =>{
    const payload = {
      user_email:credential.user_email,
      user_password:credential.user_password
    }
    const response:Response = await postMethod("/authentication/sign-in",payload)
    console.log(response)
    if(response.status=="success"){
      toast.success('Successfully logged In', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
     setTimeout(async()=>{
      router.push("/home")
     },3000) 
      
    }else{
      toast.error('Wrong Credential', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <div className="relative w-[50%] h-[100%]  bg-gray-900  overflow-hidden">
        <Image
          src={'/images/loginImg.png'}
          layout="fill"
          objectFit="cover"
          alt="Login Background"

        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] max-w-sm space-y-6">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white">Welcome!</h1>
            <p className="text-lg mt-2 text-gray-400">Today will be great</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 pl-14 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={credential.user_email}
                onChange={(e)=>{handleChange("user_email",e.target.value)}}
              />
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Image src="/images/mail.png" alt="Email Icon" width={30} height={30} />
              </div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pl-14 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={credential.user_password}
                onChange={(e)=>{handleChange("user_password",e.target.value)}}
              />
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Image src="/images/lock.png" alt="Password Icon" width={30} height={30} />
              </div>
              <div className="absolute right-3 top-4 text-[14px] cursor-pointer" onClick={()=>{setShowPassword(!showPassword)}}> {showPassword ? "👁️" : "🙈"} </div>
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-yellow-500 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center text-gray-400 mt-4">
            <hr className="w-1/3 border-t-2 border-gray-400" />
            <span className="mx-2">or</span>
            <hr className="w-1/3 border-t-2 border-gray-400" />
          </div>

          <div className="space-y-4 mt-4">
            <button className="w-full flex items-center justify-center bg-gray-700 px-4 py-3 rounded-lg text-white hover:bg-gray-600">
              <Image
                src="/images/gmail.png"
                alt="Gmail Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Gmail
            </button>

            {/* Login Button */}
            <button className="w-full bg-yellow-500 px-4 py-3 rounded-lg text-black font-semibold hover:bg-yellow-600" onClick={handleLogin}>
              Login
            </button>
            <ToastContainer />
          </div>

          <hr className="w-full border-t-2 border-gray-400 mt-4" />

          <div className="text-center text-gray-400 mt-6 space-y-2">
            <Image
              src="/images/flower.svg"
              alt="Footer Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
            <p className="text-2xl font-Montserrat text-white">SHADOW TRADING W.L.L</p>
          </div>

        </div>
      </div>
    </div>
  );
}