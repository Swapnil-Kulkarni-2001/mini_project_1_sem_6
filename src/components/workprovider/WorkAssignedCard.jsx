import React from 'react'
import Image from 'next/image'

const WorkAssignedCard = ({ emp_id, name, phone }) => {
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
                    <h1 className="text-base font-semibold">{name}</h1>
                    <h1 className="text-xs font-semibold text-gray-600">{phone}</h1>
                    <div className='flex flex-row mt-2'>
                        <button className="px-3 py-[1px] border border-red-500 text-sm font-semibold text-red-500 hover:bg-red-500 hover:text-white">remove</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default WorkAssignedCard