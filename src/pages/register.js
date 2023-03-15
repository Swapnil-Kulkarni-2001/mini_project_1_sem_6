import RegisterNavbar from '@/components/RegisterNavbar'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const register = () => {
    
    const [registerStatus,setRegisterStatus] = useState(true);

    const router = useRouter();
    
    const onRegisterStatusClicked = (status)=>{

        setRegisterStatus(status);
        console.log(status);

    }
    
    return (
        <div className="h-[100vh] flex flex-col">
            <RegisterNavbar />
            <div className="bg-[#fafbfe] h-full flex flex-col items-center px-3">
                <div className="bg-white flex flex-col my-10 px-3 md:px-24 py-10">
                    <h1 className="text-3xl font-bold text-center md:text-start ">Find a Work Or Find someone for Work</h1>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold mt-7 ">Full name</label>
                        <input type="text" placeholder="What is your name ?" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold mt-7">Email ID</label>
                        <input type="email" placeholder="Tell us your email id" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold mt-7">Password</label>
                        <input type="password" placeholder="Create password for your account" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold mt-7">Mobile number</label>
                        <input type="password" placeholder="Mobile number" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>

                    <div className="flex flex-col ">
                        <label className="text-xs font-semibold mt-7">Why you are here ?</label>
                        <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row py-2">
                            <div onClick={()=>onRegisterStatusClicked(true)} className={`border-2 hover:cursor-pointer px-10 py-5 mr-5 rounded-2xl ${registerStatus?'border-[#457eff]':'border-gray-300'}`}>
                                <h1 className="text-[#457eff] text-xl font-semibold">I want to work</h1>
                                <h1 className="text-gray-500 text-sm">find opportunities</h1>
                            </div>
                            <div onClick={()=>onRegisterStatusClicked(false)} className={`border-2 hover:cursor-pointer px-10 py-5 mr-5 rounded-2xl ${registerStatus?'border-gray-300':'border-[#457eff]'}`}>
                                <h1 className="text-[#457eff] text-xl font-semibold">I want someone to work</h1>
                                <h1 className="text-gray-500 text-sm">give opportunities</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button onClick={()=>router.push("/homepage")} className="bg-[#457eff] px-8 py-2 rounded-3xl text-white text-lg font-semibold">Register now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register