'use client'
import React, { useState, useRef } from 'react'
import { FidgetSpinner } from 'react-loader-spinner';
import Meet from '../../src/assets/images/meet.jpg';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { registerAdmin } from '../../src/redux/actions/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../../src/redux/store';
import { useRouter } from 'next/router';
import '../../src/app/globals.css';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import Image from 'next/image';

const SignUp = () => {

    const loading = useSelector((state) => state.auth.loading);
    const AdminInfo = useSelector((state) => state.auth.admin);

    const router = useRouter();

    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [admin, setAdmin] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })

    const [password, setPassword] = useState('')
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const [isAdminCode, setIsAdminCode] = useState(false);
    const [adminPasscode, setAdminPasscode] = useState('');

    const handleAdminCodeVerification = (code) => {

        const span = document.getElementById('admin-code-error');

        setAdminPasscode(prevPasscode => {
            const newPasscode = Number(code);
            const ADMINCODE = 50326;

            if (newPasscode === ADMINCODE) {
                setIsAdminCode(true)
                span!.innerText = 'yeah ✔';
            } else {
                setIsAdminCode(false)
                span!.innerText = 'Invalid Admin code';
            }
            return newPasscode;
        });
    }

    const validatePasswordMatch = (password, confirmPassword) => {
        const passwordInfo = document.getElementById('password-error');

        if (confirmPassword === '') {
            passwordInfo!.innerText = '';
            setAdmin(
                { ...admin, password: '' }
            )
        } else if (password === confirmPassword) {
            setIsPasswordMatched(true);
            setAdmin({ ...admin, password: password });
            passwordInfo!.innerText = 'Passwords Matched ✔';
        } else if (password === '' || password !== confirmPassword) {
            setIsPasswordMatched(false);
            passwordInfo!.innerText = 'Passwords do not match..';
            setAdmin(
                { ...admin, password: '' }
            )
        } else {

        }
    }

    const validateEmail = (email) => {

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const span = document.getElementById('email-error');

        const isEmailValid = emailRegex.test(email);

        if (isEmailValid) {
            setAdmin({ ...admin, email: email })
            span!.innerText = '';
        } else if (email === '') {
            span!.innerText = '';
        } else if (!isEmailValid) {
            span!.innerText = 'Invalid email';
        }
    }

    const handleEmail = (e) => {
        validateEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(admin);

        const allInputHasValue = Object.entries(admin).every(([key, value]) => {
            const message = document.getElementById(`${key}-error`);
            if (value === '') {
                message!.innerText = `Please Enter ${key}`;
                return false
            }
            message!.innerText = '';
            return true;
        });

        if (allInputHasValue) {
            try {

                const response = await dispatch(registerAdmin(admin))
                console.log(response.payload.status.errors);
                if (!response.payload.status.errors) {
                    toast.success('Sign up successful');
                    router.push('/dashboard');
                } else {
                    toast.error(response.payload.status.errors[0])
                }


            } catch (error) {
                console.log('Error logging in:', error);
                toast.error('An error occurred while logging in. Please try again later.');
            }

        }
    }


        return (
            <>
                
                {loading ? <></> : <Navbar />}

                {loading && (
                    <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
                        <FidgetSpinner />
                        <h4 className='font-bold'>Signing up</h4>
                    </div>
                )}
                <div className={` p-4 flex p-5 flex-row justify-center h-[100vh] w-full `}>

                <div className="hidden lg:block xl:block">
                <Image
                        src={Meet}
                        width={800}
                        height={700}
                        alt='Admin meeting'
                        className="mt-[100px] ml-[50px]"
                        />
                </div>
                    

                    <ToastContainer />
                    <form className="text-sm p-5 flex flex-col lg:w-[30%] w-full space-y-4 md:ml-inherit md:w-[50%] ml-auto shadow-2xl mt-[40px] lg:align-right" ref={formRef} onSubmit={(e) => handleSubmit(e)}>

                        <h1 className={` text-center text-3xl font-bold `}>Sign Up</h1>
                        <label htmlFor='first_name'>
                            <input
                                className='border rounded-md p-3 w-full'
                                id='first_name'
                                type="text"
                                name="first_name"
                                onChange={(e) => setAdmin({ ...admin, first_name: e.target.value })}
                                placeholder='First Name..'
                            />
                            <small className='text-rose-500' id='first_name-error'></small>
                        </label>

                        <label htmlFor='last_name'>
                            <input
                                className='border rounded-md p-3 w-full'
                                id='last_name'
                                type="text"
                                name="last_name"
                                onChange={(e) => setAdmin({ ...admin, last_name: e.target.value })}
                                placeholder='Last Name..'
                            />
                            <small className='text-rose-500' id='last_name-error'></small>
                        </label>

                        <label htmlFor='email'>
                            <input
                                className='border rounded-md p-3 w-full'
                                id='email'
                                type="email"
                                name="email_input"
                                onChange={(e) => {
                                    setAdmin({ ...admin, email: e.target.value })
                                    handleEmail(e)
                                }}
                                placeholder='Email..'
                            />
                            <small className='text-rose-500' id='email-error'></small>
                        </label>

                        <label htmlFor='admin_verification'>
                            <input
                                className='border rounded-md p-3 w-full'
                                type="text"
                                id='admin_verification'
                                name="admin_verification"
                                onChange={(e) => handleAdminCodeVerification(e.target.value)}
                                placeholder='Enter Admin authentication code...'
                            />
                            <small className={isAdminCode ? 'text-emerald-400' : 'text-rose-500'} id='admin-code-error'></small>
                        </label>

                        <label htmlFor='password'>
                            <input
                                className='border rounded-md p-3 w-full'
                                type="password"
                                name="password_input"
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                            />
                        </label>

                        <label htmlFor='password_confirmation'>
                            <input
                                className='border rounded-md p-3 w-full'
                                type="password"
                                name="password_confirmation"
                                id='password_confirmation'
                                onChange={(e) => validatePasswordMatch(password, e.target.value)}
                                placeholder='Confirm Password'
                            />
                            <small className={isPasswordMatched ? 'text-emerald-400' : 'text-rose-500'} id='password-error'></small>
                        </label>

                        <input
                            className='border w-1/3 rounded-lg p-2 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg'
                            type="submit"
                            value="Submit"
                        />
                        <p className="text-center sm:w-full ] md:ml-auto mt-3 ">Already have an account? <Link href="/login" className="text-blue-500 w-full">Login</Link></p>
                    </form>

                    

                </div>
            </>
        )

    }

    const SignupPage = () => (

        <Provider store={store}>
            <SignUp />
        </Provider>
    );

    export default SignupPage;
