import FNavbar from '@/components/FNavbar'
import AccountSidePanel from '@/components/AccountSidePanel'
import { MdWork } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import WorkCard from '@/components/worker/WorkCard';
import { fetchAllWorks } from '@/store/public/slice';
import { dataSelector } from '@/store/public/selector';
import { useEffect,useState } from 'react';


import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';


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

            <div className="flex flex-row items-center bg-white px-32 py-5 border-t shadow-md">
                <MdWork className="text-[#4a90e2] text-4xl mr-5" />
                <h1 className="text-lg font-semibold text-black">Recommended works for you</h1>
            </div>
            <div className="flex flex-row h-full px-32 gap-x-20">
                <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
                    {/* <WorkCard />
                    <WorkCard />
                    <WorkCard />
                    <WorkCard />
                    <WorkCard /> */}

                    {
                        allWork_data.map((item,key)=>(
                            <WorkCard data={item} key={key}/>
                        ))
                    }
                </div>

                <div className="flex flex-col h-96 my-10 p-10 bg-white basis-[35%]">
                    <div className="flex flex-col">
                        <FaFilter className="text-2xl text-[#4a90e2]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllJobs