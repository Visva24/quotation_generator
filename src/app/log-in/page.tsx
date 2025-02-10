"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Response } from "@/utils/common";
import { postMethod } from "@/utils/api";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { storeUserDataInCookies } from "@/utils/cookies";
import SavePopup from "../component/SavePopup";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [savePop, setSavePop] = useState<boolean>(false);
  const [credential, setCredential] = useState<any>(
    {
      user_email: "",
      user_password: ""
    }
  );
  const handleChange = (key: string, value: any) => {
    setCredential({ ...credential, [key]: value })
  }
  const handleLogin = async () => {
    const payload = {
      user_email: credential.user_email,
      user_password: credential.user_password
    }
    const response: Response = await postMethod("/authentication/sign-in", payload)
    console.log(response)
    if (response.status == "success") {
      setSavePop(true)
      setTimeout(async () => {
        setSavePop(false)
        router.push("/home")
      }, 3000)

      storeUserDataInCookies(response.data)
      console.log(response.data)

    } else {
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
    <>
      <div className="h-screen w-screen grid grid-cols-12 text-[#fff]">
        <div className="col-span-7 bg-[#000] ">
          <div className="flex h-full items-center justify-center">
            <Image src="/images/loginImg.png" alt={""} height={380} width={430} className="shadow-2xl  shadow-[#901129]" />
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
                    placeholder="Email"
                    className="  text-black w-full py-3 bg-white  focus:outline-none"
                    value={credential.user_email}
                    onChange={(e) => { handleChange("user_email", e.target.value) }}
                  />
                </div>
                <div className="flex p-1 gap-2 items-center rounded-lg w-[330px]  bg-white">
                  <Image src="/images/lock.png" alt="Password Icon" width={30} height={30} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className=" text-black w-full py-3 bg-white  focus:outline-none"
                    value={credential.user_password}
                    onChange={(e) => { handleChange("user_password", e.target.value) }}
                    onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                  />
                  <span className="pr-4" onClick={() => { setShowPassword(!showPassword) }}><i className={`text-[black] cursor-pointer pi ${showPassword ? "pi-eye" : "pi-eye-slash"}`}></i></span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#F4AA08] text-[14px] cursor-pointer">Forgot password?</p>
                  <p onClick={()=>{router.push("/signup")}} className="text-[#F4AA08] text-[14px] cursor-pointer">Sign Up!</p>
                </div>
              </div>
              {/* <div className="flex gap-1 items-center px-6">
                <hr className=" w-full border-t-1 border-[#fff]" />
                or
                <hr className=" w-full  border-t-1 border-[#fff]" />
              </div> */}
              <button className="w-full bg-yellow-500 px-4 py-3 rounded-lg text-black font-semibold hover:bg-yellow-600" onClick={handleLogin}>
                Login
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
      {savePop &&
        <>
          <SavePopup message={"Successfully Login"} />
        </>
      }
    </>
  );
}