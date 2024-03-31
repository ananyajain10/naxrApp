"use client";
import React from 'react'
import productData from "@/components/data/product-data.json";

import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";

interface Products {
    id: number,
    name: string,
    description: string
}

function Productpage() {
  return (
    <div className="bg-grey-900 py-12 relative">
    <div>
      <div className="text-center">
        <h2 className="text-2xl text-blue-600 font-bold tracking-wide uppercase">
          Our Product Offers
        </h2>
      
      </div>
    </div>

    <div className="mt-10 mx-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
               {productData.products.map((product: Products) => (
             <div key = {product.id} className="justify-center flex">
                 <div className="flex py-20 items-center justify-center antialiased">
                                <GlowingStarsBackgroundCard>
                                <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                    {product.name}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow" >{product.description}</p>
                                </GlowingStarsBackgroundCard>
                            </div>
                        


</div>
               ))}
            </div>
        </div>

        </div>
  )};
export default Productpage;