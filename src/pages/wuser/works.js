import FNavbar from '@/components/FNavbar'
import AccountSidePanel from '@/components/AccountSidePanel'
import { MdWork } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { useSelector } from 'react-redux'
import WorksCard from '@/components/work/WorksCard';

const AllJobs = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

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
                    <WorksCard />
                    <WorksCard />
                    <WorksCard />
                    <WorksCard />
                    <WorksCard />
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