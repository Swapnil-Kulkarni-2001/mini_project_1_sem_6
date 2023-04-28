import React from 'react'
import Image from 'next/image'
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
const WorkerProfileCard = ({ data }) => {

    const router = useRouter();

    return (
        <div className="flex flex-row font-OpenSans bg-white p-7 rounded-3xl h-40 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex flex-col ">
                <div className="bg-white rounded-full relative p-1 w-20 h-20">
                    {
                        data.profileImg == "" || data.profileImg == undefined ? <FaUserCircle className="text-[5rem] text-[#d8d8d8]" />
                            :
                            <Image loader={() => data.profileImg} src={data.profileImg} alt="no image" fill={true} className="rounded-full" />
                    }
                </div>
            </div>

            <div className="flex flex-col ml-7 ">
                <h1 className="text-xl font-bold">{data.name}</h1>
                <div className="flex flex-row items-center">
                    <p className="text-xs font-semibold mt-1 max-w-[3rem] truncate">+91-{data.phone}</p>
                    <p className="text-xs font-semibold">********</p>
                </div>
                <div className="flex flex-row mt-5">
                    <button onClick={() => router.push({
                        pathname: "/wpuser/workers/[empid]",
                        query: { empid: data._id }
                    }, "/wpuser/workers/" + data._id)} className="px-5 py-2 text-sm font-semibold border bg-[#e7f3ff] hover:bg-[#dae6f1] hover:text-[#1771e6] text-blue-500 rounded-md">View profile</button>
                </div>
            </div>
        </div>
    )
}

export default WorkerProfileCard