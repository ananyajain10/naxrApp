"use client";
import React, { useEffect, useState } from "react";
import getServices from "@/components/data/services-data.json";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";
import { useSelector, useDispatch, Provider } from 'react-redux'
import { fetchServices } from "@/redux/actions/serviceSlice";
import store from '../redux/store';


interface Services {
  id: number,
  name: string,
  description: string
}

const FetchServices = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const ServicesArray = useSelector((state) => state.service.services);
  const loading = useSelector((state) => state.service.loading);


  return (
    <>
      {loading ? (
  <p className="text-center text-2xl text-white">Loading Services..</p>
) : (
  ServicesArray.map((service: Services) => {
    // Remove all HTML tags from description
    let unwrappedDescription = service.attributes.description.replace(/<\/?[^>]+(>|$)/g, '');

    return (
      <div key={service.id} className="justify-center flex">
        <BackgroundGradient
          className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm"
        >
          <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
            <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {service.attributes.name}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
              {unwrappedDescription}
            </p>
          </div>
        </BackgroundGradient>
      </div>
    );
  })
)}
    </>

  )
}

function Services() {

  const [isClient, setIsClient] = useState(false);
      useEffect(() => {
        setIsClient(true);
      }, [])

  return (
<>
    <div className="bg-grey-900 py-12">
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
          { isClient && <FetchServices />}
        </div>
      </div>

    </div>
    </>
  );
}

const ServicesList = () => {
  return (
    <Provider store={store}>
      <Services />
    </Provider>
  )
}

export default ServicesList;
