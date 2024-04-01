"use client";
import Link from "next/link"
import React from "react";
import { cn } from "@/components/utils/cn";
import { Button } from "@/components/ui/moving-border";
import { Meteors } from "@/components/ui/meteors";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Our mission is to fuel business growth through technology.` ;

function HeroSection() {
  return (
    <div
    className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0"
    >
         
        <div className="p-4 relative z-10 w-full text-center">
       

        <Meteors number={20} />
      
            <h1
            className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold
            bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >Innovative AI Solutions</h1>


            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-300
            max-w-lg mx-auto"
            > <TextGenerateEffect words={words} />
                <div className="mt-4">
                    <Link href={"/product"}>
                    <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Explore Product
      </Button>
      <Meteors number={20} />
                    </Link>
                </div>
            </p>

            
        </div>
        
        </div>
  )
}

export default HeroSection