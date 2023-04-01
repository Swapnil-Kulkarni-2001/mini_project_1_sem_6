import React from 'react'
import Image from 'next/image'
import { FaUserCircle } from "react-icons/fa";
import axios from "../../Axios/axios";
const WorkAssignedCard = ({ emp_id, name, phone, profileImg,reload,workid }) => {


    const onBtnRemoveClicked = async() => {
        try {

            const resp = await axios.post("/employeer/removeEmployee", {
                postId: workid,
                employeeId: emp_id
            });

            console.log(resp.data);

            if (resp.data.status == "successfully employee removed to assigned List") {
                reload();
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-col p-5 border">
            <div className="flex flex-row items-center">
                <div>
                    {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                    <div className="bg-white rounded-full relative h-20 w-20 ">
                        {
                            profileImg == undefined || profileImg == null || profileImg == "" ? <FaUserCircle className="text-[5rem] text-[#d8d8d8]" />
                                :
                                <Image loader={() => profileImg} src={profileImg} alt="no image" fill={true} className="rounded-full" />
                        }
                    </div>
                </div>

                <div className="flex flex-col self-start ml-4 ">
                    <h1 className="text-base font-semibold">{name}</h1>
                    <h1 className="text-xs font-semibold text-gray-600">{phone}</h1>
                    <div className='flex flex-row mt-2'>
                        <button onClick={onBtnRemoveClicked} className="px-3 py-[1px] border border-red-500 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white">remove</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WorkAssignedCard