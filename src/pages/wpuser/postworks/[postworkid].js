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

import { fetchWorkPost, deleteWorkPost, fetchApplicantList, fetchAssignedList } from '@/store/workprovider/workpost/slice';

import { workPostSelector, isLoadingSelector, applicantListSelector, assignedListSelector } from '@/store/workprovider/workpost/selector';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import WorkAssignedCard from '@/components/workprovider/WorkAssignedCard';

//icons
import { AiOutlineClose } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAssignmentInd } from "react-icons/md";
//store

import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmplr } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';

import axios from '../../../Axios/axios';


const postworkid = () => {

    const [assignedListModel, setAssignedListModel] = useState(false);

    const [reloadData, setReloadData] = useState(0);

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const router = useRouter();

    const data = useSelector(workPostSelector);

    const dataLoading = useSelector(isLoadingSelector);

    const applicantList = useSelector(applicantListSelector);

    const assignedList = useSelector(assignedListSelector);


    const profilePic = useSelector(profilePicSelector);

    const userInfoData = useSelector(userInfoDataSelector);

    //console.log(applicantList[0]);

    console.log(assignedList);

    dayjs.extend(relativeTime);

    let postTime;



    if (data) {
        postTime = dayjs(data.postTime).fromNow();
    }


    // console.log(router.query.postworkid, "mm");

    const dispatch = useDispatch();

    useEffect(() => {

        if (router.query.postworkid != undefined) {
            dispatch(fetchWorkPost({
                workid: router.query.postworkid
            }));

            dispatch(fetchApplicantList({
                workid: router.query.postworkid
            }));

            dispatch(fetchAssignedList({
                workid: router.query.postworkid
            }));
        }

        dispatch(fetchProfilePicEmplr());
        dispatch(fetchUserInfoEmplr());

    }, [router.query.postworkid, reloadData]);

    //console.log(data);

    const [bookmark, setBookmark] = useState(false);



    const onBtnDeleteClicked = () => {
        dispatch(deleteWorkPost({
            workid: data._id,
        }));
        router.replace("/wpuser/postworks");
    }


    const onBtnFinishWorkClicked = async () => {
        try {

            const resp = await axios.post("/employeer/finishJob", {
                postId: data._id
            });

            if(resp.data.status=="succesfully finished job posted")
            {
                router.replace("/wpuser/postworks");
            }

        } catch (error) {
            console.error(error);
        }
    }


    if (dataLoading || data == undefined) {
        //console.log(data, " ", dataLoading)
        return <h1>Loading</h1>
    }


    function checkAssignList(emp_id) {
        for (let i = 0; i < assignedList.length; i++) {
            if (assignedList[i]._id === emp_id) {
                return true;
            }
        }

        return false;
    }



    const reload = () => {
        setReloadData(reloadData + 1);
    }


    return (
        <div className="flex flex-col h-auto bg-[#f7f7f7] ">
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
                        <h1 className="text-sm mt-2 text-gray-700">{data.employeerName}</h1>
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
                            <div className="flex flex-row items-center px-5 py-1 border border-green-400 mr-5 hover:shadow-inner">
                                <MdOutlineAssignmentInd className="mr-2 text-lg text-green-500" />
                                <button onClick={() => setAssignedListModel(true)} className="text-green-400 font-semibold ">ASSIGNED TO</button>
                            </div>
                            {/* <button onClick={() => setAssignedListModel(true)} className="px-5 py-1 border border-green-400 text-green-400  font-semibold mr-5 hover:shadow-inner">ASSIGNED TO</button> */}
                            {/* <div className="flex flex-row items-center px-5 py-1 border border-blue-500 mr-5 hover:shadow-inner">
                                <FiSend className="mr-2 text-blue-500" />
                                <button className="text-blue-500 font-semibold ">SEND REQUEST</button>
                            </div> */}
                            {/* <button onClick={onBtnDeleteClicked} className="px-5 py-1 border border-red-500 text-red-500 font-semibold  hover:shadow-inner ">DELETE</button> */}
                            <div className="flex flex-row items-center px-5 py-1 border border-red-500 mr-5 hover:shadow-inner">
                                <RiDeleteBin6Line className="mr-2 text-red-500" />
                                <button onClick={onBtnDeleteClicked} className="text-red-500 font-semibold">DELETE</button>
                            </div>

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
                        {
                            applicantList.map((item, key) =>
                                <WorkApplicationCard assigned={checkAssignList(item._id)} reload={reload} workid={data._id} data={item} />
                            )

                        }
                    </div>
                </div>

                <div className={`absolute ${assignedListModel ? "flex flex-col" : "hidden"} overflow-y-auto  bg-white h-[30rem] w-[30rem] top-0 bottom-0 left-0 right-0 m-auto z-10 drop-shadow-2xl`}>
                    <div className="flex flex-row items-center m-5 self-end">
                        <AiOutlineClose onClick={() => setAssignedListModel(false)} className="text-xl cursor-pointer" />
                    </div>
                    <div className="flex flex-col gap-y-5 pb-10 px-10">
                        {
                            assignedList.map((item, key) => <WorkAssignedCard workid={data._id} reload={reload} emp_id={item._id} name={item.name} phone={item.phone} profileImg={item.profileImg} key={key} />)
                        }
                    </div>
                    {
                        assignedList.length != 0 ?
                            <div className="px-10">
                                <button onClick={onBtnFinishWorkClicked} className="px-5 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-base">Finish Work</button>
                            </div>
                            :
                            null
                    }

                </div>

            </div>
        </div>
    )
}

export default postworkid;