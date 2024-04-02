import { useState, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { MdMiscellaneousServices, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { RiLayout6Line } from "react-icons/ri";
import '../../src/app/globals.css';
import Image from "next/image";
import homebg from '../../src/assets/logo2.png'
import AddService from '../../src/components/service/AddService'

const Dashboard = () => {

   
    const [displayServices, setDisplayServices] = useState(true);
    const [addService, setAddService] = useState(true);

    const handleSubmit = () => {

    }

    return (
        <>
            <main className='flex '> 
                <section className="bg-[#dddddd] h-[100vh] w-[200px] p-4">
                    <span className='flex w-full items-center gap-2'>
                    <Image
                    src={homebg}
                    alt="homebg"
                    className="rounded-2xl flex items-center z-20 "
                    width={50}
                    height={50}
                    />
                        <h1 className="mx-4">Tech-Dice</h1>
                    </span>
                    <span  className='flex w-full items-center gap-2'>
                    <Image
                    src={homebg}
                    alt="homebg"
                    className="rounded-2xl flex items-center z-20 "
                    width={50}
                    height={50}
                    />
                        <h1 className="">Daniel Ochuba</h1>
                    </span>

                    <div className='w-full text-left mt-[110px]'>
                        <span> Contents </span>
                        <div className='w-full '>
                            <span className='flex m-3 items-center gap-2'><FaInfoCircle /> <p>About us</p></span>
                            <span className='flex m-3 items-center gap-2'><MdMiscellaneousServices /> <p>Services</p></span>
                            <span className='flex m-3 items-center gap-2'><IoPeople /> <p>Career</p></span>
                            <span className='flex m-3 items-center gap-2'><GrNotes /> <p>Applications</p></span>
                            <span className='flex m-3 items-center gap-2'><MdOutlineProductionQuantityLimits /> <p>Product</p></span>
                            <span className='flex m-3 items-center gap-2'><RiLayout6Line /> <p>Layout</p></span>

                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <p className='text-gray px-3'> Tech-dice Website - Admin Panel </p>
                    </div>
                    <main className=''>
                        <p onClick={ () => setAddService(!addService)}>Add service</p>
                       { addService && <AddService />}
                    </main>

                </section>

            </main>
        </>
    )
}

export default Dashboard;