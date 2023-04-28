import React, { useEffect, useState } from 'react'
import AccountSidePanel from '@/components/AccountSidePanel'
import Navbar from '@/components/workprovider/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillPlusCircle } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";

import WorkCard from '@/components/workprovider/WorkCard';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// import { postWork } from '@/store/postWork/slice';

// import { workPostByEmployeerSelector } from '@/store/workPostByEmployeer/selector';

// import { fetchWorkPostByEmployeer } from '@/store/workPostByEmployeer/slice';

//store

import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmplr } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';


import { postWork, fetchAllWorkPost, fetchWorkPost } from '@/store/workprovider/workpost/slice';

import { allWorkPostSelector, workPostSelector, isLoadingSelector } from '@/store/workprovider/workpost/selector';

import { AiOutlineInfoCircle } from "react-icons/ai";
import { useRouter } from 'next/router';

const index = () => {

    const [workName, setWorkName] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [workDesc, setWorkDesc] = useState("");

    const [workDurPart1, setWorkDurPart1] = useState("");
    const [workDurPart2, setWorkDurPart2] = useState("day");

    const [workTimePart1, setWorkTimePart1] = useState("");
    const [workTimePart2, setWorkTimePart2] = useState("");

    const [workFrom, setWorkFrom] = useState("");

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const [model, setModel] = useState(false);

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [locationStatus, setLocationStatus] = useState(true);

    //const [reRender,setReRender] = useState(0);

    const dispatch = useDispatch();


    const allWorkPosts = useSelector(allWorkPostSelector);

    const profilePic = useSelector(profilePicSelector);

    const userInfoData = useSelector(userInfoDataSelector);




    useEffect(() => {
        dispatch(fetchAllWorkPost());
        dispatch(fetchProfilePicEmplr());
        dispatch(fetchUserInfoEmplr());
    }, []);


    const router = useRouter();


    const validatePostDetails = () => {

        let string_lat;
        let string_lng;

        let today_date = new Date()



        today_date = today_date.toString();

        if (workName == "" || workAddress == "" || workDesc == ""
            || workDurPart1 == "" || workTimePart1 == "" || workTimePart2 == "" || workFrom == "") {
            return;
        }

        if (!navigator.geolocation) {
            setLocationStatus(false);
        } else {
            setLocationStatus(true);
            navigator.geolocation.getCurrentPosition((position) => {
                setLocationStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude
                string_lat = lat.toString();
                string_lng = lng.toString();

                const work_dur = workDurPart1.concat(" ", workDurPart2);
                const work_time = workTimePart1.concat(" to ", workTimePart2);

                dispatch(postWork({
                    workName: workName,
                    workAddress: workAddress,
                    workDuration: work_dur,
                    workTime: work_time,
                    workFrom: workFrom,
                    latitude: string_lat,
                    longitude: string_lng,
                    postTime: today_date,
                    workDescription: workDesc
                }));

                setModel(false);
                //setReRender(reRender+1);
            }, () => {
                setLocationStatus(false);
            });
        }

        if (locationStatus) {
            alert("ok");
            dayjs.extend(relativeTime);
            //console.log(dayjs(today_date).fromNow());
            let d = dayjs("Sun Mar 26 2023 11:50:00 GMT+0530 (India Standard Time)").fromNow();
            console.log(d);
        }

    }

    if (allWorkPosts == undefined) {
        console.log(allWorkPosts.length);
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

                {/* <div className="flex flex-row items-center bg-white px-32 py-5 border-t shadow-md">
                    <div onClick={() => setModel(!model)} className="flex flex-row border-2 rounded-3xl items-center cursor-pointer hover:border-blue-600 py-1 px-5">
                        <AiFillPlusCircle className="text-[#4a90e2] text-4xl mr-2" />
                        <h1 className="text-lg font-semibold text-black">Post works</h1>
                    </div>
                </div> */}

                <div className="flex flex-col h-36 mx-40 mt-10 p-5 rounded-2xl bg-[#456995] ">
                    <div className="flex flex-row mt-auto items-center ">
                        <h1 className="text-4xl font-semibold text-white">Work posts</h1>
                        <AiOutlineInfoCircle className="text-3xl text-white self-end ml-auto cursor-pointer" />
                    </div>
                </div>

                <div className="flex flex-row h-full px-40 gap-x-20">
                    <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
                        {

                            allWorkPosts.map((item, key) => (
                                <WorkCard
                                    // workName={item.workName}
                                    // workAddress={item.workAddress}
                                    // workTime={item.workTime}
                                    // workDuration={item.workDuration}
                                    // workFrom={item.workFrom}
                                    // postTime={item.postTime}
                                    // isBookMarked={false}
                                    // workid={item._id}
                                    data={item}
                                    key={key} />
                            ))

                        }
                    </div>

                    <div className='flex flex-col my-10 basis-[35%]'>
                        <div className="flex flex-col p-5 bg-white rounded-2xl border">
                            <div className="flex flex-row items-center bg-gray-100">
                                <button onClick={()=>{
                                    router.push("/wpuser/postworks/post");
                                }} className="px-7 p-2 rounded-sm bg-[#456995] text-white">post new</button>
                            </div>
                            <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2 text-center items-center p-5 rounded-2xl mt-5">
                                <p>A new work post created will be shown to everyone(workers) in your nearby location.</p>
                                <div className='flex flex-row'>
                                    <p className="mr-2 ">post can also be deleted but cannot be modified once it is created.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-col my-10 p-5 bg-white rounded-2xl border basis-[35%]">
                        <div className="flex flex-row items-center bg-gray-100">
                            <button onClick={() => setModel(!model)} className="px-7 p-2 rounded-sm bg-[#456995] text-white">post new</button>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2 text-center items-center p-5 rounded-2xl mt-5">
                            <p>A new work post created will be shown to everyone(workers) in your nearby location.</p>
                            <div className='flex flex-row'>
                                <p className="mr-2 ">post can also be deleted but cannot be modified once it is created</p>
                            </div>
                        </div>
                    </div> */}

                </div>

                <div className={`absolute ${model ? "flex flex-col" : "hidden"} border-2 p-5 bg-white h-[40rem] w-[30rem] top-0 bottom-0 left-0 right-0 m-auto z-10 shadow-xl`}>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold">Work name</label>
                        <input onChange={(e) => setWorkName(e.target.value)} type="text" placeholder="Work name eg: plumber" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xs font-semibold">Work address</label>
                        <input onChange={(e) => setWorkAddress(e.target.value)} type="text" placeholder="work address(important)" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xs font-semibold">Work description</label>
                        <textarea onChange={(e) => setWorkDesc(e.target.value)} placeholder="work instruction, or any other description" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-row mt-5">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Work duration</label>
                            <input onChange={(e) => setWorkDurPart1(e.target.value)} type="number" placeholder="eg: 1 day/month" className="p-2 border mt-2 focus:outline-blue-500" required />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">day/month</label>
                            <select onChange={(e) => setWorkDurPart2(e.target.value)} name="day/month" defaultValue="day" className="mt-2 border-2 h-full">
                                <option value="day">day</option>
                                <option value="month">month</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-5">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold">Work time</label>
                            <input onChange={(e) => setWorkTimePart1(e.target.value)} type="time" className="p-2 border mt-2 focus:outline-blue-500" required />
                        </div>
                        <h1 className="text-sm mx-3 font-semibold">to</h1>
                        <div className="flex flex-col">
                            {/* <label className="text-xs font-semibold">to</label> */}
                            <input onChange={(e) => setWorkTimePart2(e.target.value)} type="time" className="p-2 border mt-6 focus:outline-blue-500" required />
                        </div>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-xs font-semibold">Work from</label>
                        <input onChange={(e) => setWorkFrom(e.target.value)} type="date" className="p-2 border mt-2 focus:outline-blue-500" required />
                    </div>
                    <div className="flex flex-row mt-5 gap-x-5">
                        <button onClick={validatePostDetails} className="bg-white px-8 py-1 border-2 rounded-3xl hover:border-[#457eff] text-black text-lg font-semibold">post</button>
                        <button onClick={() => setModel(!model)} className="bg-white px-8 py-1 border-2 rounded-3xl hover:border-red-500 text-black text-lg font-semibold">cancel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default index