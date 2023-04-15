import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountSidePanel from '@/components/AccountSidePanel'
import Navbar from '@/components/workprovider/Navbar'

import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { fetchUserInfoEmplr } from '@/store/userInfo/slice';

//

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
//

import { FiSend } from "react-icons/fi";



import { fetchWorkerDataById } from '@/store/workprovider/workers/slice';
import { singleWorkerDataSelector, singleWorkerDataLoadingSelector } from '@/store/workprovider/workers/selector';

import { fetchAllWorkPost } from '@/store/workprovider/workpost/slice';

import { allWorkPostSelector, workPostSelector, isLoadingSelector } from '@/store/workprovider/workpost/selector';
import SmallWorkCard from '@/components/workprovider/SmallWorkCard';


const WorkersPage = () => {


    const [showWorkPosts, setShowWorkPosts] = useState(false);

    const open = useSelector((state) => {
        return state.sideDrower.open;
    });

    const [reloadData, setReloadData] = useState(0);

    const reload = () => {
        setReloadData(reloadData + 1);
    }

    const workerData = useSelector(singleWorkerDataSelector);

    const workerDataLoading = useSelector(singleWorkerDataLoadingSelector);

    const allWorkPostData = useSelector(allWorkPostSelector);

    console.log(allWorkPostData, "asc")

    const dispatch = useDispatch();

    const router = useRouter();

    console.log(workerData.skills, " sksks");


    useEffect(() => {
        dispatch(fetchProfilePicEmplr());
        dispatch(fetchUserInfoEmplr());
        dispatch(fetchAllWorkPost());
        if (router.query.empid != undefined) {
            dispatch(fetchWorkerDataById({
                emp_id: router.query.empid
            }));
        }


    }, [router.query.empid,reloadData]);

    const profilePic = undefined;

    if (workerDataLoading || workerData == undefined) {
        // dispatch(fetchWorkerDataById({
        //     emp_id: router.query.emp_id
        // }));
        return <h1>Loading</h1>
    }

    const onBtnRequestClicked = () => {
        setShowWorkPosts(true);
    }

    return (
        <div className="flex flex-col h-auto overflow-x-hidden bg-[#eff1f7]">
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

                <div className="flex flex-col md:px-40 py-10">
                    <div className='flex flex-col mx-20 p-5 bg-white  rounded-xl'>

                        <div className="mb-5 ml-5">
                            <h1 className="text-xl font-bold">Profile Details</h1>
                        </div>

                        <div className="flex flex-row ml-5">
                            <div className="">
                                <div className="bg-white rounded-full relative h-28 w-28 ">
                                    {
                                        workerData.profileImg == undefined ? <FaUserCircle className="text-[7rem] text-[#d8d8d8]" />
                                            :
                                            <Image loader={() => workerData.profileImg} src={workerData.profileImg} alt="no image" fill={true} className="rounded-full" />
                                    }

                                </div>
                            </div>
                            <div className="flex flex-col ml-10 ">
                                <h1 className="text-lg text-black font-bold">{workerData.name}</h1>
                                <div className="flex flex-col mt-5">
                                    <div className="flex flex-row items-center ">
                                        <div className="flex flex-row items-center">
                                            <BiMap className="text-black text-lg mr-4" />
                                            <h1 className="text-md text-black ">{workerData.address}</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <BsTelephone className="text-black text-lg mr-4" />
                                            <h1 className="text-md text-black ">+91-90********</h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-row items-center mt-2">
                                        <div className="flex flex-row items-center">
                                            <RiUserSettingsLine className="text-black text-xl mr-4" />
                                            <h1 className="text-md text-black ">Worker</h1>
                                        </div>
                                        <div className="flex flex-row items-center ml-16">
                                            <AiOutlineMail className="text-black text-xl mr-4" />
                                            <h1 className="text-md text-black ">{workerData.email}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-5 mb-1">
                                        <div className="flex flex-row items-center px-5 py-1 border border-blue-500  hover:shadow-inner ">
                                            <FiSend className="mr-2 text-blue-500" />
                                            <button onClick={onBtnRequestClicked} className="text-blue-500 font-semibold ">REQUEST</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 my-10 px-5 py-5 overflow-x-hidden" >
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Profile Summary</h1>
                            {/* <BsPencil onClick={() => setShowProfileSummary(!showProfileSummary)} className="text-xl text-blue-600 ml-5 cursor-pointer" /> */}
                        </div>
                        <div className="flex flex-col mt-5">

                            {
                                workerData.aboutMe == null ? <h1 className="text-sm text-gray-500 text-center self-center mb-5">no summery is specified yet</h1>
                                    :
                                    <p className="text-sm text-gray-500">{workerData.aboutMe}</p>
                            }


                        </div>
                    </div>

                    <div className="flex flex-col bg-white mx-20 mb-10 px-5 py-5 overflow-x-hidden">
                        <div className="flex flex-row items-center">
                            <h1 className='text-lg font-bold text-[#333333]'>Key profession</h1>
                            {/* <BsPencil onClick={() => setShowSkillModel(!showSkillModel)} className="text-xl text-blue-600 ml-5 cursor-pointer" /> */}
                        </div>
                        <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 mt-5 h-full pb-3 ">
                            {/* <WorkAbility work="Cooking" />
                            <WorkAbility work="Plumbing" />
                            <WorkAbility work="Cleaning" />
                            <WorkAbility work="Cooking" /> */}
                            {
                                workerData.skills.length != 0 ? workerData.skills.map((val, index) => <WorkAbility work={val} key={index} />) :
                                    <h1 className="text-sm text-gray-500 text-center m-auto mb-5">no profession/skill added yet</h1>
                            }
                        </div>
                    </div>

                    <div className={`absolute ${showWorkPosts ? "flex flex-col" : "hidden"} overflow-y-auto  bg-white h-[30rem] w-[30rem] top-0 bottom-0 left-0 right-0 m-auto z-10 drop-shadow-2xl`}>
                        <div className="flex flex-row items-center m-5 self-end">
                            <AiOutlineClose onClick={() => setShowWorkPosts(false)} className="text-xl cursor-pointer" />
                        </div>
                        <div className="flex flex-col gap-y-5 pb-10 px-10">
                            {/* <SmallWorkCard/> */}
                            {
                                allWorkPostData.map((item, key) => (
                                    <SmallWorkCard data={item} emp_id={router.query.empid} invitationList={workerData.jobInvitation} reload={reload} key={key} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkersPage