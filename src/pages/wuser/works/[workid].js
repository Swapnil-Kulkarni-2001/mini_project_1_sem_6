import React, { useState } from 'react'
import Image from 'next/image';
import { BiMap } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import FNavbar from '@/components/FNavbar';
import AccountSidePanel from '@/components/AccountSidePanel';

import { userIdSelector } from '@/store/auth/selector';

import { applyWork } from '@/store/applyWork/slice';

const Workpage = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    });

    const dispatch = useDispatch();

    const [isApplied,setIsApplied] = useState(false);

    const [isWorkRequestFromEmployeer,setIsWorkRequestFromEmployeer] = useState(false);

    const userId = useSelector(userIdSelector);

    const [bookmark, setBookmark] = useState(false);

    const router = useRouter();

    const data = router.query;


    console.log(data);
    console.log(userId);

    if(data.applicationId)
    {
        console.log("it consists");
        for(let i = 0; i<data.applicationId.length; i++)
        {
            if(data.applicationId[i]===userIdSelector)
            {
                console.log("yes you applied");
                setIsApplied(true);
            }
        }
    }

    const onBtnApplyClicked = ()=>{
        console.log("clicked");
        dispatch(applyWork(data.workid));
    }

    return (
        <div className="flex flex-col h-auto bg-[#f7f7f7]">
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
            </div>



            <div className="flex flex-col h-[100vh] px-40 py-10">
                <div className="flex flex-col mx-20 px-10 py-10 bg-white h-auto rounded-lg">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-[#091e42] cursor-pointer">{data.workName}</h1>
                        <h1 className="text-sm mt-2 text-gray-700">Hrushikesh Bhosale</h1>
                        <div className="flex flex-row items-center mt-5">
                            <BiMap className="text-xl text-[#696977] mr-2" />
                            <h1 className="text-sm text-[#696977] w-full">{data.workAddress}</h1>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <BsStopwatch className="text-lg text-[#696977] mr-2" />
                            <h1 className="text-sm text-[#696977]">{data.workDuration}</h1>
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
                        <div className="flex flex-row mt-7">
                            {
                                isWorkRequestFromEmployeer ? <button className="px-5 py-1 bg-green-400 text-white font-semibold hover:shadow-xl">ACCEPT</button>
                                :
                                isApplied ? <button className="px-5 py-1 border border-[#4a90e2] text-[#4a90e2] font-semibold mr-5 hover:shadow-xl">APPLIED</button>
                                :
                                <button onClick={onBtnApplyClicked} className="px-5 py-1 bg-[#4a90e2] text-white font-semibold mr-5 hover:shadow-xl">APPLY</button>
                            }
                            
                            

                            <div className='flex flex-row ml-auto self-end'>
                                <h1 className="text-sm text-[#696977]">posted:</h1>
                                <h1 className="text-sm text-gray-900 font-semibold">&nbsp; {data.postTime}</h1>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-10 bg-white mx-20 px-10 py-10 rounded-lg">
                    <h1 className="text-lg font-bold text-[#091e42]">Work description</h1>
                    <p className="text-sm text-[#696977] mt-5">
                        {
                            data.workDescription
                        }
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Workpage