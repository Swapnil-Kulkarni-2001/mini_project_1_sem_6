import React, { useEffect } from 'react'
import AccountSidePanel from '@/components/AccountSidePanel'
import Navbar from '@/components/workprovider/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import WorkProviderCard from '@/components/worker/homepage/WorkCard';
import { AiFillStar } from "react-icons/ai";
import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';


//icons
import { BsBookmarks } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsFillFilePostFill } from "react-icons/bs";

//store

import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmplr } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';
import { useRouter } from 'next/router';

const homepage = () => {


  const open = useSelector((state) => {
    return state.sideDrower.open;
  })

  const dispatch = useDispatch();

  const profilePic = useSelector(profilePicSelector);

  const userInfoData = useSelector(userInfoDataSelector);

  const router = useRouter();


  useEffect(() => {
    dispatch(fetchProfilePicEmplr());
    dispatch(fetchUserInfoEmplr());
  }, []);



  return (
    <div className="flex flex-col relative h-auto overflow-x-hidden bg-[#f5f5f5] ">
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

        <div className="flex flex-col  md:px-40 py-10 overflow-x-hidden">
          <div className="flex flex-row ">
            <div className="flex flex-col bg-white items-center md:py-8 md:px-5 border rounded-xl">
              <div>
                {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                <div className="bg-white rounded-full relative h-28 w-28 ">
                  {
                    profilePic == "" ? <FaUserCircle className="text-[7rem] text-[#d8d8d8]" />
                      :
                      <Image loader={() => profilePic} src={profilePic} alt="no image" fill={true} className="rounded-full" />
                  }
                </div>
              </div>
              <div className="flex flex-col mt-2 ml-2">
                <h1 className="text-lg font-semibold text-center">{userInfoData.name}</h1>
                <h1 className="text-sm text-center text-gray-600 font-bold">Work Provider</h1>
                <h1 className="text-sm text-gray-600 text-center">near sadhana highschool gadhinglaj</h1>
              </div>
              <div className="mt-5">
                <button onClick={() => router.push("/wpuser/profile")} className="border px-5 py-1 rounded-3xl text-blue-500 text-base font-semibold">Complete Profile</button>
              </div>
              <div onClick={() => router.push("/wpuser/homepage")} className="flex flex-row w-full items-center mt-10 cursor-pointer  border hover:bg-[#f7f7f9] px-5 py-[6px] rounded-3xl ">
                <div className='flex flex-row items-center  gap-x-3'>
                  <BsHouseDoor className="" />
                  <button className="text-gray-500 text-sm font-semibold">Home</button>
                </div>
              </div>
              <div onClick={() => router.push("/wpuser/postworks")} className="flex flex-row w-full items-center mt-5 cursor-pointer border hover:bg-[#f7f7f9]  px-5 py-[6px] rounded-3xl ">
                <div className='flex flex-row items-center  gap-x-3'>
                  <BsFillFilePostFill className="text-gray-500" />
                  <button className="text-gray-500 text-sm font-semibold">Posted Works</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col  ml-10  w-full  overflow-hidden ">
              <div className="flex flex-row p-5 items-center bg-white shadow-md">
                <h1 className="text-6xl text-gray-500 font-bold mr-3">22</h1>
                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                  <h1>Total</h1>
                  <h1>work posts</h1>
                </div>
                <div className="h-full w-[2px] bg-gray-500 mr-5" />
                <h1 className="text-6xl text-gray-500 font-bold mr-3">0</h1>
                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                  <h1>Responses by</h1>
                  <h1>worker</h1>
                </div>

                {/* <div className="h-full w-[2px] bg-gray-500 mr-5" />
                <h1 className="text-6xl text-gray-500 font-bold mr-3">0</h1>
                <div className="flex flex-col text-sm text-gray-600 font-bold mr-5">
                  <h1>Search</h1>
                  <h1>appearances</h1>
                </div> */}
              </div>

              <div className="flex flex-col mt-5 p-5 bg-white  rounded-2xl">
                <div className="flex flex-row items-center">
                  <h1 className="text-lg font-semibold mr-5">Recommended Workers</h1>
                  <h1 className="text-lg font-semibold text-blue-500 cursor-pointer">view all</h1>
                </div>

                <div className="flex flex-row mt-5 gap-x-5">
                  {/* <WorkProviderCard />
                  <WorkProviderCard /> */}
                  <h1 className="text-base text-center m-auto my-5 text-gray-500">No recommendation now, add some profession to see recommendation</h1>
                </div>
              </div>

              <div className="flex flex-col mt-5 p-5 bg-white  w-full  rounded-xl overflow-hidden ">
                <div className="flex flex-row items-center   text-base font-semibold text-[#121224]">
                  <h1 className="text-lg font-semibold mr-5">Work request</h1>
                  <h1 className="text-lg text-blue-500 cursor-pointer">view all</h1>
                </div>
                <div className='flex flex-row gap-x-10 h-full my-5 overflow-x-auto scrollbar'>
                  {/* <WorkProviderInvitesCard />
              <WorkProviderInvitesCard />
              <WorkProviderInvitesCard /> */}
                  <h1 className="text-base text-center m-auto my-5 text-gray-500">No recommendation now, add some profession to see recommendation</h1>
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