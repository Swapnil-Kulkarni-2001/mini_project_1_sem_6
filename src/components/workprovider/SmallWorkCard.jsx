import React from 'react'
import { RxCounterClockwiseClock } from "react-icons/rx";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from '../../Axios/axios';
const SmallWorkCard = ({ data, emp_id, invitationList, reload }) => {

    dayjs.extend(relativeTime);

    let postTime = "";

    const checkRequest = () => {
        for (let i = 0; i < invitationList.length; i++) {
            if (invitationList[i] == data._id) {
                return true;
            }
        }
        return false;
    }


    const onBtnRequestClicked = async () => {

        if (!checkRequest()) {
            try {
                const resp = await axios.post("/employeer/requestEmployee", {
                    postId: data._id,
                    employeeId: emp_id
                });

                if (resp.data.status == "successfully invited to employee for post") {
                    reload();
                    //alert("request sent");
                }
            } catch (error) {
                console.error(error);
            }
        }

    }

    if (data != undefined) {
        postTime = dayjs(data.postTime).fromNow();
    }
    else {
        return null
    }

    return (
        <div onClick={onBtnRequestClicked} className={`flex flex-col p-5 border-2 ${checkRequest()? "border-green-500": null} hover:border-blue-500 cursor-pointer`}>
            <h1 className="text-base font-semibold">{data.workName}</h1>
            <div className="flex flex-row items-center ">
                <h1 className="text-sm font-extralight">{data.workAddress}</h1>
                <div className='flex flex-row items-center px-2 py-1 ml-auto bg-[#f4f5f7]'>
                    <RxCounterClockwiseClock className="text-sm mr-2" />
                    <h1 className="text-xs font-semibold">{postTime}</h1>
                </div>
            </div>
        </div>
    )
}

export default SmallWorkCard