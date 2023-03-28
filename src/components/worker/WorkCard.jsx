import React, { useState } from 'react'
import Image from 'next/image';
import { BiMap } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from 'next/router';

const WorkCard = ({data}) => {

    const router = useRouter();

    const [bookmark, setBookmark] = useState(false);

    //console.log(data," hh");

    return (
        <div className="flex flex-col h-auto w-full  p-5 bg-white shadow-md border-2 cursor-default">

            <div className="flex flex-col ml-2">
                <h1 onClick={() => router.push({
                    pathname : "/wuser/works/"+data._id,
                    query: {
                        workName : data.workName,
                        workAddress : data.workAddress,
                        workDuration : data.workDuration,
                        workTime : data.workTime,
                        workDescription : data.workDescription,
                        workFrom : data.workFrom,
                        postTime : data.postTime,
                        employeerId : data.employeerId,
                        Worklocation : data.location.coordinates,
                    },
                },"/wuser/works/"+data._id)} className="text-base font-bold tetx-[#091e42] cursor-pointer">{data.workName}</h1>
                <h1 className="text-sm font-semibold text-gray-500">Hrushikesh Bhosale</h1>
                <div className="flex flex-row items-center mt-2">
                    <BiMap className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977] w-full">{data.workAddress}</h1>
                </div>
                <div className="flex flex-row items-center mt-1">
                    <BsStopwatch className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977]">{data.workTime}</h1>
                    {/* <div className="flex flex-row ml-2 gap-x-2">
                        <h1 className="text-sm text-[#696977] ">11:30</h1>
                        <h1 className="text-sm text-[#696977] ">to</h1>
                        <h1 className="text-sm text-[#696977] ">1:30</h1>
                    </div> */}
                </div>
                <div className="flex flex-row items-center mt-2">
                    <AiOutlineCalendar className="text-lg text-[#696977] mr-2" />
                    <h1 className="text-sm text-[#696977] w-full">{data.workFrom}</h1>
                </div>
                <div className="flex flex-row items-center mt-5 ">
                    <div className='flex flex-row items-center px-2 py-1 bg-[#f4f5f7]'>
                        <RxCounterClockwiseClock className="text-sm mr-2" />
                        <h1 className="text-xs font-semibold">{data.postTime}</h1>
                    </div>

                    <div onClick={()=>setBookmark(!bookmark)} className="flex flex-col ml-auto">
                        {
                            bookmark ? <FaBookmark className="text-lg cursor-pointer text-[#4a90e2]" /> :
                                <FaRegBookmark className="text-lg cursor-pointer" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkCard