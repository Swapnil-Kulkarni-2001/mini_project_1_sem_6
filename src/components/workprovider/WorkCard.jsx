import React from 'react'
import Image from 'next/image';
import { BiMap } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';



const WorkCard = ({ data }) => {

    const router = useRouter();


    //console.log(data.workAddress);
    dayjs.extend(relativeTime);

    let postTime = "";

    if (data != undefined)
    {
        postTime = dayjs(data.postTime).fromNow();
    }
    else{
        return null
    }
    return (
        <div onClick={() => router.push(`/wpuser/postworks/${data._id}`)} className="flex flex-col h-auto w-full  p-5 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg border-2 cursor-pointer">

            <div className="flex flex-col ml-2">
                <h1 className="text-base font-bold text-[#091e42]">{data.workName}</h1>
                <h1 className="text-sm font-semibold text-gray-500">{data.employeerName}</h1>
                <div className="flex flex-row items-center mt-2">
                    <BiMap className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977] w-full">{data.workAddress}</h1>
                </div>
                <div className="flex flex-row items-center mt-1">
                    <BsStopwatch className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977]">{data.workDuration}</h1>
                    <div className="flex flex-row ml-2 gap-x-2">
                        <h1 className="text-sm text-[#696977] ">{data.workTime}</h1>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-2">
                    <AiOutlineCalendar className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977] w-full">{data.workFrom}</h1>
                </div>
                <div className="flex flex-row items-center mt-5 ">
                    <div className='flex flex-row items-center px-2 py-1 bg-[#f4f5f7]'>
                        <RxCounterClockwiseClock className="text-sm mr-2" />
                        <h1 className="text-xs font-semibold">{postTime}</h1>
                    </div>

                    <div className="flex flex-col ml-auto">
                        <FaRegBookmark className="text-lg cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkCard