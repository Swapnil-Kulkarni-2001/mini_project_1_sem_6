import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaUserCircle } from "react-icons/fa";
import axios from "../../Axios/axios";
import { useRouter } from 'next/router';
const WorkApplicationCard = ({ data, workid, reload, assigned }) => {


    const router = useRouter();


    //console.log(assigned);

    console.log(data);

    //const [assigned,setAssigned] = useState(false);

    const onBtnAcceptClicked = async () => {
        try {

            const resp = await axios.post("/employeer/acceptEmployee", {
                postId: workid,
                employeeId: data._id
            });

            console.log(resp.data);

            if (resp.data.status == "successfully employee added to assigned List") {
                reload();
            }

        } catch (error) {
            console.log(error);
        }
    }



    // useEffect(() => {



    // }, []);

    return (
        <div className="flex flex-col p-5 border">
            <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                    {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                    <div className="bg-white rounded-full relative h-20 w-20 ">
                        {/* <FaUserCircle className="text-[5rem] text-[#d8d8d8]" /> */}
                        {
                            data.profileImg == undefined || data.profileImg == null || data.profileImg == "" ? <FaUserCircle className="text-[5rem] text-[#d8d8d8]" />
                                :
                                <Image loader={() => data.profileImg} src={data.profileImg} alt="no image" fill={true} className="rounded-full" />
                        }
                        {/* <Image loader={() => data.profileImg} src={data.profileImg} alt="no image" fill={true} className="rounded-full" /> */}
                    </div>
                </div>

                <div className="flex flex-col self-start ml-4 ">
                    <h1 onClick={() => router.push({
                        pathname: "/wpuser/workers/[empid]",
                        query: { empid: data._id }
                    }, "/wpuser/workers/" + data._id)} className="text-base font-semibold cursor-pointer">{data.name}</h1>
                    <h1 className="text-sm font-semibold text-gray-600">{data.phone}</h1>
                    <div className='flex flex-row mt-2'>

                        {
                            assigned ? <button className="px-3 py-[2px] border border-[#4a90e2] hover:bg-blue-100 text-sm text-[#4a90e2] mr-3">ACCEPTED</button>
                                :
                                <button onClick={onBtnAcceptClicked} className="px-3 py-[2px] bg-[#4a90e2] text-sm text-white mr-3">ACCEPT</button>
                        }

                        {/* <button className="px-3 py-[2px] bg-red-500 text-sm text-white">REJECT</button> */}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WorkApplicationCard