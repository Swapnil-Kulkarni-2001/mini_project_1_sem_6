import React, { useEffect } from 'react'
import Navbar from '@/components/workprovider/Navbar'
import AccountSidePanel from '@/components/AccountSidePanel'
import { useDispatch, useSelector } from 'react-redux'


import { fetchProfilePicEmplr } from '@/store/auth/slice';
import { fetchUserInfoEmplr } from '@/store/userInfo/slice';

import WorkerProfileCard from '@/components/WorkerProfileCard';

import { fetchAllWorkersInfo } from '@/store/workprovider/workers/slice';
import { workersDataSelector, workersDataLoadingSelector } from '@/store/workprovider/workers/selector';

import { AiOutlineInfoCircle } from "react-icons/ai";

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

            <div className="flex flex-col h-36 mx-40 mt-10 p-5 rounded-2xl bg-[#456995] ">
                <div className="flex flex-row mt-auto items-center ">
                    <h1 className="text-4xl font-semibold text-white">Workers</h1>
                    <AiOutlineInfoCircle className="text-3xl text-white self-end ml-auto cursor-pointer" />
                </div>
            </div>

            <div className="flex flex-row h-full px-40 gap-x-20">

                <div className="grid grid-cols-2 gap-y-5 gap-x-5 my-10 basis-[65%]">
                    {
                        workersData.map((item, key) => (
                            <WorkerProfileCard data={item} key={key} />
                        ))
                    }
                </div>

                <div className='flex flex-col my-10 basis-[35%]'>
                    <div className="flex flex-col p-5 bg-white rounded-2xl border">
                        <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2 text-center items-center p-5 rounded-2xl ">
                            <p>find workers here, see their profile and according to your need request them for various types of work.</p>
                            <div className='flex flex-row'>
                                <p className="mr-2 ">Once a request has been made, it cannot be revert backed, if necessary delete the post.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default index