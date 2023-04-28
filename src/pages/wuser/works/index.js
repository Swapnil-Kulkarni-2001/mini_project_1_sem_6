import FNavbar from '@/components/FNavbar'
import AccountSidePanel from '@/components/AccountSidePanel'
import { MdWork } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import WorkCard from '@/components/worker/WorkCard';
import { fetchAllWorks } from '@/store/public/slice';
import { dataSelector } from '@/store/public/selector';
import { useEffect, useState } from 'react';


import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';
import { AiOutlineInfoCircle } from "react-icons/ai";


const AllJobs = () => {


    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [status, setStatus] = useState("");

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const dispatch = useDispatch();

    const allWork_data = useSelector(dataSelector);

    const profilePic = useSelector(profilePicSelector);

    const profilePicLoading = useSelector(profilePicLoadingSelector);

    useEffect(() => {
        dispatch(fetchProfilePicEmp());
    }, []);


    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                const lat = position.coords.latitude;
                const lng = position.coords.longitude
                const string_lat = lat.toString();
                const string_lng = lng.toString();
                dispatch(fetchAllWorks({
                    lat: string_lat,
                    lng: string_lng
                }))
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }, []);


    return (
        <div className="flex flex-col h-auto bg-[#f7f7f7]">
            <FNavbar />

            <div className={`flex flex-col w-[23rem] h-[100vh] 
                rounded-tl-3xl rounded-bl-3xl  fixed top-0 right-0
                transition-all duration-700
                ${open ? 'flex' : 'translate-x-[35rem] '}
                `}>
                <AccountSidePanel />
            </div>

            <div className="flex flex-col h-36 mx-40 mt-10 p-5 rounded-2xl bg-[#456995] ">
                <div className="flex flex-row mt-auto items-center ">
                    <h1 className="text-4xl font-semibold text-white">Recommended works</h1>
                    <AiOutlineInfoCircle className="text-3xl text-white self-end ml-auto cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-row h-full px-40 gap-x-20">
                <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
                    {
                        allWork_data.map((item, key) => (
                            <WorkCard data={item} key={key} />
                        ))
                    }
                </div>

                <div className='flex flex-col my-10 basis-[35%]'>
                    <div className="flex flex-col p-5 bg-white rounded-2xl border">
                        <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2  p-5 rounded-2xl">
                            <p>The works are listed here, their details can be viewed and checked.</p>
                            <p className="mt-2">Apply for the work according to your need and wait for the reply.</p>
                            <p className="mt-2">Once the application has been made, it cannot be revert backed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllJobs