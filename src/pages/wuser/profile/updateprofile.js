import React, { useEffect, useRef, useState } from 'react'
import FNavbar from '@/components/FNavbar'
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import AccountSidePanel from '@/components/AccountSidePanel'
import Image from 'next/image'
import axios from '../../../Axios/axios';

//store imports
import { fetchProfilePicEmp } from '@/store/auth/slice';
import { profilePicSelector, profilePicLoadingSelector } from '@/store/auth/selector';



const updateprofile = () => {




    const open = useSelector((state) => {
        return state.sideDrower.open;
    })



    const dispatch = useDispatch();

    const inpNumRef = useRef();

    const inpAddrRef = useRef();

    const inpInstaRef = useRef();

    const inpFaceRef = useRef();

    useEffect(() => {
        dispatch(fetchProfilePicEmp());
        async function fetchUserData() {
            try {
                const resp = await axios.get("/employee/personalInfo");
                console.log(resp.data, " fff");
                inpNumRef.current.value = resp.data.data.phone;
                inpAddrRef.current.value = resp.data.data.address;
                inpInstaRef.current.value = resp.data.data.instagram;
                inpFaceRef.current.value = resp.data.data.facebook;
            } catch (error) {
                console.error(error);
            }
        }

        fetchUserData();
    }, []);

    const profilePic = useSelector(profilePicSelector);

    const profilePicLoading = useSelector(profilePicLoadingSelector);

    const ref = useRef()

    const onBtnUploadImgClicked = (e) => {
        ref.current.click()
    }

    const uploadProfImage = async (e) => {
        let resp;
        console.log(e.target.files[0]);
        if (e.target.files[0] != undefined) {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            try {
                resp = await axios.post("/employee/uploadProfileImg", formData);
                console.log(resp.data);
                if (resp.data.status == "succesfully profile photo uploaded") {
                    dispatch(fetchProfilePicEmp());
                }
            } catch (error) {
                console.log(error)
            }
        }
    }



    const uploadFormData = async () => {


        if (inpAddrRef.current.value == null || inpNumRef.current.value == null
            || inpInstaRef.current.value == null || inpFaceRef.current.value == null

            || inpAddrRef.current.value == "" || inpNumRef.current.value == ""
            || inpInstaRef.current.value == "" || inpFaceRef.current.value == ""

            || inpAddrRef.current.value == undefined || inpNumRef.current.value == undefined
            || inpInstaRef.current.value == undefined || inpFaceRef.current.value == undefined) {

                return;
        }
        try {
            const resp = await axios.post("/employee/profileUpdate", {
                address: inpAddrRef.current.value,
                phone: inpNumRef.current.value,
                Insta: inpInstaRef.current.value,
                facebook: inpFaceRef.current.value
            });

            console.log(resp.data);
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className="flex flex-col relative h-[100vh] overflow-x-hidden bg-[#f8f8f8]">
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
                <div className="flex flex-row px-40 my-10">

                    <div className="flex flex-col bg-white w-96 h-auto items-center md:py-8 md:px-5 border rounded-xl mr-10 basis-[30%]">
                        <div className="flex flex-col mt-2 ml-2">
                            <h1 className="text-xl font-bold text-center">Swapnil Kulkarni</h1>
                            <h1 className="text-sm text-center text-gray-600 font-bold">Worker</h1>
                        </div>
                        <div className="mt-5">
                            {/* <FaUserCircle className="text-8xl text-gray-300" /> */}

                            {
                                profilePic == "" || profilePic == undefined ? <FaUserCircle className="text-9xl text-gray-300" />
                                    :
                                    <div className="bg-white rounded-full relative h-32 w-32 ">
                                        <Image loader={() => profilePic} src={profilePic} alt="no image" fill={true} className="rounded-full" />
                                    </div>
                            }
                        </div>
                        <div className="mt-5">
                            <button onClick={onBtnUploadImgClicked} className="bg-[#ff3d17] px-5 py-1 text-white rounded-lg text-lg font-semibold">Upload new photo</button>
                            <input ref={ref} type="file" className="hidden" accept="image/png,image/jpeg" onChange={(e) => uploadProfImage(e)} />
                        </div>

                        <div className="flex flex-col text-sm text-gray-600 bg-[#f1f4fd] border-2 text-center items-center p-5 rounded-2xl mt-5">
                            <p>Upload a new avatar. Larger image will resize automatically</p>
                            <div className='flex flex-row'>
                                <p className="mr-2 ">Maximum upload size is </p>
                                <p className="font-semibold">1 MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full bg-white border rounded-xl h-auto basis-[70%]">
                        <div className="bg-[#f8f9fb] p-10">
                            <h1 className="text-2xl font-bold text-[#10171f]">Edit profile</h1>
                        </div>

                        <div className="flex flex-col m-10 ">

                            <div className="flex flex-col">
                                <label className="text-xs font-semibold">Whatsapp number</label>
                                <input ref={inpNumRef} type="tel" placeholder="your whatsapp mobile number" className="p-2 border mt-2 focus:outline-blue-500" required />
                            </div>
                            <div className="flex flex-col mt-5">
                                <label className="text-xs font-semibold">Address</label>
                                <input ref={inpAddrRef} type="text" placeholder="your current address" className="p-2 border mt-2 focus:outline-blue-500" required />
                            </div>

                            <div className="flex flex-col mt-5 border rounded-md pb-5">

                                <div className="flex flex-col p-5 bg-[#f8f9fb]">
                                    <h1 className="text-base font-semibold">Social media</h1>
                                </div>

                                <div className="flex flex-row items-center gap-x-5 mt-5 px-5">
                                    <div className="flex flex-col basis-1/2">
                                        <label className="text-xs font-semibold">Instagram</label>
                                        <input ref={inpInstaRef} type="url" placeholder="instagram account link" className="p-2 border mt-2 focus:outline-blue-500" required />
                                    </div>
                                    <div className="flex flex-col basis-1/2">
                                        <label className="text-xs font-semibold">Facebook</label>
                                        <input ref={inpFaceRef} type="url" placeholder="facebook account link" className="p-2 border mt-2 focus:outline-blue-500" required />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <button onClick={uploadFormData} className="bg-[#ff3d17] px-5 py-1 text-white rounded-lg text-lg font-semibold">update info</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default updateprofile