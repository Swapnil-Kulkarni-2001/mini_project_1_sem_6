import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import axios from '../Axios/axios';

const WorkAbilityDelete = (props) => {

    const onBtnDeleteClicked = async ()=>{
        try{
            const resp = await axios.post("/employee/removeSkills",{
                skills : props.work
            });

            if(resp.data.status=="succesfully skill deleted")
            {
                props.reload();
            }

        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className={`flex flex-col w-auto px-10 py-5 h-10 bg-[#eeeeee] relative items-center justify-center `}>
            <h1 className="text-md text-[#656565] ">{props.work}</h1>
            <AiFillCloseCircle onClick={onBtnDeleteClicked} className="absolute top-0 right-0 text-base text-red-500 cursor-pointer" />
        </div>
    )
}

export default WorkAbilityDelete