import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/auth/slice';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { userEmailSelector, userTypeSelector, userIdSelector } from '@/store/auth/selector';

import { setIsAuthenticated } from '@/store/auth/slice';

const login = () => {



  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const router = useRouter();

  const auth = useSelector((state) => {
    return state.auth.isAuthenticated;
  })

  // const user_email = useSelector(userEmailSelector);
  // const user_pass = useSelector(userPassSelector);


  //console.log(access_token);

  const user_type = useSelector(userTypeSelector);

  const user_id = useSelector(userIdSelector);
  //console.log(user_type);

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
    dispatch(setIsAuthenticated("nil"));
    toast.success('verification success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    localStorage.setItem("uid", user_id);
    localStorage.setItem("utype", user_type);

    if (user_type === "Employee") {
      setTimeout(() => {
        router.push({
          pathname: "/wuser/homepage",
          query: { login: true }
        }, "/wuser/homepage");
      }, 2000);
    }

    if (user_type === "Employeer") {
      setTimeout(() => {
        router.push({
          pathname: "/wpuser/homepage",
          query: { login: true }
        }, "/wpuser/homepage");
      }, 2000);
      // router.push("/wpuser/homepage")
    }
  }

  if (auth == false) {
    dispatch(setIsAuthenticated("nil"));
    toast.error("verification failed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default login