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

            <div className="flex flex-row h-full px-32 gap-x-20">
                <div className="flex flex-col gap-y-7 my-10 basis-[65%]">
                    {
                        invitaionList.map((item, key) => {
                            if (item == null) {
                                return;
                            }
                            return (
                                <WorkCard
                                    // workName={item.workName}
                                    // employeerName={item.employeerName}
                                    // workAddress={item.workAddress}
                                    // workDuration={item.workDuration}
                                    // workTime={item.workTime}
                                    // workDescription={item.workDescription}
                                    // workFrom={item.workFrom}
                                    // postTime={item.postTime}
                                    // employeerId={item.employeerId}
                                    // workId={item._id}
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
            </div>
        </div>
    )
}

export default invites