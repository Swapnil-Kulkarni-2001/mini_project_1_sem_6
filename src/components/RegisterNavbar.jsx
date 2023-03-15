import Link from 'next/link'
import React from 'react'

const RegisterNavbar = () => {
    return (
        <div className="py-2 px-5 md:px-40 flex flex-row items-center">
            <div className='border-4 py-1 border-white'>
                <h1 className="text-3xl text-blue-600 font-bold">Karya</h1>
            </div>
            <div className={`ml-auto text-sm flex flex-row `}>
                <h1>Already Registered?</h1>
                <Link href="/login" className="mx-2 text-[#6fc0ff]">Login</Link>
                <h1>here</h1>
            </div>
        </div>
    )
}

export default RegisterNavbar