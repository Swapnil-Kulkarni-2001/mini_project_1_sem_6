import React from 'react'
import Image from 'next/image'

const WorkApplicationCard = () => {

    const myLoader = ({ src, width, quality }) => {
        return `https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=`
    }

    return (
        <div className="flex flex-col p-5 border">
            <div className="flex flex-row items-center">
                <div>
                    {/* <FaUserCircle className="text-8xl text-gray-300" /> */}
                    <div className="bg-white rounded-full relative h-20 w-20 ">
                        {/* <FaUserCircle className="text-8xl text-[#d8d8d8]" /> */}
                        <Image alt="no image" fill={true} className="rounded-full" loader={myLoader} src="https://media.istockphoto.com/id/1223044329/photo/confident-man-teacher-wearing-headset-speaking-holding-online-lesson.jpg?s=612x612&w=0&k=20&c=xKYLqKd6obXrUazZg5PDCycrwPiFXHVEJzqi0lxh78Q=" />
                    </div>
                </div>

                <div className="flex flex-col self-start ml-4 ">
                    <h1 className="text-base font-semibold">Swapnil Kulkarni</h1>
                    <h1 className="text-sm font-semibold text-gray-600">+91-9403*****</h1>
                    <div className='flex flex-row mt-2'>
                        {/* <button className="px-3 py-[2px] bg-[#4a90e2] text-sm text-white mr-3">ACCEPT</button> */}
                        <button className="px-3 py-[2px] border border-[#4a90e2] hover:bg-blue-100 text-sm text-[#4a90e2] mr-3">ACCEPTED</button>
                        {/* <button className="px-3 py-[2px] bg-red-500 text-sm text-white">REJECT</button> */}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WorkApplicationCard