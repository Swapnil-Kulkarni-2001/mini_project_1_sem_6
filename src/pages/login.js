import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/auth/slice';
import { useRouter } from 'next/router';

import Cookies from 'universal-cookie';

import { userPassSelector,userEmailSelector} from '@/store/auth/selector';



const login = () => {

  const cookie = new Cookies();

  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const router = useRouter();

  const auth = useSelector((state) => {
    return state.auth.isAuthenticated;
  })

  const user_email = useSelector(userEmailSelector);
  const user_pass = useSelector(userPassSelector);


  const onShowToggleBtnClicked = () => {
    setVisible(!visible);
  }

  const onSubmitBtnClicked = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      email: email,
      password: password
    }));
  }

  if (auth === true) {

    cookie.remove("email");
    cookie.remove("password");

    cookie.set("email",user_email);
    cookie.set("password",user_pass);
    //router.push("/wuser/homepage")
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <Navbar />
      <form onSubmit={onSubmitBtnClicked}>
        <div className='bg-[#fafafa] flex flex-col h-[100vh] w-full md:justify-center md:items-center'>
          <div className='flex flex-col bg-white shadow-md md:w-[28rem] mx-4 md:mx-0 px-5 md:px-16 py-10 pb-20'>
            <h1 className='text-lg font-semibold'>Login</h1>

            <label className="text-xs font-semibold mt-7">Email Id / Username</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="p-2 border mt-2 focus:outline-blue-500" required />
            <label className="text-xs font-semibold mt-5">Password</label>
            <div className='flex flex-row w-full border-2 mt-2 items-center pr-5 hover:border-blue-500'>
              <input onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} placeholder="password" className="p-2 focus:outline-none" required />
              <span onClick={onShowToggleBtnClicked} className="ml-auto text-sm text-[#4a90e4] cursor-pointer ">{visible ? "Hide" : "Show"}</span>
            </div>
            <Link href="/" className="text-xs self-end mt-2 text-[#4a90e4]">Forget password?</Link>
            <button type="submit" className="bg-[#4a90e2] py-2 mt-4 text-white">Login</button>

            <h1 className="text-md text-[#4a90e2] mt-2 text-center cursor-pointer">Use OTP to login</h1>

            <div className="flex flex-row items-center mt-5">
              <div className="bg-gray-300 basis-1/2 h-[0.5px]" />
              <h1 className="text-xs text-gray-500">Or</h1>
              <div className="bg-gray-300 basis-1/2 h-[0.5px]" />
            </div>

            <button>
              <div className="mt-7 p-2 rounded-3xl flex flex-row shadow-lg items-center cursor-pointer">
                <FcGoogle className="text-2xl" />
                <h1 className="text-gray-500 text-sm font-semibold m-auto">Sign in with Google</h1>
              </div>
            </button>

            {
              auth ? <h1>Authenticated</h1> : <h1>unAuthenticated</h1>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default login