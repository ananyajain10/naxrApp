"use client";
import Link from "next/link"
import React from "react";
import { cn } from "@/components/utils/cn";
import { Button } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/Spotlight";
function HeroSection() {
  return (
    <div
    className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0"
    >
          <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 sm:left-40 sm:-top-10 "
        fill="white"
      />
        <div className="p-4 relative z-10 w-full text-center">
       


      
            <h1
            className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold
            bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >Innovative AI Solutions</h1>


            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300
            max-w-lg mx-auto"
            >our mission is to fuel business growth through technology.
                 We believe in harnessing the power of artificial intelligence to drive innovation, 
                streamline operations, and enhance customer experiences.
                <div className="mt-4">
                    <Link href={"/product"}>
                    <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Explore Product
      </Button>
                    </Link>
                </div>
            </p>

            
        </div>
        
        </div>
  )
}

export default HeroSection