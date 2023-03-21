import React from 'react'
import FNavbar from '@/components/FNavbar'
import { useSelector } from 'react-redux'
import AccountSidePanel from '@/components/AccountSidePanel'
import { FaUserCircle } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import ProgressBar from '@/components/ProgressBar';
import WorkAbility from '@/components/WorkAbility';
import { BsPencil } from "react-icons/bs";
import Image from 'next/image';

const profile = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })


    const myLoader = ({ src, width, quality }) => {
        return `https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=`
      }

    return (
        <div className="flex flex-col relative h-auto overflow-x-hidden bg-[#f8f8f8]">
            <FNavbar />
            <div className="flex flex-col h-full">
                {/* <div className="bg-[#d4e4ff] h-48">
                </div> */}
                <div className={`flex flex-col w-[23rem] h-[100vh] 
                rounded-tl-3xl rounded-bl-3xl  fixed top-0 right-0
                transition-all duration-700
                ${open ? 'flex' : 'translate-x-[35rem] '}
                `}>
                    <AccountSidePanel />
                </div>

                <div className="flex flex-col md:px-40 py-10">
                    <div className='flex flex-col mx-20 p-5 bg-[#4a90e2] h-60 rounded-2xl'>
                        <div className="flex flex-row">
                            <div className="">
                                <div className="bg-white rounded-full relative h-28 w-28 ">
                                    {/* <FaUserCircle className="text-8xl text-[#d8d8d8]" /> */}
                                    <Image fill={true} className="rounded-full" loader={myLoader} src="https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q="/>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5  ">
                                <h1 className="text-xl text-white font-bold">Swapnil Kulkarni</h1>
                                <div className="flex flex-col mt-8">
                                    <div className="flex flex-row items-center ">
                                        <div className="flex flex-row items-center">
                                            <BiMap className="text-white text-lg mr-4" />
                                            <h1 className="text-md text-white ">Kolhapur, Maharashtra</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <BsTelephone className="text-white text-lg mr-4" />
                                            <h1 className="text-md text-white ">+91-9898989898</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center mt-2">
                                        <div className="flex flex-row items-center">
                                            <RiUserSettingsLine className="text-white text-xl mr-4" />
                                            <h1 className="text-md text-white ">Worker</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <AiOutlineMail className="text-white text-xl mr-4" />
                                            <h1 className="text-md text-white ">swapnilkulkarni987@gmail.com</h1>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <ProgressBar bgcolor="white" progress='20' height={4} />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex flex-col bg-[#1a69c4] p-10 items-center m-auto">
                                <h1 className="text-8xl text-white">4.4</h1>
                            </div> */}

                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 my-10 px-5 py-5   shadow-md overflow-x-hidden" >
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Profile Summary</h1>
                            <BsPencil className="text-xl text-blue-600 ml-5 cursor-pointer" />
                        </div>
                        <div className="flex flex-col mt-5">
                            <p className="text-sm text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 mb-10 px-5 py-5   shadow-md overflow-x-hidden">
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Key Skills</h1>
                            <BsPencil className="text-xl text-blue-600 ml-5 cursor-pointer" />
                        </div>
                        <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 mt-5 h-full pb-3 ">
                            <WorkAbility work="Cooking" />
                            <WorkAbility work="Plumbing" />
                            <WorkAbility work="Cleaning" />
                            <WorkAbility work="Cooking" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default profile