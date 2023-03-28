import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {

  const router = useRouter();
  const [open, setOpen] = useState(false);



  return (
    <div className='flex flex-row text-md px-5 md:px-40 font-medium items-center py-2 bg-white text-gray-600 shadow-sm '>

      <div className='border-4 py-1  border-white'>
        <h1 className="text-3xl text-blue-600 font-bold">Karya</h1>
      </div>

      <div onClick={() => setOpen(!open)} className="ml-auto sm:hidden">
        {
          open ? <GrClose className="text-2xl text-black" /> : <GiHamburgerMenu className="text-2xl text-black" />
        }
      </div>

      <div className={`absolute flex flex-col justify-evenly pb-10 md:pb-0 bg-white top-20 left-0 w-full transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] opacity-0 sm:opacity-100'} md:static md:flex md:w-full md:flex-row `}>
        <div className='mx-5 md:ml-24 md:mr-10 border-4 py-1 rounded-md border-white  hover:border-b-[#ff7555]'>
          <Link href="/public/works" className="hover:text-black">Find work</Link>
        </div>
        <div className='mx-5 border-4 py-1 rounded-md border-white  hover:border-b-[#ff7555]'>
          <Link href="/" className="hover:text-black">Find someone for work</Link>
        </div>

        <div className='flex flex-col md:flex-row md:ml-auto'>
          <div className='mx-5 mt-5 md:mt-0'>
            <button onClick={() => router.push("/login")} className='border-[1px] w-36 md:w-auto border-blue-600 text-[#6d7eff] hover:bg-[#f5f6f9] font-bold py-2 px-4 rounded-3xl'>Login</button>
          </div>

          <div className='mx-5 mt-5 md:mt-0'>
            <button onClick={()=> router.push("/register")} className='bg-[#f87254] hover:bg-[#f9866c] w-36 md:w-auto text-white font-bold py-2 px-6 rounded-3xl'>Register</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar