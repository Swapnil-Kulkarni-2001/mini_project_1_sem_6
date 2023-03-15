import Link from 'next/link'
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

import { useDispatch, useSelector } from 'react-redux';
import { openToggle } from '@/store/accountSidePanel/slice';



const FNavbar = () => {

    const dispatch = useDispatch();

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    return (
        <div className="py-2 px-5 md:px-40 flex flex-row items-center  shadow-md">
            <div className='border-4 py-1 border-white'>
                <h1 className="text-3xl text-blue-600 font-bold">Karya</h1>

            </div>
            <div className="text-sm flex flex-row ml-auto">
                <div className='border-4 py-1 rounded-md border-white  hover:border-b-[#ff7555]'>
                    <Link href="/alljobs" className="text-gray-600  hover:text-black font-semibold text-md">Find all Works</Link>
                </div>
            </div>

            <div className="group w-[30rem] flex flex-row py-1 pl-3 pr-2 ml-10 rounded-full  bg-[#f1f1f1] hover:bg-[#fafafa] hover:border-2">
                <input type="text" placeholder="Search any work here" className="w-[90%]  bg-[#f1f1f1] group-hover:bg-[#fafafa] outline-none text-sm font-medium" required />
                {/* <button className="ml-auto px-5 py-1 bg-[#457eff] rounded-2xl text-white font-semibold">Search</button> */}
                <div className="bg-[#457eff] rounded-full p-1 ml-auto">
                    <AiOutlineSearch className="text-xl text-white " />
                </div>
            </div>

            <div onClick={() => dispatch(openToggle(open))} className="ml-10 bg-white border-2 cursor-pointer border-gray-300 w-20 py-1 px-2 rounded-3xl flex flex-row items-center">
                <FaUserCircle className="text-3xl text-gray-300" />
                <HiMenuAlt2 className="text-3xl text-gray-500 ml-auto" />
            </div>
        </div>
    )
}

export default FNavbar