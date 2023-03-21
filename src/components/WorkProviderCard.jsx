import React from 'react'
import Image from 'next/image';
import { BiMap } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";

import { RxCounterClockwiseClock } from "react-icons/rx";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const WorkProviderCard = () => {

  const myLoader = ({ src, width, quality }) => {
    return `https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=`
  }

  return (
    <div className="flex flex-col h-full w-96  p-3 bg-white shadow-md border-2 cursor-pointer">

      <div className="flex flex-col ml-2">
        <h1 className="text-base font-bold tetx-[#091e42]">Cook for dinner</h1>
        <h1 className="text-sm font-semibold text-gray-500">Hrushikesh Bhosale</h1>
        <div className="flex flex-row items-center mt-2">
          <BiMap className="text-lg text-[#696977] mr-2" />
          <h1 className="text-sm text-[#696977] w-full">Kolhapur, Maharashtra</h1>
        </div>
        <div className="flex flex-row items-center mt-1">
          <BsStopwatch className="text-lg text-[#696977] mr-2" />
          <h1 className="text-sm text-[#696977]">1 month</h1>
          <div className="flex flex-row ml-2 gap-x-2">
            <h1 className="text-sm text-[#696977] ">11:30</h1>
            <h1 className="text-sm text-[#696977] ">to</h1>
            <h1 className="text-sm text-[#696977] ">1:30</h1>
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <AiOutlineCalendar className="text-lg text-[#696977] mr-2" />
          <h1 className="text-sm text-[#696977] w-full">18 March 2023</h1>
        </div>
      </div>

      {/* <div className="flex flex-row">
        <button className="bg-[#c1e5ff] px-3 py-1 text-sm font-bold text-white mt-3 ml-2">Check details</button>
      </div> */}

      <div className="flex flex-row items-center mt-5 ">
        <div className='flex flex-row items-center px-2 py-1 bg-[#f4f5f7]'>
          <RxCounterClockwiseClock className="text-sm mr-2" />
          <h1 className="text-xs font-semibold">4 DAYS AGO</h1>
        </div>

        <div className="flex flex-col ml-auto">
          <FaRegBookmark className="text-lg cursor-pointer" />
        </div>
      </div>

    </div>
  )
}

export default WorkProviderCard