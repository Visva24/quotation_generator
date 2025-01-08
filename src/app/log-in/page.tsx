"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
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
      {/* Welcome Text */}
      <div className="text-left">
        <h1 className="text-4xl font-bold text-white">Welcome!</h1>
        <p className="text-lg mt-2 text-gray-400">Today will be great</p>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        {/* Email Input with Icon */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 pl-14 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <Image src="/images/mail.png" alt="Email Icon" width={30} height={30} />
          </div>
        </div>

        {/* Password Input with Icon */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 pl-14 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <Image src="/images/lock.png" alt="Password Icon" width={30} height={30} />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mt-2">
          <a href="#" className="text-yellow-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
      </div>

      {/* Divider Section (--- or ---) */}
      <div className="flex items-center justify-center text-gray-400 mt-4">
        <hr className="w-1/3 border-t-2 border-gray-400" />
        <span className="mx-2">or</span>
        <hr className="w-1/3 border-t-2 border-gray-400" />
      </div>

      {/* Buttons Section */}
      <div className="space-y-4 mt-4">
        {/* Continue with Gmail */}
        <button className="w-full flex items-center justify-center bg-gray-700 px-4 py-3 rounded-lg text-white hover:bg-gray-600">
          <Image
            src="/images/gmail.png" // Replace with your Gmail icon path
            alt="Gmail Icon"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Gmail
        </button>

        {/* Login Button */}
        <button className="w-full bg-yellow-500 px-4 py-3 rounded-lg text-black font-semibold hover:bg-yellow-600" onClick={()=>router.push("/home")}>
          Login
        </button>
      </div>

      {/* Footer Section */}
      <div className="text-center text-gray-400 mt-6">
      
        <p>SHADOW TRADING W.L.L</p>
      </div>
    </div>
  </div>


    </div>
  );
}