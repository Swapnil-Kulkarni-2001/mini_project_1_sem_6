import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { BiMap } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { RxCounterClockwiseClock } from "react-icons/rx";

import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountSidePanel from '@/components/AccountSidePanel';
import WorkApplicationCard from '@/components/workprovider/WorkApplicationCard';
import Navbar from '@/components/workprovider/Navbar';

import { fetchWorkPost,deleteWorkPost } from '@/store/workprovider/workpost/slice';

import { workPostSelector,isLoadingSelector } from '@/store/workprovider/workpost/selector';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const postworkid = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const router = useRouter();

    const data = useSelector(workPostSelector);

    const dataLoading = useSelector(isLoadingSelector);

    dayjs.extend(relativeTime);

    let postTime;

    const[check,setCheck] = useState(0);

    if(data)
    {
        postTime = dayjs(data.postTime).fromNow();
    }


    console.log(router.query.postworkid,"mm");

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchWorkPost({
            workid : router.query.postworkid
        }))
    },[router.query.postworkid]);

    //console.log(data);

    const [bookmark, setBookmark] = useState(false);

    

    const onBtnDeleteClicked = ()=>{
        dispatch(deleteWorkPost({
            workid : data._id,
        }));

        router.replace("/wpuser/postworks");
    }



    
    if(dataLoading || data===undefined)
    {
        console.log(data, " ",dataLoading)
        return <h1>Loading</h1>
    }


    return (
        <div className="flex flex-col h-auto bg-[#f7f7f7]">
            <Navbar />
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



            <div className="flex flex-col px-40 py-10">
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
                            <div className="flex flex-row ml-2 gap-x-2">
                                <h1 className="text-sm text-[#696977] ">{data.workTime}</h1>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <AiOutlineCalendar className="text-lg text-[#696977] mr-2" />
                            <h1 className="text-sm text-[#696977] w-full">{data.workFrom}</h1>
                        </div>
                        <div className="flex flex-row mt-7">
                            <button className="px-5 py-1 border border-green-400 text-green-400  font-semibold mr-5 hover:shadow-xl">ASSIGNED TO</button>
                            <button onClick={onBtnDeleteClicked} className="px-5 py-1 bg-red-500 text-white font-semibold  hover:shadow-xl">DELETE</button>


                            <div className='flex flex-row ml-auto self-end'>
                                <h1 className="text-sm text-[#696977]">posted:</h1>
                                <h1 className="text-sm text-gray-900 font-semibold">&nbsp;{postTime}</h1>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-5 bg-white mx-20 px-10 py-10 rounded-lg">
                    <h1 className="text-lg font-bold text-[#091e42]">Work description</h1>
                    <p className="text-sm text-[#696977] mt-5">
                        {
                            data.workDescription
                        }
                    </p>
                </div>

                <div className="flex flex-col mt-5 bg-white mx-20 px-10 py-10 rounded-lg">
                    <h1 className="text-lg font-bold text-[#091e42]">Total Applications</h1>
                    <div className="flex flex-col mt-5 gap-y-5">
                        <WorkApplicationCard />
                        <WorkApplicationCard />
                        <WorkApplicationCard />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default postworkid;