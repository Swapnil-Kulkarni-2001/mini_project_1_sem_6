import React, { useState, useEffect } from 'react'
import Navbar from '@/components/workprovider/Navbar'
import AccountSidePanel from '@/components/AccountSidePanel'

import { useDispatch, useSelector } from 'react-redux'

import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { fetchUserInfoEmplr } from '@/store/userInfo/slice';
import { postWork } from '@/store/workprovider/workpost/slice';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { MdWorkOutline } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const post = () => {

    const [workName, setWorkName] = useState("");
    const [workAddress, setWorkAddress] = useState("");
    const [workDesc, setWorkDesc] = useState("");

    const [workDurPart1, setWorkDurPart1] = useState("");
    const [workDurPart2, setWorkDurPart2] = useState("day");

    const [workTimePart1, setWorkTimePart1] = useState("");
    const [workTimePart2, setWorkTimePart2] = useState("");

    const [workFrom, setWorkFrom] = useState("");

    const [isAgree, setIsAgree] = useState(false);

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [locationStatus, setLocationStatus] = useState(true);

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProfilePicEmplr());
        dispatch(fetchUserInfoEmplr());
    }, []);


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
            }, () => {
                setLocationStatus(false);
            });
        }

        if (locationStatus) {
            toast.success('work posted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            // dayjs.extend(relativeTime);
            // let d = dayjs("Sun Mar 26 2023 11:50:00 GMT+0530 (India Standard Time)").fromNow();
            setTimeout(()=>{
                router.push("/wpuser/postworks");
            },1000);
        }

    }


    return (
        <div className="flex flex-col bg-[#f7f7f7] font-OpenSans">
            <Navbar />
            <div className="flex flex-col h-full">
                <div className={`flex flex-col w-[23rem] h-[100vh] 
                    rounded-tl-3xl rounded-bl-3xl  fixed top-0 right-0
                    transition-all duration-700
                    ${open ? 'flex' : 'translate-x-[35rem] '}
                    `}>
                    <AccountSidePanel />
                </div>
            </div>

            <div className="flex flex-col px-40">
                <div className="flex flex-row gap-x-20">
                    <div className="flex flex-col my-10 px-10 py-10 gap-y-3 bg-white border-2  basis-[45%]">
                        <div tabIndex="0" className="group flex flex-row items-center border-2 focus:border-[#456995] focus-within:border-[#456995]">
                            <input onChange={(e) => setWorkName(e.target.value)} type="text" placeholder="Work name eg: plumber" className="p-2 basis-[90%] outline-none peer" required />
                            <MdWorkOutline className="text-xl text-gray-400 group-focus:text-[#456995] basis-[10%] order-first peer-focus:text-[#456995]" />
                        </div>
                        <div tabIndex="1" className="group flex flex-row items-center mt-5 border-2 focus:border-[#456995] focus-within:border-[#456995]">
                            <input onChange={(e) => setWorkAddress(e.target.value)} type="text" placeholder="work address(important)" className="p-2 basis-[90%] outline-none peer" required />
                            <HiOutlineLocationMarker className="text-xl text-gray-400 group-focus:text-[#456995] basis-[10%] order-first peer-focus:text-[#456995]" />
                        </div>
                        <div className="flex flex-col mt-5">
                            <label className="text-xs font-semibold text-gray-600">Description</label>
                            <textarea onChange={(e) => setWorkDesc(e.target.value)} placeholder="write description here" className="p-2 border-2 mt-2 focus:outline-[#456995]" required />
                        </div>
                        <div className="flex flex-row mt-5">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600">Duration</label>
                                <input onChange={(e) => setWorkDurPart1(e.target.value)} type="number" placeholder="eg: 1 day/month" className="p-2 border-2 border-r-0 mt-2 focus:outline-[#456995]" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600">Day/Month</label>
                                <select onChange={(e) => setWorkDurPart2(e.target.value)} name="day/month" defaultValue="day" className="mt-2 border-2 border-l-0 h-full">
                                    <option value="day">day</option>
                                    <option value="month">month</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-5">
                            <div className="flex flex-col">
                                <label className="text-xs font-semibold text-gray-600">Time</label>
                                <input onChange={(e) => setWorkTimePart1(e.target.value)} type="time" className="p-2 border-2 mt-2 focus:outline-[#456995]" required />
                            </div>
                            <h1 className="text-sm mx-3 font-semibold text-gray-600">to</h1>
                            <div className="flex flex-col">
                                {/* <label className="text-xs font-semibold">to</label> */}
                                <input onChange={(e) => setWorkTimePart2(e.target.value)} type="time" className="p-2 border-2 mt-6 focus:outline-[#456995]" required />
                            </div>
                        </div>
                        <div className="flex flex-col mt-5">
                            <label className="text-xs font-semibold text-gray-600">Work from</label>
                            <input onChange={(e) => setWorkFrom(e.target.value)} type="date" className="p-2 border-2 mt-2 focus:outline-[#456995]" required />
                        </div>
                        {/* <div className="flex flex-row mt-5 gap-x-5">
                            <button onClick={validatePostDetails} className="bg-white px-8 py-1 border-2 rounded-3xl hover:border-[#457eff] text-black text-lg font-semibold">post</button>
                        </div> */}
                    </div>

                    <div className='flex flex-col my-10 basis-[55%] px-20'>
                        <div className="flex flex-col p-5 bg-white rounded-2xl border">
                            <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2  p-5 rounded-2xl ">
                                <p>A proper information will help workers to reach at you.</p>
                                <div className='flex flex-row'>
                                    <p className="mr-2 ">The information provided in the form is need to be valid and necessary, and this will be shown to all workers.</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-5">
                                <input onChange={() => { setIsAgree(!isAgree) }} type="checkbox" className="h-4 w-4 mr-2 accent-[#456995]" />
                                <p className="text-xs">I agree to post the work details publicly.</p>
                            </div>
                            <button onClick={validatePostDetails} disabled={!isAgree} className={`px-5 py-2 mt-5 ${!isAgree ? "bg-[#7395bf]" : null} bg-[#456995] text-white`}>Post</button>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default post