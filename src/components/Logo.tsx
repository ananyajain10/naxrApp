"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from 'react'
const words = "TechDice";
  
function Logo() {
  return (
    <div>
         <TextGenerateEffect words={words} />
    </div>
  )
}

export default Logo