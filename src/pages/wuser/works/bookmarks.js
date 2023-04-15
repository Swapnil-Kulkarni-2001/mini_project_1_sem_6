import React,{useEffect} from 'react'
import AccountSidePanel from '@/components/AccountSidePanel'
import FNavbar from '@/components/FNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';

import { fetchUserInfoEmp } from '@/store/userInfo/slice';
import { userInfoDataSelector, userInfoDataLoadingSelector } from '@/store/userInfo/selector';

const bookmarks = () => {

    const open = useSelector((state) => {
        return state.sideDrower.open;
    })




    // const myLoader = ({ src, width, quality }) => {
    //     return src;
    // }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfilePicEmp());
        dispatch(fetchUserInfoEmp());
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
        </div>
    )
}

export default bookmarks