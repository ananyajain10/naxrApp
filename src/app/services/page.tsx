"use client";
import getServices from "@/components/data/services-data.json";
import {BackgroundGradient} from "@/components/ui/background-gradient";
import Link from "next/link";
import React from "react";

interface Services {
    id: number,
    category: string,
    description: string
}

function Services() {
  return (
    <div className="bg-grey-900 relative py-40">
      <div>
        <div className="text-center">
          <h2 className="text-2xl text-blue-600 font-bold tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Al-driven transformation by providing cutting-edge technology
            solutions
          </p>
        </div>
      </div>

      <div className="mt-10 mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
               {getServices.services.map((service: Services) => (
             <div key = {service.id} className="justify-center flex">
                           <BackgroundGradient
                        className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                            <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                                <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                    {service.category}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow" >{service.description}</p>
                               
                            </div>
                        </BackgroundGradient>
             </div>
               ))}
            </div>
        </div>
       
    </div>
  );
}

export default Services;
