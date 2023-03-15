import AccountSidePanel from '@/components/AccountSidePanel'
import FNavbar from '@/components/FNavbar'
import React from 'react'
import { useSelector } from 'react-redux'


const homepage = () => {


    const open = useSelector((state) => {
        return state.sideDrower.open;
    })

    return (
        <div className="flex flex-col h-[100vh] relative overflow-hidden ">
            <FNavbar />
            <div className="flex flex-col bg-[#fafafa] h-full ">
                <div className="bg-[#d4e4ff] h-48">
                </div>
                <div className={`flex flex-col w-[23rem] h-[100vh] 
                rounded-tl-3xl rounded-bl-3xl absolute top-0 right-0
                transition-all duration-700
                ${open ? 'flex' : 'translate-x-[35rem] '}
                `}>
                    <AccountSidePanel />
                </div>
                <div className="flex flex-col ">
        
                </div>
            </div>
        </div>
    )
}

export default homepage