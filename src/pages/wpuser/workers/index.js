import React, { useEffect } from 'react'
import Navbar from '@/components/workprovider/Navbar'
import AccountSidePanel from '@/components/AccountSidePanel'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { fetchUserInfoEmplr } from '@/store/userInfo/slice';

import WorkerProfileCard from '@/components/WorkerProfileCard';

import { fetchAllWorkersInfo } from '@/store/workprovider/workers/slice';
import { workersDataSelector,workersDataLoadingSelector } from '@/store/workprovider/workers/selector';

const index = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const dispatch = useDispatch();

    const workersData = useSelector(workersDataSelector);


    useEffect(() => {
        dispatch(fetchProfilePicEmplr());
        dispatch(fetchUserInfoEmplr());
        dispatch(fetchAllWorkersInfo());
    }, []);

    return (
        <div className="flex flex-col h-auto bg-[#f5f5f5]">
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
                <div className="grid grid-cols-3 gap-y-5 gap-x-5 my-10">
                    {/* <WorkerProfileCard />
                    <WorkerProfileCard />
                    <WorkerProfileCard />
                    <WorkerProfileCard />
                    <WorkerProfileCard />
                    <WorkerProfileCard /> */}
                    {
                        workersData.map((item,key)=>(
                            <WorkerProfileCard data={item} key={key}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default index