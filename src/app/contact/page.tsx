"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { FormEvent, useState } from 'react';

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


function ContactUs() {
  const [feedBack, setFeedBack] = useState({
    name: '',
    email: '',
    message: ''
  });
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(`FeedBack Submitted Successfully`);
    alert('Message sent! THANK YOU!');
    console.log('Submitted:', feedBack);
  };

  return (
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
            value={feedBack.name}
            onChange={(e) => setFeedBack({...feedBack, name: e.target.value})}
            placeholder="Full Name"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-red-100"
            required
          />
          <input
            type="email"
            value={feedBack.email}
            onChange={(e) => setFeedBack({...feedBack, email: e.target.value})}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-red-100"
            required
          />
          <textarea
            value={feedBack.message}
            onChange={(e) => setFeedBack({...feedBack, message: e.target.value})}
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
    </div>
  );
}

export default ContactUs;