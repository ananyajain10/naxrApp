"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { FormEvent, useState } from 'react';
import { createFeedback } from "@/redux/actions/feedbackSlice";
import store from "@/redux/store";
import { useDispatch, Provider, useSelector } from 'react-redux';
import { FidgetSpinner } from 'react-loader-spinner';
import { FaRegCheckCircle } from "react-icons/fa";
import Link from 'next/link';

const words = [
  {
    text: "We'd",
  },
  {
    text: "love",
  },
  {
    text: "to",
  },
  {
    text: "hear",
  },
  {
    text: "from",
  },
  {
    text: "you!",
  },

];


const SubmissionSuccess: React.FC = () => {
  return (
    <div className="p-5 min-h-screen z-100 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <FaRegCheckCircle className="h-60 w-60 text-green-500" />
        <h1 className="text-2xl text-center font-bold">Feedback Submitted Successfully!</h1>
      </div>
      <p className="text-lg text-gray-700 mb-8">Thank you for submitting your Feedback. We&apos;ll review it and get back to you as soon as possible.</p>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out">Back to Home</button>
      </Link>
    </div>
  );
};


function ContactUs() {

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.feedback.loading);
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && message) {
      const response = await dispatch(createFeedback({ name, email, message }));

      if (response.error) {
        toast.error('Form not submitted');
      } else {
        toast.success(`FeedBack Submitted Successfully`);
        setSubmitted(true)
      }
    }

  };

  return (
    <>
    {submitted && <SubmissionSuccess />}
    {loading ? (
                    <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
                        <FidgetSpinner />
                        <h4 className='font-bold'>Submitting Feedback ...</h4>
                    </div>) : (
      <div className="min-h-screen bg-gray-100 dark:bg-blue-950 py-12 pt-36 relative">
        <ToastContainer />
        <div className="max-w-2xl mx-auto p-4 relative z-10">
          

          {/* Add relative and z-10 to bring content to the front */}
          <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-cyan-400">
            Contact Us
          </h1>

          <TypewriterEffectSmooth words={words} />

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-red-100"
              required
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-red-100"
              required
            />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-red-100"
              rows={5}
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>)}
    </>
  );
}


const Contact = () => (
  <Provider store={store}>
    <ContactUs />
  </Provider>
)

export default Contact;