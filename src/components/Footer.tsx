import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-black">
     <strong> <hr /> </strong>   
      <div className="p-10 bg-grey-800 text-gray 200">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="mb-5">
              <h4 className="text-2xl pb-4 text-white">Company</h4>
             <p className="text-gray-500 "> 
             TechDice Pvt Ltd <br />
              New Delhi <br />
              India <br /> <br />
              <strong>Phone:</strong> <p className=""> <span> +917387690732 </span> <br /> <span className="">  +917380612016  </span> </p> <br />
              <strong>Email:</strong>  support@techdice.in
             </p>
            </div>
            <div className="mb-5">
              <h4 className="text-2xl pb-4 text-white">Quick Links</h4>
              <ul className="text-gray-500 ">
            <span className="hover:text-white transition-all duration-75 ease-in flex gap-2">  <FaAngleRight /> <Link href="/" className="pb-4">Home</Link> <br /> </span>
             <span className="hover:text-white transition-all duration-75 ease-in flex gap-2"> <FaAngleRight /> <Link href="/about" className="pb-4">About</Link> <br /> </span>
             <span className="hover:text-white transition-all duration-75 ease-in flex gap-2"> <FaAngleRight /> <Link href="/services" className="pb-4">Services</Link> <br /> </span>
           <span className="hover:text-white transition-all duration-75 ease-in flex gap-2">   <FaAngleRight /> <Link href="/contact" className="pb-4">Contact</Link> <br /> </span>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-2xl pb-4 text-white">Services</h4>
              <ul className="text-gray-500 ">
              <Link href="/" className="hover:text-white transition-all duration-75 ease-in flex gap-2">AI Automation</Link> <br />
              <Link href="/" className="hover:text-white transition-all duration-75 ease-in flex gap-2">Web Development</Link> <br />
              <Link href="/" className="hover:text-white transition-all duration-75 ease-in flex gap-2">App Development</Link> <br />
              <Link href="/" className="hover:text-white transition-all duration-75 ease-in flex gap-2">Digital Marketing</Link>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-2xl pb-4 text-white">Follow Us</h4>
              <ul className="text-gray-500 ">
           <span className="hover:text-white transition-all duration-75 ease-in flex gap-2 py-2">   <FaFacebook /> <Link href="/">Facebook</Link> <br /> </span>
           <span className="hover:text-white transition-all duration-75 ease-in flex gap-2 py-2">   <FaTwitter /> <Link href="/">Twitter</Link> <br /> </span>
           <span className="hover:text-white transition-all duration-75 ease-in flex gap-2 py-2">   <FaInstagram /> <Link href="/">Instagram</Link> <br /> </span>
            <span className="hover:text-white transition-all duration-75 ease-in flex gap-2 py-2">  <FaLinkedin /> <Link href="/">Linkedin</Link> <br /> </span>
            </ul>
            </div>
          </div>
        </div>
        <div className="w-full text-gray-50 px-10">
         <div>
            <div className="text-center">
                <div>
                    Copyright <strong><span>TechDice</span></strong>. All Rights Reserved
                </div>
                <div>
                    Designed by <strong><span  className="text-white">TechDice</span></strong>
                </div>
            </div>
         </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
