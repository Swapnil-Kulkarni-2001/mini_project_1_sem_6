import React, { useEffect } from 'react'

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import FNavbar from '@/components/FNavbar';
import AccountSidePanel from '@/components/AccountSidePanel';

import { fetchInvitationList } from '@/store/worker/work/slice';

import { invitedWorksSelector } from '@/store/worker/work/selector';

import { fetchProfilePicEmp } from '@/store/auth/slice';

import { fetchUserInfoEmp } from '@/store/userInfo/slice';

import WorkCard from '@/components/worker/WorkCard';

import { AiOutlineInfoCircle } from "react-icons/ai";


const invites = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInvitationList());
        dispatch(fetchProfilePicEmp());
        dispatch(fetchUserInfoEmp());
    }, []);

    const invitaionList = useSelector(invitedWorksSelector);

    return (
        <div className="flex flex-col h-auto bg-[#f7f7f7]">
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
            </div>


            <div className="flex flex-col h-36 mx-40 mt-10 p-5 rounded-2xl bg-[#456995] ">
                <div className="flex flex-row mt-auto items-center ">
                    <h1 className="text-4xl font-semibold text-white">Work invitations</h1>
                    <AiOutlineInfoCircle className="text-3xl text-white self-end ml-auto cursor-pointer" />
                </div>
            </div>

            <div className="flex flex-row h-full px-40 gap-x-20">
                <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
                    {
                        invitaionList.map((item, key) => {
                            if (item == null) {
                                return;
                            }
                            return (
                                <WorkCard
                                    data={item}
                                    key={key} />
                            )
                        })
                    }
                    {
                        invitaionList == "" || invitaionList == [] || invitaionList == undefined || invitaionList == null ?
                            <h1 className="text-base text-center m-auto text-gray-500">No invitaion list now, you will get notified here when someone request you</h1>
                            : null
                    }
                </div>
                <div className='flex flex-col my-10 basis-[35%]'>
                    <div className="flex flex-col p-5 bg-white rounded-2xl border">
                        <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2  p-5 rounded-2xl">
                            <p>The works invitaion are listed here, their details can be viewed and checked.</p>
                            <p className="mt-2">Apply for the work according to your need and wait for the reply.</p>
                            <p className="mt-2">Once the application has been made, it cannot be revert backed.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default invites