import React from 'react'
import Image from 'next/image'
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
const WorkerProfileCard = ({ data }) => {

    //let profilePic ="https://res.cloudinary.com/dbp4j9qjh/image/upload/v1680285317/profileImages/lbq7vfdhjhq1m3okcu4p.jpg"

    const router = useRouter();

    return (
        <div className="flex flex-row shadow-sm bg-white p-7 rounded-3xl">
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
                <h1 className="text-xs font-semibold mt-1">+91-{data.phone}</h1>
                {/* <p className="text-sm mt-2 w-96 font-semibold ">{data.aboutMe}</p> */}
                {/* <div className="flex flex-row mt-3 gap-x-5">
                    <div className="flex flex-col">
                        <h1 className="text-base font-bold">7</h1>
                        <h1 className="text-xs font-medium ">works done</h1>
                    </div>

                    <div className="flex h-full w-[2px] bg-white" />
                </div> */}

                <div className="flex flex-row mt-5">
                    <button onClick={() => router.push({
                        pathname: "/wpuser/workers/[empid]",
                        query: { empid: data._id }
                    }, "/wpuser/workers/" + data._id)} className="px-5 py-2 text-sm font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-md">View profile</button>
                </div>
            </div>
        </div>
    )
}

export default WorkerProfileCard