import AccountSidePanel from '@/components/AccountSidePanel'
import FNavbar from '@/components/FNavbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
// import WorkCard from '@/components/worker/homepage/WorkCard';
import WorkCard from '@/components/worker/WorkCard';
import { AiFillStar } from "react-icons/ai";
import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';

//icons
import { BsBookmarks } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
//

//store imports
import { fetchRecommendedWorks, fetchInvitationList } from '@/store/worker/work/slice';
import { recommendedWorksSelector, recommendedWorksLoadingSelector, invitedWorksSelector, invitedWorksLoadingSelector } from '@/store/worker/work/selector';

import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmp } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';
import { useRouter } from 'next/router';


const homepage = () => {


    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const router = useRouter();

    const profilePic = useSelector(profilePicSelector);

    const profilePicLoading = useSelector(profilePicLoadingSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecommendedWorks());
        dispatch(fetchInvitationList());
        dispatch(fetchProfilePicEmp());
        dispatch(fetchUserInfoEmp());
    }, []);

    const recommendedWorks = useSelector(recommendedWorksSelector);
    const recommendedWorksLoading = useSelector(recommendedWorksLoadingSelector);

    const invitaionList = useSelector(invitedWorksSelector);
    const invitaionListLoading = useSelector(invitedWorksLoadingSelector);

    const userInfoData = useSelector(userInfoDataSelector);
    const userInfoDataLoading = useSelector(userInfoDataLoadingSelector);

    console.log(userInfoData);

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
                        <div className="flex flex-col bg-white  items-center md:py-8 md:px-5 border rounded-xl">
                            <div className="">
                                {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                                <div className="rounded-full relative h-28 w-28 ">
                                    {/* <FaUserCircle className="text-8xl text-[#d8d8d8]" /> */}
                                    {
                                        profilePic == "" ? <FaUserCircle className="text-[7rem] text-[#d8d8d8]" />
                                            :
                                            <Image loader={() => profilePic} src={profilePic} alt="no image" fill={true} className="rounded-full" />
                                    }

                                </div>
                            </div>
                            <div className="flex flex-col mt-2 ml-2">
                                <h1 className="text-lg font-semibold text-center">{userInfoData.name}</h1>
                                <h1 className="text-sm text-center text-gray-600 font-bold">{userInfoData.occuopation}</h1>
                                <h1 className="text-sm text-gray-600 text-center">near sadhana highschool gadhinglaj</h1>

                            </div>
                            <div className="mt-5">
                                <button onClick={() => router.push("/wuser/profile")} className="border px-5 py-1 rounded-3xl text-blue-500 text-base font-semibold">Complete Profile</button>
                            </div>
                            <div onClick={() => router.push("/wuser/homepage")} className="flex flex-row w-full items-center mt-10 cursor-pointer  border hover:bg-[#f7f7f9] px-5 py-[6px] rounded-3xl ">
                                <div className='flex flex-row items-center  gap-x-3'>
                                    <BsHouseDoor className="" />
                                    <button className="text-gray-500 text-sm font-semibold">Home</button>
                                </div>
                            </div>
                            <div onClick={() => router.push("/wuser/works")} className="flex flex-row w-full items-center mt-5 cursor-pointer border hover:bg-[#f7f7f9]  px-5 py-[6px] rounded-3xl ">
                                <div className='flex flex-row items-center  gap-x-3'>
                                    <MdWorkOutline className="" />
                                    <button className="text-gray-500 text-sm font-semibold">Works</button>
                                </div>
                            </div>
                            <div onClick={() => router.push("/wuser/works/bookmarks")} className="flex flex-row w-full items-center mt-5 cursor-pointer  border hover:bg-[#f7f7f9] px-5 py-[6px] rounded-3xl ">
                                <div className='flex flex-row items-center  gap-x-3'>
                                    <BsBookmarks className="" />
                                    <button className="text-gray-500 text-sm font-semibold">Bookmarks</button>
                                </div>
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

                            <div className="flex flex-col mt-5 p-5 bg-white rounded-2xl">
                                <div className="flex flex-row items-center">
                                    <h1 className="text-lg font-semibold mr-5">Recommended works</h1>
                                    <h1 onClick={() => router.push("/wuser/works")} className="text-lg font-semibold text-blue-500 cursor-pointer">view all</h1>
                                </div>

                                <div className="flex flex-row mt-5 gap-x-5">
                                    {
                                        recommendedWorks.map((item, key) => {
                                            if (key > 1) {
                                                return;
                                            }
                                            return (
                                                <WorkCard data={item} key={key} />
                                            )
                                        })
                                    }
                                    {
                                        recommendedWorks == "" || recommendedWorks == [] || recommendedWorks == undefined ?
                                            <h1 className="text-base text-center m-auto mt-5 text-gray-500">No recommendation now, add some profession to see recommendation</h1>
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col mt-5 p-5 bg-white rounded-2xl">
                                <div className="flex flex-row items-center   text-base font-semibold text-[#121224]">
                                    <h1 className="text-lg font-semibold mr-5">Work invites</h1>
                                    <h1 onClick={() => router.push("/wuser/works/invites")} className="text-lg text-blue-500 cursor-pointer">view all</h1>
                                </div>
                                <div className='flex flex-row gap-x-10 h-full mt-5 overflow-x-auto scrollbar'>
                                    {
                                        invitaionList.map((item, key) => {
                                            if (key > 1 || item == null) {
                                                return;
                                            }
                                            return (
                                                <WorkCard
                                                    data={item}
                                                    key={key} />
                                            )
                                        })
                                    }
                                    {
                                        invitaionList == "" || invitaionList == [] || invitaionList == undefined || invitaionList == null ?
                                            <h1 className="text-base text-center m-auto my-14 text-gray-500">No invitaion list now, you will get notified here when someone request you</h1>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homepage