import React, { useEffect, useState } from 'react'
import FNavbar from '@/components/FNavbar'
import { useSelector, useDispatch } from 'react-redux'
import AccountSidePanel from '@/components/AccountSidePanel'
import { FaUserCircle } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import ProgressBar from '@/components/ProgressBar';
import WorkAbility from '@/components/WorkAbility';
import { BsPencil } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Image from 'next/image';

import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmp } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';
import WorkAbilityDelete from '@/components/WorkAbilityDelete';
import { useRef } from 'react';

import axios from '../../../Axios/axios';

const profile = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })


    const [reloadData, setReloadData] = useState(0);

    const inputSkillData = useRef();

    const inputProfileSummary = useRef();

    const [showSkillModel, setShowSkillModel] = useState(false);

    const [showProfileSummary, setShowProfileSummary] = useState(false);

    const profilePic = useSelector(profilePicSelector);

    const profilePicLoading = useSelector(profilePicLoadingSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfilePicEmp());
        dispatch(fetchUserInfoEmp());
    }, [reloadData]);

    const userInfoData = useSelector(userInfoDataSelector);
    const userInfoDataLoading = useSelector(userInfoDataLoadingSelector);

    console.log(userInfoData.skills, "my skills");

    if (userInfoData.skills != undefined) {
        userInfoData.skills.map((val, index) => {
            console.log(val);
        });
    }


    const reload = () => {
        setReloadData(reloadData + 1);
    }

    const uploadSkills = async () => {

        let inskill = inputSkillData.current.value;
        if (inskill == "" || inskill == undefined || inskill == null) {
            return;
        }

        try {
            const resp = await axios.post("/employee/updateSkills", {
                skills: inskill
            });

            if (resp.data.status == "succesfully skills updated") {
                reload();
                inputSkillData.current.value = "";
            }

        } catch (error) {
            console.log(error);
        }

    }

    const updateProfileSummary = async() => {

        let inProfileSummary = inputProfileSummary.current.value;
        if (inProfileSummary == "" || inProfileSummary == undefined || inProfileSummary == null) {
            return;
        }

        try {
            const resp = await axios.post("/employee/updateAboutMe", {
                aboutMe: inProfileSummary
            });

            if (resp.data.status == "succesfully profile updated") {
                reload();
                setShowProfileSummary(!showProfileSummary);
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex flex-col relative h-auto overflow-x-hidden bg-[#f8f8f8]">
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

                <div className="flex flex-col md:px-40 py-10">
                    <div className='flex flex-col mx-20 p-5 bg-[#4a90e2] h-60 rounded-2xl'>
                        <div className="flex flex-row">
                            <div className="">
                                <div className="bg-white rounded-full relative h-28 w-28 ">
                                    {/* <FaUserCircle className="text-8xl text-[#d8d8d8]" /> */}
                                    {
                                        profilePic == undefined ? <FaUserCircle className="text-[7rem] text-[#d8d8d8]" />
                                            :
                                            <Image loader={() => profilePic} src={profilePic} alt="no image" fill={true} className="rounded-full" />
                                    }

                                </div>
                            </div>
                            <div className="flex flex-col ml-5  ">
                                <h1 className="text-xl text-white font-bold">{userInfoData.name}</h1>
                                <div className="flex flex-col mt-8">
                                    <div className="flex flex-row items-center ">
                                        <div className="flex flex-row items-center">
                                            <BiMap className="text-white text-lg mr-4" />
                                            <h1 className="text-md text-white ">{userInfoData.address}</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <BsTelephone className="text-white text-lg mr-4" />
                                            <h1 className="text-md text-white ">+91-{userInfoData.phone}</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center mt-2">
                                        <div className="flex flex-row items-center">
                                            <RiUserSettingsLine className="text-white text-xl mr-4" />
                                            <h1 className="text-md text-white ">Worker</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <AiOutlineMail className="text-white text-xl mr-4" />
                                            <h1 className="text-md text-white ">{userInfoData.email}</h1>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <ProgressBar bgcolor="white" progress='20' height={4} />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex flex-col bg-[#1a69c4] p-10 items-center m-auto">
                                <h1 className="text-8xl text-white">4.4</h1>
                            </div> */}

                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 my-10 px-5 py-5   shadow-md overflow-x-hidden" >
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Profile Summary</h1>
                            <BsPencil onClick={() => setShowProfileSummary(!showProfileSummary)} className="text-xl text-blue-600 ml-5 cursor-pointer" />
                        </div>
                        <div className="flex flex-col mt-5">

                            {
                                userInfoData.aboutMe == null ? <h1 className="text-sm text-gray-500 text-center self-center mb-5">a good profile summary can attract people</h1>
                                    :
                                    <p className="text-sm text-gray-500">{userInfoData.aboutMe}</p>
                            }


                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 mb-10 px-5 py-5 shadow-md overflow-x-hidden">
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Key profession</h1>
                            <BsPencil onClick={() => setShowSkillModel(!showSkillModel)} className="text-xl text-blue-600 ml-5 cursor-pointer" />
                        </div>
                        <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 mt-5 h-full pb-3 ">
                            {/* <WorkAbility work="Cooking" />
                            <WorkAbility work="Plumbing" />
                            <WorkAbility work="Cleaning" />
                            <WorkAbility work="Cooking" /> */}
                            {
                                userInfoData.skills != undefined ? userInfoData.skills.map((val, index) => <WorkAbility work={val} key={index} />) :
                                    <h1 className="text-sm text-gray-500">Add profession for further process</h1>
                            }
                        </div>
                    </div>

                    <div className={`absolute ${showSkillModel ? "flex flex-col" : "hidden"} overflow-x-auto p-5 bg-white h-[20rem] w-[30rem] top-0 bottom-0 left-0 right-0 m-auto z-10 shadow-2xl`}>

                        <AiOutlineClose onClick={() => setShowSkillModel(!showSkillModel)} className="self-end cursor-pointer" />

                        <div className="flex flex-row gap-x-5 overflow-x-auto scrollbar p-5">
                            {
                                userInfoData.skills !== undefined ? userInfoData.skills.map((val, index) => <WorkAbilityDelete reload={reload} work={val} key={index} />) : null
                            }
                        </div>
                        <div className="flex flex-col mt-5 px-5">
                            <div className="flex flex-row items-center border hover:border-2 hover:border-blue-500">
                                <input ref={inputSkillData} type="text" placeholder="type profession eg: Cooking" className="p-2 outline-none basis-2/3" required />
                                <div className="flex flex-col items-center bg-blue-500 ml-auto h-full px-3">
                                    <AiOutlinePlus onClick={uploadSkills} className="m-auto text-xl text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`absolute ${showProfileSummary ? "flex flex-col" : "hidden"} overflow-x-auto p-5 bg-white h-[20rem] w-[30rem] top-0 bottom-0 left-0 right-0 m-auto z-10 shadow-2xl`}>

                        <AiOutlineClose onClick={() => setShowProfileSummary(!showProfileSummary)} className="self-end cursor-pointer" />

                        <div className="flex flex-col mt-5 px-5 h-3/5">
                            <textarea ref={inputProfileSummary}  className="border h-full text-sm p-5 focus:outline-blue-500"/>
                            <button onClick={updateProfileSummary} className="px-5 py-2 text-sm font-semibold bg-blue-500 text-white mt-5">update</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default profile