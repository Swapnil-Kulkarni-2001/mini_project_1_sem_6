import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { openToggle } from '@/store/accountSidePanel/slice';
import { FaUserCircle } from "react-icons/fa";

import { FaLongArrowAltRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { useRouter } from 'next/router';
import Image from 'next/image';


const AccountSidePanel = () => {

  const dispatch = useDispatch();

  const router = useRouter();

  const open = useSelector((state) => {
    return state.sideDrower.open;
  })

  const myLoader = ({ src, width, quality }) => {
    return `https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=`
  }

  console.log(open)

  return (
    <div className="flex flex-col items-center h-full rounded-tl-3xl rounded-bl-3xl bg-white shadow-2xl py-5 px-5">
      <div className="flex flex-row ml-auto">
        <AiOutlineClose className="text-2xl text-gray-500 " onClick={() => dispatch(openToggle(open))} />
      </div>
      <div className="flex flex-row w-full mt-2 pr-5 cursor-pointer" onClick={() => {
        router.push("/profile")
        dispatch(openToggle(open))
      }}>
        <div className="flex flex-col relative rounded-full w-[35%] h-24 bg-red-300">
          {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
          <Image alt="no image" fill={true} className="rounded-full" loader={myLoader} src="https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q="/>
        </div>
        <div className="flex flex-col mt-2 ml-2 ">
          <h1 className="text-xl font-semibold">Swapnil Kulkarni</h1>
          <h1 className="text-sm text-gray-600">near sadhana highschool gadhinglaj</h1>
        </div>
      </div>
      <div className="flex flex-col mt-5 w-full">
        <div className={`border-2 hover:cursor-pointer px-10 py-5 mr-5 rounded-2xl`}>
          <h1 className="text-[#457eff] text-lg font-medium">Update your profile</h1>
          <div className="flex flex-row items-center w-full">
            <h1 className="text-sm text-gray-400">help people to find you</h1>
            <FaLongArrowAltRight className="text-xl ml-auto text-gray-600" />
          </div>
        </div>

        <div className="flex flex-row mt-10 items-center cursor-pointer">
          <AiOutlineSetting className="text-xl mr-3 text-[#8294bb]" />
          <h1 className="text-sm text-gray-600">Settings</h1>
        </div>

        <div className="flex flex-row mt-5 items-center cursor-pointer">
          <FiLogOut className="text-xl mr-3 text-[#8294bb]" />
          <h1 className="text-sm text-gray-600">Logout</h1>
        </div>
      </div>
    </div>
  )
}

export default AccountSidePanel