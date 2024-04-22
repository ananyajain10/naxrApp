import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../src/app/globals.css';
import { loginAdmin } from "../../src/redux/actions/authSlice";
import { useDispatch, useSelector, Provider } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { FidgetSpinner } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import store from '../../src/redux/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Image from 'next/image';
import Meet from '../../src/assets/images/meet.jpg';


const Login = () => {

  const status = useSelector((state) => state.auth.status.message);
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (email && password) {
          
        const response = await dispatch(loginAdmin({ email, password }));
          // Assuming userInfo is part of the response object
          console.log(response, `${email},${password}`)
        if (response.error) {
          toast.error('Invalid email or password');
        } else {
            toast.success('Logged in successfully');
            toast.success('Navigating to Dashboard');
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000); 
        }
      } else {
        toast.error('Please fill in all fields');

  }

  }

  return (
    <>
    {loading ? <></> : <Navbar />}
    {loading && (
      <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
          <FidgetSpinner />
          <h4 className='font-bold'>Logging in ...</h4>
      </div>
  )}
    <div className=" p-4 flex p-5 flex-row justify-center lg:items-center h-[100vh] w-full ">
    <div className="hidden lg:block xl:block">
                <Image
                        src={Meet}
                        
                        height={700}
                        alt='Admin meeting'
                        className="rounded-lg w-[80%] mt-[100px] ml-[50px]"
                        />
                </div>
      <form
        className="rounded-lg text-sm p-5 flex flex-col lg:w-[40%] lg:h-[60%] w-full space-y-4 md:ml-inherit md:w-[50%] ml-auto shadow-2xl mt-[40px] lg:align-right"
        onSubmit={(e) => handleSubmit(e)}
      >
         <ToastContainer />
        <h1 className="text-4xl font-bold text-[#c07c7c] text-center mb-4">Login</h1>
        <label htmlFor="email">
          <input
            className="border rounded-md p-4 w-full"
            id="email"
            type="text"
            name="name"
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
           <small className='text-rose-500' id='email-error'></small>
        </label>

        <label htmlFor="password">
          <input
            className="border rounded-md p-4 w-full"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
           <small className='text-rose-500' id='password-error'></small>
        </label>

        <input
          className="border w-1/3 rounded-lg p-4 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg"
          type="submit"
          value="Submit"
        />
         <p className="text-center sm:w-full ] md:ml-auto mt-3 ">Don&apos;t have an account? <Link href="/signup" className="text-blue-500 w-full">Sign Up</Link></p>
      </form>

     
    </div>
    </>
    
  );
};

const LoginPage = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

export default LoginPage;
