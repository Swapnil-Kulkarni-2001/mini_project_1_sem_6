import AccountSidePanel from '@/components/AccountSidePanel'
import FNavbar from '@/components/FNavbar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import WorkCard from '@/components/worker/homepage/WorkCard';
import { AiFillStar } from "react-icons/ai";
import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';



//store imports
import { fetchRecommendedWorks } from '@/store/worker/work/slice';
import { recommendedWorksSelector, recommendedWorksLoadingSelector } from '@/store/worker/work/selector';

import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';


const homepage = () => {


    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const profilePic = useSelector(profilePicSelector);

    const profilePicLoading = useSelector(profilePicLoadingSelector);

    // const myLoader = ({ src, width, quality }) => {
    //     return src;
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecommendedWorks());
        dispatch(fetchProfilePicEmp());
    }, []);

    const recommendedWorks = useSelector(recommendedWorksSelector);
    const recommendedWorksLoading = useSelector(recommendedWorksLoadingSelector);

    console.log(recommendedWorks, " ", recommendedWorksLoading);


    return (
        <div className="flex flex-col relative h-auto overflow-x-hidden bg-[#f5f5f5]">
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

                <div className="flex flex-col  md:px-40 py-10 overflow-x-hidden">
                    <div className="flex flex-row ">
                        <div className="flex flex-col bg-white w-[25rem] items-center md:py-8 md:px-5 border rounded-xl">
                            <div>
                                {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                                <div className="bg-white rounded-full relative h-28 w-28 ">
                                    {/* <FaUserCircle className="text-8xl text-[#d8d8d8]" /> */}
                                    {
                                        profilePic == "" ? <FaUserCircle className="text-8xl text-[#d8d8d8]" />
                                            :
                                            <Image loader={() => profilePic} src={profilePic} alt="no image" fill={true} className="rounded-full" />
                                    }

                                </div>
                            </div>
                            <div className="flex flex-col mt-2 ml-2">
                                <h1 className="text-lg font-semibold text-center">Swapnil Kulkarni</h1>
                                <h1 className="text-sm text-center text-gray-600 font-bold">Worker</h1>
                                <h1 className="text-sm text-gray-600 text-center">near sadhana highschool gadhinglaj</h1>

                            </div>
                            <div className="mt-5">
                                <button className="bg-[#457eff] px-5 py-1 rounded-3xl text-white text-lg font-semibold">Complete Profile</button>
                            </div>
                        </div>

                        <div className="flex flex-col  ml-10  w-full  overflow-hidden ">
                            <div className="flex flex-row p-5 items-center bg-white shadow-md">
                                <h1 className="text-6xl text-gray-500 font-bold mr-3">22</h1>
                                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                                    <h1>Total</h1>
                                    <h1>applies</h1>
                                </div>
                                <div className="h-full w-[2px] bg-gray-500 mr-5" />
                                <h1 className="text-6xl text-gray-500 font-bold mr-3">0</h1>
                                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                                    <h1>Responses by</h1>
                                    <h1>people</h1>
                                </div>

                                <div className="h-full w-[2px] bg-gray-500 mr-5" />
                                <h1 className="text-6xl text-gray-500 font-bold mr-3">0</h1>
                                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                                    <h1>Search</h1>
                                    <h1>appearances</h1>
                                </div>
                            </div>

                            <div className="flex flex-col mt-5 p-5 bg-white h-full rounded-2xl">
                                <div className="flex flex-row items-center">
                                    <h1 className="text-lg font-semibold mr-5">Recommended works</h1>
                                    <h1 className="text-lg font-semibold text-blue-500 cursor-pointer">view all</h1>
                                </div>

                                <div className="flex flex-row mt-5 gap-x-5">
                                    {/* <WorkCard />
                                    <WorkCard /> */}
                                    {
                                        recommendedWorks.map((item, key) => {
                                            if (key > 1) {
                                                return;
                                            }
                                            return (
                                                <WorkCard
                                                    workName={item.workName}
                                                    employeerName={item.employeerName}
                                                    workAddress={item.workAddress}
                                                    workDuration={item.workDuration}
                                                    workTime={item.workTime}
                                                    workDescription={item.workDescription}
                                                    workFrom={item.workFrom}
                                                    postTime={item.postTime}
                                                    employeerId={item.employeerId}
                                                    workId={item._id}
                                                    // data={item}
                                                    key={key} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col mt-10 p-5 bg-white  w-full  rounded-xl overflow-hidden ">
                        <div className="flex flex-row items-center   text-base font-semibold text-[#121224]">
                            <h1 className="text-lg font-semibold mr-5">Work invites</h1>
                            <h1 className="text-lg text-blue-500 cursor-pointer">view all</h1>
                        </div>
                        <div className='flex flex-row gap-x-10 h-full mt-5 overflow-x-auto scrollbar'>
                            <WorkCard />
                            <WorkCard />
                            <WorkCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homepage